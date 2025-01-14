/*
  Warnings:

  - You are about to drop the column `bedNumber` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContact` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `floorNumber` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "bedNumber",
DROP COLUMN "emergencyContact",
DROP COLUMN "floorNumber";
