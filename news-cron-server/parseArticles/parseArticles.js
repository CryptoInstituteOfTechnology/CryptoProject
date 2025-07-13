const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const symbols = require('./symbols.json')
const articles = require('./articles.json')
// return associated symbols with article
function classifySymbols(article) {
    const associatedTickers = article.CATEGORY_DATA.filter((category) => {
        return symbols.tickers.includes(category.NAME);
    }).map((category) => category.NAME);
    return associatedTickers;
}
//create DB entries for articles with info we want!
async function parseArticles(articles) {
    const articlesToParse = articles;
    // Logic to parse it
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
                    mixedScore: article.SentimentScores.mixedScore || 0,
                    negativeScore: article.SentimentScores.negativeScore || 0,
                    neutralScore: article.SentimentScores.neutralScore || 0,
                    positiveScore: article.SentimentScores.positiveScore || 0,
                    sent: article.sent || false,
                    publishedOn: publishedOnDate,
                },
            });
        } catch (error) {
            console.error(`Error adding article with GUID ${article.GUID}:`, error);
        }
    }
}

parseArticles(articles)

module.exports = parseArticles