/*
  Warnings:

  - You are about to alter the column `name` on the `Psychologist` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.

*/
-- AlterTable
ALTER TABLE "Psychologist" ALTER COLUMN "name" SET DATA TYPE VARCHAR(40);
