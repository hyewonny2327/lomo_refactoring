/*
  Warnings:

  - You are about to drop the column `stylingTipId` on the `BodyType` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `BodyType` table. All the data in the column will be lost.
  - Added the required column `bodyTypeId` to the `AvatarNumber` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BodyType" DROP CONSTRAINT "BodyType_stylingTipId_fkey";

-- AlterTable
ALTER TABLE "AvatarNumber" ADD COLUMN     "bodyTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BodyType" DROP COLUMN "stylingTipId",
DROP COLUMN "summary";

-- CreateTable
CREATE TABLE "ResultText" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "stylingTipId" INTEGER,

    CONSTRAINT "ResultText_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResultText_type_key" ON "ResultText"("type");

-- AddForeignKey
ALTER TABLE "AvatarNumber" ADD CONSTRAINT "AvatarNumber_bodyTypeId_fkey" FOREIGN KEY ("bodyTypeId") REFERENCES "BodyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultText" ADD CONSTRAINT "ResultText_stylingTipId_fkey" FOREIGN KEY ("stylingTipId") REFERENCES "StylingTip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
