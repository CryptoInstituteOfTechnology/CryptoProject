const express = require('express')
const router = express.Router()
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient() 


// get watclist items
router.get('/:userId', async (req, res) =>{
    const {userId} = req.params

    if(!userId || Object.keys(req.params).length === 0){
        return res.status(400).json({error: "error finding id for user"})
    }
    try{
        const watchlist = await prisma.watchlistItem.findMany({
            where: {userId},
            orderBy: {createdAt : 'desc'}
        })
        res.json(watchlist)
    }catch(error){
        res.status(500).json({error: "error with fetching watchlist"})
    }
})

//post new to watchlist or deletr using toggle, get rid of remove from watchlist



