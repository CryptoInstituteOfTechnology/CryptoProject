const sendEmails = require('./sendmail/sendmail')
const parseArticles = require('./parseArticles/parseArticles')
const sentimentalArticles = require('./sentiment/sentiment-analysis')

const sentimentalArticles = require('./sentimentalArticles');
const parseArticles = require('./parseArticles');
const sendEmails = require('./sendEmails');

async function main() {
    const articles = await sentimentalArticles();
    await parseArticles(articles);
    await sendEmails();
}

main();