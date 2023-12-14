/*
  Warnings:

  - You are about to drop the column `packshot` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "packshot",
DROP COLUMN "thumbnail";
