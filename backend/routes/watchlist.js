const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// get watclist items
router.get('/:userId', async (req, res) => {
    const { userId } = req.params

    if (!userId || Object.keys(req.params).length === 0) {
        return res.status(400).json({ error: "error finding id for user" })
    }
    try {
        const watchlist = await prisma.watchlistItem.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }// newest first
        })
        res.json(watchlist)
    } catch (error) {
        res.status(500).json({ error: "error with fetching watchlist" })
    }
})



router.post('/', async (req, res) => {
    const { userId, symbol } = req.body

    if (!userId || !symbol) {
        return res.status(400).json({ error: "issue getting symbol or userId" })
    }

    try {
        const existing = await prisma.watchlistItem.findUnique({
            where: { userId_symbol: { userId, symbol } }
        })

        if (existing) {
            await prisma.watchlistItem.delete({
                where: { userId_symbol: { userId, symbol } }
            })
            return res.json({ removed: true, watchlistItem: existing })
        } else {
            const newCrypto = await prisma.watchlistItem.create({
                data: { userId, symbol }
            })
            return res.json({ added: true, watchlistItem: newCrypto })
        }
    } catch (error) {
        return res.status(500).json({ error: "error toggling watchlist item" })
    }
})
module.exports = router

//post new to watchlist or deletr using toggle, get rid of remove from watchlist



