-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measuredThrows" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disc" TEXT,
    "color" TEXT,
    "throwtype" TEXT,
    "distance" INTEGER NOT NULL,

    CONSTRAINT "measuredThrows_pkey" PRIMARY KEY ("id")
);
