/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `FinQuestEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FinQuestEvent" ALTER COLUMN "title" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "FinQuestEvent_title_key" ON "FinQuestEvent"("title");
