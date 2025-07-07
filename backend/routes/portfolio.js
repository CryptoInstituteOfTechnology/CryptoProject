const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient() // same as from kudosboard, DELETE these comments after merged and working in backend folder

// simple get request



router.get('/:userId', async (req, res) => {
    const { userID } = req.params

    try {
        const portfolio = await prisma.portfolioEntry.findMany({
            where: {
                userId,
                quantity: { gt: 0 } // return ones that arent 0 , 0 means have been bought and sold
            }, 
            orderBy :{
                quantity: 'desc' // display by qunatity in largest first
            }
        })

        res.json(portfolio)
    } catch (error) {
        res.status(500).json({ error: 'error fetching portfolio ' })
    }
})


module.exports = router
// on frontend have to have type, send the userid, quantity, price and symbol