/*
  Warnings:

  - You are about to drop the column `eventDate` on the `FinQuestEvent` table. All the data in the column will be lost.
  - Added the required column `finalDate` to the `FinQuestEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semiFinalDate` to the `FinQuestEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinQuestEvent" DROP COLUMN "eventDate",
ADD COLUMN     "finalDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "semiFinalDate" TIMESTAMP(3) NOT NULL;
