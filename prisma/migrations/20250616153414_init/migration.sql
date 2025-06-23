-- CreateEnum
CREATE TYPE "IncomeCategory" AS ENUM ('salary', 'business', 'freelance', 'gift', 'rental', 'transport', 'sales', 'investment', 'other');

-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "amount" BIGINT NOT NULL,
    "category" "IncomeCategory" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
