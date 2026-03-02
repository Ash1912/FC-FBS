/*
  Warnings:

  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VotingSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VotingTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_teamId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "Vote";

-- DropTable
DROP TABLE "VotingSettings";

-- DropTable
DROP TABLE "VotingTeam";

-- DropEnum
DROP TYPE "VoteType";
