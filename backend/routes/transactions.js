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

        const profile = await prisma.profile.findUnique({
            where: { userId },
            select: { buyingPower: true },
        });

        if (!profile) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        const existingEntry = await prisma.portfolioEntry.findUnique({
            where: { userId_symbol: { userId, symbol } },
        });

        if (isBuy) {

            // check for if user has enough purchasing power
            const totalCost = quant * p;
            if (profile.buyingPower < totalCost) {
                return res.status(400).json({ error: 'Insufficient buying power for this transaction' });
            }

            //decrement buying power
            await prisma.profile.update({
                where: { userId },
                data: {
                    buyingPower: { decrement: totalCost },
                },
            });

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
            // current profit update
            const existingProfit = await prisma.historicProfit.findUnique({
                where: { userId },
            })


            let newProfit;

            if (existingProfit) {
                newProfit = existingProfit.profit + profit
                await prisma.historicProfit.update({
                    where: { userId },
                    data: {
                        profit: newProfit
                    }
                })
            } else {
                newProfit = profit
                await prisma.historicProfit.create({
                    data: {
                        userId,
                        profit: newProfit,
                    },
                })
            }
            await prisma.historicProfitPoint.create({
                data: {
                    userId,
                    profit: newProfit,
                },
            });

            await prisma.profile.update({
                where: { userId },
                data: {
                    buyingPower: {
                        increment: p * quant, // profit can be negative, so this works for both profit and loss
                    },
                },
            });
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
        res.status(500).json({ error: "error fetching transactions" })
    }
})

module.exports = router;