/*
  Warnings:

  - Added the required column `bodyTypeId` to the `AvatarNumber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvatarNumber" ADD COLUMN     "bodyTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AvatarNumber" ADD CONSTRAINT "AvatarNumber_bodyTypeId_fkey" FOREIGN KEY ("bodyTypeId") REFERENCES "BodyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
