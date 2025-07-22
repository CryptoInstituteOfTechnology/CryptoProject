const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// route to return user profile and attributes
router.get('/:userId', async (req, res) => {
    const { userId } = req.params

    try {
        const profile = await prisma.profile.findUnique({
            where: { userId }
        })

        res.json(profile)
    }catch(error){
        res.status(500).json({ error: "error fetching profiles" })
    }

})

//route to build portfolio - potentially a form on the frontend with a modal, and then u have a profile view??



//route to return all usernames and add the ids for leaderboard

module.exports = router;