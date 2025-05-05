/*
  Warnings:

  - You are about to drop the column `behavior` on the `Behavior` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `behavior_name` to the `Behavior` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Behavior"
RENAME COLUMN "behavior" TO "behavior_name";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
