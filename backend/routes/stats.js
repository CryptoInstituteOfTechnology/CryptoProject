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

    if (!profitPoints || profitPoints.length === 0) {
        // Return an empty array or a meaningful message
        return res.json({ profitPoints: [], message: "No profit points found for this user." });
    }
    res.json(points);
});

// get all users current historical Profit/Realized profit and their username from psima, sort by profit, top 20
router.get('/historic-profit', async (req, res) => {
    try {
        const profits = await prisma.historicProfit.findMany({
            take: 20,
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
            },
            orderBy: {
                profit: 'desc',
            },
        });
        const result = profits.map(p => ({
            username: p.user.username,
            profit: p.profit,
            updatedAt: p.updatedAt,
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
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