const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const symbols = require('./symbols.json')
// return associated symbols with article
function classifySymbols(article) {
    const associatedTickers = article.CATEGORY_DATA.filter((category) => {
        return symbols.tickers.includes(category.NAME);
    }).map((category) => category.NAME);
    return associatedTickers;
}
//create DB entries for articles and add to DB
async function parseArticles(articles) {
    const articlesToParse = articles;

    for (const article of articlesToParse) {
        const associatedTickers = classifySymbols(article);
        const publishedOnDate = new Date(article.PUBLISHED_ON * 1000);
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
        } catch (error) {
            console.error(`Error adding article with GUID ${article.GUID}:`, error);
        }
    }
}

module.exports = parseArticles