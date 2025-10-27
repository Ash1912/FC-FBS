-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "fileUrl" TEXT;

-- CreateTable
CREATE TABLE "FinQuestEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'FinQuest',
    "description" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinQuestEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinQuestRegistration" (
    "id" SERIAL NOT NULL,
    "teamName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "member1Name" TEXT NOT NULL,
    "member1Email" TEXT NOT NULL,
    "member1Section" TEXT NOT NULL,
    "member1Phone" TEXT NOT NULL,
    "member1Year" TEXT NOT NULL,
    "member1PGP" TEXT NOT NULL,
    "member2Name" TEXT NOT NULL,
    "member2Email" TEXT NOT NULL,
    "member2Section" TEXT NOT NULL,
    "member2Phone" TEXT NOT NULL,
    "member2Year" TEXT NOT NULL,
    "member2PGP" TEXT NOT NULL,
    "member3Name" TEXT NOT NULL,
    "member3Email" TEXT NOT NULL,
    "member3Section" TEXT NOT NULL,
    "member3Phone" TEXT NOT NULL,
    "member3Year" TEXT NOT NULL,
    "member3PGP" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "FinQuestRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinQuestRegistration_teamName_eventId_key" ON "FinQuestRegistration"("teamName", "eventId");

-- AddForeignKey
ALTER TABLE "FinQuestRegistration" ADD CONSTRAINT "FinQuestRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "FinQuestEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
