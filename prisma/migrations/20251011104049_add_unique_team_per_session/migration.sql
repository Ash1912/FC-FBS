/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,teamName]` on the table `BuzzerResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."BuzzerResponse" DROP CONSTRAINT "BuzzerResponse_sessionId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "BuzzerResponse_sessionId_teamName_key" ON "public"."BuzzerResponse"("sessionId", "teamName");

-- AddForeignKey
ALTER TABLE "public"."BuzzerResponse" ADD CONSTRAINT "BuzzerResponse_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."BuzzerSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
