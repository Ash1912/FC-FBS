-- CreateTable
CREATE TABLE "public"."BuzzerSession" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "BuzzerSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BuzzerResponse" (
    "id" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "buzzTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeTaken" DOUBLE PRECISION,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "BuzzerResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."BuzzerResponse" ADD CONSTRAINT "BuzzerResponse_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."BuzzerSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
