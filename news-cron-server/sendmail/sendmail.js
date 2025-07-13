const nodeMailer = require('nodemailer')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});


async function getUserEmail(userId) {
    return `${userId}@gmail.com`
}

async function sendEmails() {
    // get users with portfolio entries, get all distinct Ids
    const users = await prisma.portfolioEntry.findMany({
        select: {
            userId: true
        },
        distinct: ['userId']
    })
    // get all unsent articles
    const articles = await prisma.article.findMany({
        where: {
            sent: false
        }
    })
    // map symbols to articles - create table
    // ex BTC ;[article1,article2] -> then you can loop by user and add all articles to one email
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


    for (const { userId } of users) {

        // get user portfolio
        const portfolio = await prisma.portfolioEntry.findMany(
            {
                where: { userId }
            }
        )


        const userSymbols = portfolio.map(entry => entry.symbol)
        const matchedArticles = new Set() // create set for articles that will be sent

        //find matching symbols in portfolio with articles associated, then add them to set
        for (const symbol of userSymbols) {
            if (symbolArticleMap.has(symbol)) {
                symbolArticleMap.get(symbol).forEach((article) => {
                    matchedArticles.add(article)
                })
            }
        }

        if (matchedArticles.size > 0) {
            // get email address from supabase
            const email = await getUserEmail(userId)

            const mailOptions = {
                from: `Crypto Alerts <${process.env.MAIL_USERNAME}>`,
                to: email,
                subject: "Your Crypto News Update",
                html: html
            }




            const html = buildEmail(Array.from(matchedArticles))
            try{
                await transporter.sendMail(mailOptions)
                console.log("email sent to" , email)
            }catch(error){
                console.error(`failed to send email`)
            }
            
        }

    }

    // mark articles as sent

    const articleId = articles.map(article => article.id)
    await prisma.article.updateMany({
        where: {
            id: { in: articleId }
        },
        data: {
            sent: true
        }
    })
}





//batch users articles to one email to save request amounts

