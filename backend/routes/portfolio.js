const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get portfolio entries for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const portfolioEntries = await prisma.portfolioEntry.findMany({
            where: {
                userId,
                quantity: { gt: 0 }, // Return only entries with quantity greater than 0
            },
            orderBy: {
                quantity: 'desc', // Order by quantity in descending order
            },
        });

        res.json(portfolioEntries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching portfolio entries' });
    }
});

module.exports = router;