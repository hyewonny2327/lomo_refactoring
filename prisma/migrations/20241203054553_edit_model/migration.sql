/*
  Warnings:

  - You are about to drop the column `bodyTypeId` on the `StylingTip` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StylingTip" DROP CONSTRAINT "StylingTip_bodyTypeId_fkey";

-- AlterTable
ALTER TABLE "BodyType" ADD COLUMN     "stylingTipId" INTEGER;

-- AlterTable
ALTER TABLE "StylingTip" DROP COLUMN "bodyTypeId";

-- AddForeignKey
ALTER TABLE "BodyType" ADD CONSTRAINT "BodyType_stylingTipId_fkey" FOREIGN KEY ("stylingTipId") REFERENCES "StylingTip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
