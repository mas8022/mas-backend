-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);
