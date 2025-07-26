const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const symbols = require('./symbols.json');

/**
 * Classify symbols found in an article based on CATEGORY_DATA and symbols.tickers
 */
function classifySymbols(article) {
    if (!article?.CATEGORY_DATA || !Array.isArray(article.CATEGORY_DATA)) {
        return [];
    }
    const associatedTickers = article.CATEGORY_DATA.filter((category) =>
        symbols.tickers.includes(category.NAME)
    ).map((category) => category.NAME);
    return associatedTickers;
}

/**
 * Parse and add articles to the database using Prisma
 */
async function parseArticles(articles) {
    if (!Array.isArray(articles) || articles.length === 0) {
        return { success: [], failed: [] };
    }

    const success = [];
    const failed = [];

    try {
        for (const article of articles) {
            const associatedTickers = classifySymbols(article);
            const publishedOnDate = article.PUBLISHED_ON ? new Date(article.PUBLISHED_ON * 1000) : null;

            // Validate required fields
            if (!article.GUID || !article.TITLE || !publishedOnDate) {
                failed.push({ article, error: 'Missing required fields' });
                continue;
            }

            try {
                const newArticle = await prisma.article.create({
                    data: {
                        guid: article.GUID,
                        title: article.TITLE,
                        symbols: associatedTickers,
                        image_url: article.IMAGE_URL,
                        sentiment: article.SENTIMENT,
                        mixedScore: article.SentimentScore?.Mixed || 0,
                        negativeScore: article.SentimentScore?.Negative || 0,
                        neutralScore: article.SentimentScore?.Neutral || 0,
                        positiveScore: article.SentimentScore?.Positive || 0,
                        sent: article.sent || false,
                        publishedOn: publishedOnDate,
                    },
                });
                success.push(newArticle);
            } catch (error) {
                // Handle expected errors
                failed.push({ article, error: error.message || error });
            }
        }
    } catch (fatalError) {
        // Unexpected errors in the main parseArticles loop
        throw fatalError; 
    } finally {
        await prisma.$disconnect();
    }

    if (success.length === 0 && failed.length > 0) {
        throw new Error('All articles failed to be added to the database.');
    }
    return { success, failed };
}

module.exports = parseArticles;