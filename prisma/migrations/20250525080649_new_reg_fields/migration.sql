/*
  Warnings:

  - Added the required column `calendlyUrl` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `college` to the `Mentor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Mentor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mentor" ADD COLUMN     "calendlyUrl" TEXT NOT NULL,
ADD COLUMN     "college" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL;
