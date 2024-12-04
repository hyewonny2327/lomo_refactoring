-- CreateTable
CREATE TABLE "BodyType" (
    "id" SERIAL NOT NULL,
    "upperBodyType" TEXT NOT NULL,
    "lowerBodyType" TEXT NOT NULL,
    "avatarNumber" INTEGER[],

    CONSTRAINT "BodyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextBlock" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bodyTypeId" INTEGER NOT NULL,

    CONSTRAINT "TextBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TextBlock" ADD CONSTRAINT "TextBlock_bodyTypeId_fkey" FOREIGN KEY ("bodyTypeId") REFERENCES "BodyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
