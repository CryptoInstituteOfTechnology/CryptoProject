const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    // get portfolio entries
    try {
        const portfolio = await prisma.portfolioEntry.findMany(
            {
                where: { userId }
            }
        )
        const userSymbols = portfolio.map(entry => entry.symbol)
        //only get 15 articles, 15 articles is on average the amount for past 2 cron jobs
        const articles = await prisma.article.findMany({
            take: 15,
            orderBy: {
                createdAt: 'desc',
            },
        })
        //map out symbols
        const symbolArticleMap = new Map()
        for (const article of articles) {
            for (const symbol of article.symbols) {
                if (!symbolArticleMap.has(symbol)) {
                    //create a new key map pairing
                    symbolArticleMap.set(
                        symbol, []
                    )
                }
                symbolArticleMap.get(symbol).push(article)
            }
        }
        // find articles that match the symbols in portfolios
        const matchedArticles = new Set()
        for (const symbol of userSymbols) {
            if (symbolArticleMap.has(symbol)) {
                symbolArticleMap.get(symbol).forEach((article) => {
                    matchedArticles.add(article)
                })
            }
        }
        res.json(Array.from(matchedArticles))
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;