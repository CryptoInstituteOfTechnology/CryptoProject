const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const symbols = require('./symbols.json')

// return associated symbols with article
function classifySymbols(article) {
    const associatedTickers = article.CATEGORY_DATA.filter((category) => {
        return symbols.tickers.includes(category.NAME);
    }).map((category) => category.NAME);
    return associatedTickers;
}
//create DB entries for articles with info we want!
async function parseArticles(articles) {
    const articlesToParse = articles


    //logic to parse it
    articlesToParse.forEach((article) => {
        classifySymbols(article)





    })



}