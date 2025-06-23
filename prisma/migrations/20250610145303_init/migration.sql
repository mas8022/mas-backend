/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- DropTable
DROP TABLE "Contact";
