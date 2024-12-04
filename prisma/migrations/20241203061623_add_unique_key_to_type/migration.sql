/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `BodyType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BodyType_type_key" ON "BodyType"("type");
