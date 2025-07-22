const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();


// for recharts, get every single profit point
router.get('/historic-profit-points/:userId', async (req, res) => {
    const { userId } = req.params;
    const points = await prisma.historicProfitPoint.findMany({
        where: { userId },
        orderBy: { timestamp: 'asc' }, // or 'desc' if you want latest first
    });
    res.json(points);
});

// get all users current historical Profit/Realized profit
router.get('/historic-profit', async (req, res) => {
    const profits = await prisma.historicProfit.findMany();
    res.json(profits);
});


// get one users historic profit
router.get('/historic-profit/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const profit = await prisma.historicProfit.findUnique({
            where: { userId },

        });
        res.json(profit);
    } catch (error) {
        res.status(404).json({ error: 'HistoricProfit not found for user' });
    }
});

module.exports = router;