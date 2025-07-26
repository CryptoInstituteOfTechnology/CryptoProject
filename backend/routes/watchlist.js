const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get watchlist for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const watchlist = await prisma.watchlistItem.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }, // newest first
        });

        res.json(watchlist);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching watchlist' });
    }
});

// Toggle watchlist item
router.post('/', async (req, res) => {
    const { userId, symbol } = req.body;

    if (!userId || !symbol) {
        return res.status(400).json({ error: 'User ID and symbol are required' });
    }

    try {
        const existing = await prisma.watchlistItem.findUnique({
            where: { userId_symbol: { userId, symbol } },
        });

        if (existing) {
            await prisma.watchlistItem.delete({
                where: { userId_symbol: { userId, symbol } },
            });

            return res.json({ removed: true, watchlistItem: existing });
        } else {
            const newCrypto = await prisma.watchlistItem.create({
                data: { userId, symbol },
            });

            return res.json({ added: true, watchlistItem: newCrypto });
        }
    } catch (error) {

        res.status(500).json({ error: 'Error toggling watchlist item' });
    }
});

module.exports = router;

