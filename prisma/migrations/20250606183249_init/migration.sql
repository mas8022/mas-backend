/*
  Warnings:

  - You are about to drop the column `content` on the `Task` table. All the data in the column will be lost.
  - Added the required column `done` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('کم', 'متوسط', 'زیاد');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "content",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "done" BOOLEAN NOT NULL,
ADD COLUMN     "priority" "Priority" NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
