/*
  Warnings:

  - You are about to drop the column `likes_count` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "likes_count";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes_count" INTEGER NOT NULL DEFAULT 0;
