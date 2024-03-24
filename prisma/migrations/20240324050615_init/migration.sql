/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Mood` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Mood` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date]` on the table `Mood` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Mood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mood" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "date" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mood_date_key" ON "Mood"("date");
