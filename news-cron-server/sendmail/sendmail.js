const nodeMailer = require('nodemailer')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




// get users with portfolio entries, get all distinct Ids
const users = await.prisma.portfolioEntries.findMany({
    select:{
        userId:true
    },
    distinct:['userId']
})


// get all unsent articles

const articles = await prisma.article.findMany({
    where:{
        sent: false
    }
})


// map symbols to articles - create table
// ex BTC ;[article1,article2] -> then you can loop by user and add all articles to one email
const symbolArticleMap = new Map()
for (const article of articles){
    for(const symbol of article.symbols){
        if (!symbolArticleMap.has(symbol)){
            //create a new key map pairing
            symbolArticleMap.set(
                symbol, []
            )
        }
        symbolArticleMap.get(symbol).push(article)
    }
}




//batch users articles to one email to save request amounts

