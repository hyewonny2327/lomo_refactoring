/*
  Warnings:

  - You are about to drop the column `avatarNumber` on the `BodyType` table. All the data in the column will be lost.
  - You are about to drop the column `lowerBodyType` on the `BodyType` table. All the data in the column will be lost.
  - You are about to drop the column `upperBodyType` on the `BodyType` table. All the data in the column will be lost.
  - You are about to drop the `TextBlock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `BodyType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TextBlock" DROP CONSTRAINT "TextBlock_bodyTypeId_fkey";

-- AlterTable
ALTER TABLE "BodyType" DROP COLUMN "avatarNumber",
DROP COLUMN "lowerBodyType",
DROP COLUMN "upperBodyType",
ADD COLUMN     "summary" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "TextBlock";

-- CreateTable
CREATE TABLE "StylingTip" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "bodyTypeId" INTEGER NOT NULL,

    CONSTRAINT "StylingTip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tip" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stylingTipId" INTEGER NOT NULL,

    CONSTRAINT "Tip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvatarNumber" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numbers" INTEGER[],
    "bodyTypeId" INTEGER NOT NULL,

    CONSTRAINT "AvatarNumber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StylingTip" ADD CONSTRAINT "StylingTip_bodyTypeId_fkey" FOREIGN KEY ("bodyTypeId") REFERENCES "BodyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tip" ADD CONSTRAINT "Tip_stylingTipId_fkey" FOREIGN KEY ("stylingTipId") REFERENCES "StylingTip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvatarNumber" ADD CONSTRAINT "AvatarNumber_bodyTypeId_fkey" FOREIGN KEY ("bodyTypeId") REFERENCES "BodyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
