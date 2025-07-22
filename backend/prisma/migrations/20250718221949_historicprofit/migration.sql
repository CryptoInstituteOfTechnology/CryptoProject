-- CreateTable
CREATE TABLE "HistoricProfit" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoricProfit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HistoricProfit_userId_key" ON "HistoricProfit"("userId");
