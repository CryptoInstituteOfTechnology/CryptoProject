const sendEmails = require('./sendmail/sendmail')
const parseArticles = require('./parseArticles/parseArticles')
const sentimentalArticles = require('./sentiment/sentiment-analysis')



async function main() {
    const articles = await sentimentalArticles();
    await parseArticles(articles);
    await sendEmails();
}

main();