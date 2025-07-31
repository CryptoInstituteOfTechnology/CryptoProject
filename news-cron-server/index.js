const sendEmails = require('./sendmail/sendmail')
const parseArticles = require('./parseArticles/parseArticles')
const sentimentalArticles = require('./sentiment/sentiment-analysis')
const cron = require('node-cron')
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

// use this to keep pinging render service
app.get('/', (_, res) => {
    res.send('News Cron Job Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

async function main() {
    console.log('Running cron job at', new Date().toISOString());

    try {
        const articles = await sentimentalArticles();
        await parseArticles(articles);
        await sendEmails();
        console.log('Cron job done');
    } catch (err) {
        console.error('Error in cron job:', err);
    }
}

main();