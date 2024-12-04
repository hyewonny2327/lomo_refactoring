/*
  Warnings:

  - You are about to drop the column `bodyTypeId` on the `AvatarNumber` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AvatarNumber" DROP CONSTRAINT "AvatarNumber_bodyTypeId_fkey";

-- AlterTable
ALTER TABLE "AvatarNumber" DROP COLUMN "bodyTypeId";
