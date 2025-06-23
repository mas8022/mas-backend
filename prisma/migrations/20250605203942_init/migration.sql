-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
