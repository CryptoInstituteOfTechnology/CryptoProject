const nodemailer = require('nodemailer');
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const path = require('path');
const supabase = require('../supabaseClient');
const buildEmail = require('./buildEmail');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});

// Function to sort by most positive, most negative, lowest negative, lowest positive
function sortbySeverity(articles, key = "positiveScore", dir = "desc") {
    const direction = dir === 'asc' ? 1 : -1;
    return [...articles].sort((a, b) => (a[key] - b[key]) * direction);
}

// Gets user email for sending
async function getUserEmail(userId) {
    try {
        const { data, error } = await supabase.auth.admin.getUserById(userId);
        if (error) {
            return null;
        }
        const email = data?.user?.email;
        return email;
    } catch (err) {
        return null;
    }
}

async function sendEmails() {
    try {
        // Get users with portfolio entries, distinct userIds
        const users = await prisma.portfolioEntry.findMany({
            select: { userId: true },
            distinct: ['userId'],
        });

        // Get all unsent articles
        const articles = await prisma.article.findMany({
            where: { sent: false },
        });

        if (!articles.length) {
            return;
        }

        // Map symbols to articles
        const symbolArticleMap = new Map();
        for (const article of articles) {
            for (const symbol of article.symbols) {
                if (!symbolArticleMap.has(symbol)) {
                    symbolArticleMap.set(symbol, []);
                }
                symbolArticleMap.get(symbol).push(article);
            }
        }

        // Send emails to users
        for (const { userId } of users) {
            try {
                // Get user portfolio symbols
                const portfolio = await prisma.portfolioEntry.findMany({
                    where: { userId },
                });
                const userSymbols = portfolio.map(entry => entry.symbol);

                // Collect matched articles for user
                const matchedArticlesSet = new Set();
                for (const symbol of userSymbols) {
                    if (symbolArticleMap.has(symbol)) {
                        symbolArticleMap.get(symbol).forEach(article => matchedArticlesSet.add(article));
                    }
                }

                if (matchedArticlesSet.size === 0) {
                    continue;
                }

                // Sort articles by positiveScore descending by default
                const matchedArticles = Array.from(matchedArticlesSet);
                const sortedArticles = sortbySeverity(matchedArticles, "positiveScore", "desc");

                // Get user email
                const email = await getUserEmail(userId);
                if (!email) {
                    continue;
                }

                // Build email content
                const html = buildEmail(sortedArticles);
                const mailOptions = {
                    from: `Crypto Alerts <${process.env.MAIL_USERNAME}>`,
                    to: email,
                    subject: "Your Crypto News Update",
                    html,
                };

                try {
                    await transporter.sendMail(mailOptions);
                } catch (sendError) {
                    throw new Error(`Failed to send email to ${email}: ${sendError.message || sendError}`);
                }
            } catch (userError) {
                throw new Error(`Error processing user ${userId}: ${userError.message || userError}`);
            }
        }

        // Mark articles as sent
        const articleIds = articles.map(article => article.id);
        try {
            await prisma.article.updateMany({
                where: { id: { in: articleIds } },
                data: { sent: true },
            });
        } catch (updateError) {
            throw new Error(`Failed to mark articles as sent: ${updateError.message || updateError}`);
        }
    } catch (err) {
        throw new Error(`Unexpected error in sendEmails: ${err.message || err}`);
    }
}

module.exports = sendEmails;