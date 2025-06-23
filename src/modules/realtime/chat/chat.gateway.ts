import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { parse } from 'cookie';
import { User } from '@prisma/client';
import { JwtService } from 'src/modules/services/jwt/jwt.service';
import { PrismaService } from 'src/modules/services/prisma/prisma.service';

@WebSocketGateway({
  namespace: '/chat',
  cors: { origin: process.env.FRONTEND_HOST_NAME, credentials: true },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private users = new Map<string, Pick<User, 'id' | 'phone'>>();

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const { access_token } = parse(client.handshake.headers.cookie || '');

      const { id } = this.jwtService.verifyAccessToken(access_token);
      const user = await this.prismaService.user.findUnique({ where: { id } });

      if (!user) return client.disconnect();

      this.users.set(client.id, { id: user.id, phone: user.phone });
    } catch (e) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.users.delete(client.id);
  }

  @SubscribeMessage('get-messages')
  async getMessages(
    client: Socket,
    { receiverPhone }: { receiverPhone: number },
  ) {
    const user = this.users.get(client.id);
    if (!user) return;

    const senderPhone = String(user.phone);
    const receiverStr = String(receiverPhone);

    const messages = await this.prismaService.message.findMany({
      where: {
        OR: [
          { sender: senderPhone, receiver: receiverStr },
          { sender: receiverStr, receiver: senderPhone },
        ],
      },
      orderBy: { id: 'asc' },
    });

    const room1 = `${senderPhone}-${receiverStr}`;
    const room2 = `${receiverStr}-${senderPhone}`;

    client.join(room1);
    client.join(room2);

    this.server.to(room1).to(room2).emit('get-messages', messages);
  }

  @SubscribeMessage('send-message')
  async sendMessage(
    client: Socket,
    { message, receiverPhone }: { message: string; receiverPhone: string },
  ) {
    const sender = this.users.get(client.id);
    if (!sender) return;

    const senderPhone = sender.phone;

    await this.prismaService.message.create({
      data: {
        sender: senderPhone,
        receiver: receiverPhone,
        content: message,
      },
    });

    try {
      await this.prismaService.contact.create({
        data: {
          userId: sender.id,
          contactPhone: receiverPhone,
        },
      });
    } catch (error) {}

    const messages = await this.prismaService.message.findMany({
      where: {
        OR: [
          { sender: senderPhone, receiver: receiverPhone },
          { sender: receiverPhone, receiver: senderPhone },
        ],
      },
      orderBy: { id: 'asc' },
    });

    const room1 = `${senderPhone}-${receiverPhone}`;
    const room2 = `${receiverPhone}-${senderPhone}`;

    this.server.to(room1).to(room2).emit('get-messages', messages);
  }

  @SubscribeMessage('delete-message')
  async deleteMessage({ id }: { id: number }) {
    await this.prismaService.message.delete({
      where: {
        id,
      },
    });
  }
}
