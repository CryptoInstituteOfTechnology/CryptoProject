const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const recommendations = await prisma.recommendation.findMany({
            where: { userId },
            take: 4, // Limit to 4 results
            orderBy: { createdAt: 'desc' } // Most recent first
        });

        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ error: "error fetching recs" });
    }
});

module.exports = router;