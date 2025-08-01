/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "HistoricProfit" ADD CONSTRAINT "HistoricProfit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
