const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// need symbol, quantity, buy or sell, , pricee ,userid
// the hard part , have to show quantity on frontend now


router.post('/', async (req, res) => {
    // check if symbol already in portfolio or not, if it is then we have to update with new avg cost

    const { userId, symbol, quantity, price, type } = req.body

    const isBuy = type?.toUpperCase() === 'BUY' // checks if is a buy for if else logic
    const quant = parseInt(quantity) // make sure qunatity is an int, no partial buying
    const p = parseFloat(price) // make sure price is a float


    if (!userId || !symbol || !quant || !p || !type || q <= 0 || p <= 0) { // quantity can still be positve for sell and we just subtract
        return res.status(400).json({ error: "error in data sent back" })
    }

    // check if symbol already in portfolio or not, if it is then we have to update with new avg cost
    try {
        const existing = await prisma.portfolioEntry.findUnique({
            where: { userId_symbol: { userId, symbol } } // can do _ to match those
        })

        // calculate new quantity and average beforehand



        if (isBuy) {
            const newQuant = existing ? existing.quantity + quant : quant
            const newAvg = existing ? ((existing.avgPrice * existing.quantity + quant * price) / newQuant) : p // take average of all prices or set to price if not exisitng
            // can add for shorting stocks later but mvp is buy

            // buy logic
            if (existing) {
                await prisma.portfolioEntry.update({
                    where: { userId_symbol: { userId, symbol } },
                    data: { quantity: newQuant, avgPrice: newAvg }
                })
            } else {
                await prisma.portfolioEntry.create({
                    data: { userId, symbol, quantity: newQuant, avgPrice: newAvg }
                })
            }
        }

        else {
            if (!existing || existing.quantity < quant) {
                return res, status(400).json({ error: "Quantity cant be higher than the amount already in portfolio" })
            }

            const newQuant = existing.quantity - quant // how much iwll be left now

            // dont have to avg price for selling

            if (newQuant === 0) { // delete if quantity is 0
                await prisma.portfolioEntry.delete({
                    where: { userId_symbol: { userId, symbol } }
                })
            } else {
                await prisma.portfolioEntry.update({
                    where: { userId_symbol: { userId, symbol } },
                    data : {quantity : newQuant}
                })
            }

        }


        // create transaction

        await prisma.transaction.create({
            data: {
                userId,
                symbol,
                quantity: q,
                price: p,
                type: isBuy ? 'BUY' : 'SELL'

            }
        })


        res.json({success : true , message: `${type.toUpperCase()} ${symbol.toUpperCase()}`})

    } catch (error) {
        return res.status(500).json({ error: " Failed transaction" })
    }
    // if else for buy sell
})

module.exports = router