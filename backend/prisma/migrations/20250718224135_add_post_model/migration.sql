-- CreateTable
CREATE TABLE "HistoricProfitPoint" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "profit" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricProfitPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HistoricProfitPoint_userId_idx" ON "HistoricProfitPoint"("userId");

-- CreateIndex
CREATE INDEX "HistoricProfitPoint_timestamp_idx" ON "HistoricProfitPoint"("timestamp");
