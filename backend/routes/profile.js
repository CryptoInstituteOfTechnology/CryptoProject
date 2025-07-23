const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// route to return user profile and attributes
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const profile = await prisma.profile.findFirst({
            where: {
                userId
            },
        });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching profile' });
    }
});

//route to build profile - potentially a form on the frontend with a modal, and then u have a profile view??
router.post('/', async (req, res) => {
    const { userId, username, imageUrl, firstName, lastName, phone } = req.body;

    if (!userId || !username) {
        return res.status(400).json({ error: "userId and username are required" });
    }

    try {
        const newProfile = await prisma.profile.create({
            data: { userId, username, imageUrl, firstName, lastName, phone },
        });
        return res.json({ added: true, profile: newProfile });
    } catch (error) {
        res.status(500).json({ error: "error building profile" });
    }
});

//route to update profile on page if wanted - use patch to only update chnaged fields
router.patch('/:userId/:username', async (req, res) => {
    const { userId, username } = req.params;
    const data = req.body; // Only fields provided will be updated
    try {
        const updatedProfile = await prisma.profile.update({
            where: {
                userId_username: {
                    userId,
                    username,
                },
            },
            data, // This will only update the fields present in req.body
        });
        res.json({ updated: true, profile: updatedProfile });
    } catch (error) {
        if (error.code === 'P2025') { // Prisma not found error
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(500).json({ error: 'Error updating profile' });
    }
});


module.exports = router;