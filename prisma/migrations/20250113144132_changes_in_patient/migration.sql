/*
  Warnings:

  - Made the column `disease` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "disease" SET NOT NULL,
ALTER COLUMN "bedNumber" DROP NOT NULL,
ALTER COLUMN "floorNumber" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "contactInfo" DROP NOT NULL,
ALTER COLUMN "emergencyContact" DROP NOT NULL;
