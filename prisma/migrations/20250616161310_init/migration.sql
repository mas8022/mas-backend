-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "amount" BIGINT NOT NULL,
    "category" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
