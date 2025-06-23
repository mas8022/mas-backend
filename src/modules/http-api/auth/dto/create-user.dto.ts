import { IsMobilePhone } from "class-validator";

export class CreateUserDto {
    @IsMobilePhone("fa-IR")
    phone: string
}

