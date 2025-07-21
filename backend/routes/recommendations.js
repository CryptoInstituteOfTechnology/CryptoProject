const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {

        const recommendations = await prisma.recommendation.findMany({
            where: { userId }
        })

        res.json(recommendations)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;