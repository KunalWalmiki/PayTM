/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('Google', 'Github');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "name" TEXT,
ADD COLUMN     "number" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Merchant" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "auth_type" "AuthType" NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "Merchant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_number_key" ON "user"("number");
