-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "category" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileUrl" TEXT,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuzzerSession" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "BuzzerSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuzzerResponse" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "buzzTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeTaken" DOUBLE PRECISION,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "BuzzerResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinQuestEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "finalDate" TIMESTAMP(3) NOT NULL,
    "semiFinalDate" TIMESTAMP(3) NOT NULL,

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

-- CreateTable
CREATE TABLE "StockiFyEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "semiFinalDate" TIMESTAMP(3) NOT NULL,
    "finalDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockiFyEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockiFyRegistration" (
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

    CONSTRAINT "StockiFyRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BuzzerResponse_sessionId_teamName_key" ON "BuzzerResponse"("sessionId", "teamName");

-- CreateIndex
CREATE UNIQUE INDEX "FinQuestEvent_title_key" ON "FinQuestEvent"("title");

-- CreateIndex
CREATE UNIQUE INDEX "FinQuestRegistration_teamName_eventId_key" ON "FinQuestRegistration"("teamName", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "StockiFyEvent_title_key" ON "StockiFyEvent"("title");

-- CreateIndex
CREATE UNIQUE INDEX "StockiFyRegistration_teamName_eventId_key" ON "StockiFyRegistration"("teamName", "eventId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuzzerResponse" ADD CONSTRAINT "BuzzerResponse_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "BuzzerSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinQuestRegistration" ADD CONSTRAINT "FinQuestRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "FinQuestEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockiFyRegistration" ADD CONSTRAINT "StockiFyRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "StockiFyEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

