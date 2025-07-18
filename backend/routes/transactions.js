const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Create or update portfolio entry and create transaction
router.post('/', async (req, res) => {
    const { userId, symbol, quantity, price, type } = req.body;
    const isBuy = type?.toUpperCase() === 'BUY';
    const quant = parseInt(quantity);
    const p = parseFloat(price);

    if (!userId || !symbol || !quant || !p || !type || quant <= 0 || p <= 0) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    try {
        const existingEntry = await prisma.portfolioEntry.findUnique({
            where: { userId_symbol: { userId, symbol } },
        });

        if (isBuy) {
            const newQuant = existingEntry ? existingEntry.quantity + quant : quant;
            const newAvg = existingEntry
                ? ((existingEntry.avgPrice * existingEntry.quantity + quant * price) / newQuant)
                : p;

            if (existingEntry) {
                await prisma.portfolioEntry.update({
                    where: { userId_symbol: { userId, symbol } },
                    data: { quantity: newQuant, avgPrice: newAvg },
                });
            } else {
                await prisma.portfolioEntry.create({
                    data: { userId, symbol, quantity: newQuant, avgPrice: newAvg },
                });
            }
        } else {
            if (!existingEntry || existingEntry.quantity < quant) {
                return res.status(400).json({ error: 'Insufficient quantity in portfolio' });
            }

            const newQuant = existingEntry.quantity - quant;

            if (newQuant === 0) {
                await prisma.portfolioEntry.delete({
                    where: { userId_symbol: { userId, symbol } },
                });
            } else {
                await prisma.portfolioEntry.update({
                    where: { userId_symbol: { userId, symbol } },
                    data: { quantity: newQuant },
                });
            }

            // code for updating historical profit and loss, curr price * quantity average price bought * quantity 
            const profit = (p - existingEntry.avgPrice) * quant

            const existingProfit = await prisma.historicProfit.findUnique({
                where: { userId },
            })

            if (existingProfit) {
                await prisma.historicProfit.update({
                    where: { userId },
                    data: {
                        profit: existingProfit.profit + profit
                    }
                })
            } else {
                await prisma.historicProfit.create({
                    data: {
                        userId,
                        profit: profit,
                    },
                })
            }
        }
        await prisma.transaction.create({
            data: {
                userId,
                symbol,
                quantity: quant,
                price: p,
                type: isBuy ? 'BUY' : 'SELL',
            },
        });
        res.json({ success: true, message: `${type.toUpperCase()} ${symbol.toUpperCase()}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed transaction' });
    }
});


router.get('/:userId', async (req, res) => {
    const { userId } = req.params

    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
        res.json(transactions)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "error fetching transactions" })
    }
})

module.exports = router;