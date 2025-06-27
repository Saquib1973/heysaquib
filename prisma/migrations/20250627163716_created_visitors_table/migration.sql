-- CreateTable
CREATE TABLE "Visitors" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "city" TEXT,
    "region" TEXT,
    "country" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "visitCount" INTEGER NOT NULL DEFAULT 0,
    "lastVisitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitors_pkey" PRIMARY KEY ("id")
);
