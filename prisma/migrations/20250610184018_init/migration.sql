-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contactPhone" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_contactPhone_key" ON "Contact"("userId", "contactPhone");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
