const { ComprehendClient, BatchDetectSentimentCommand, LanguageCode } = require("@aws-sdk/client-comprehend");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
//url setup, take all known tickers for url string
const baseUrl = 'https://data-api.coindesk.com/news/v1/article/list';
const tickers = [
    "BTC", "ETH", "BNB", "LTC", "XRP", "EOS", "TRX", "ADA", "XMR",
    "DASH", "ZEC", "QTUM", "IOTA", "NEO", "ARB", "VET", "ONT", "LINK",
    "XTZ", "RVN", "DOGE", "SOL", "DOT", "FTM", "XLM", "SUI", "NEAR"
];
const params = {
    lang: "EN",
    limit: "20",
    categories: tickers.join(","),  // join array to comma-separated string ex BTC,ETH
    api_key: process.env.COINDESK_NEWS_API_KEY
};
const url = new URL(baseUrl);
url.search = new URLSearchParams(params).toString();
const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
};
//configurations for accessing aws
// aws only support us-west-2(oregon) for comphrehend
const config = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
};
const client = new ComprehendClient(config);

/**
 * ## This function fetches news and then filters out the benchmark scores equal to 0.
 * - Makes a call to Amazon Comprehend to get the sentiment.
 * - Returns objects with a sentiment score (positive or negative) of 0.10 or higher.
 * - Filters out articles without a positive to negative ratio of 3 or 1/3.
 */
async function sentimentalArticles() {
    /**
     * - Only fetch 25 at a time: AWS Comprehend BatchDetect can only process 25 at a time without a job.
     * - Use normal fetch when calling from API, but use a special method to process fake data.
     * - URL will have all categories with tickers in regular production.
     */

    const responses = await fetch(url, options);
    const json = await responses.json()
    const news = json.Data || []
    const filteredNews = news.filter(
        article => article.SOURCE_DATA.BENCHMARK_SCORE > 0
    );
    const input = {
        LanguageCode: "en",
        TextList: filteredNews.map(article => article.TITLE)
    }
    const command = new BatchDetectSentimentCommand(input) // sets up command
    const response = await client.send(command); // get sentiment
    // map response back to original data
    const mapped = response.ResultList.map((result, index) => {
        try {
            const article = filteredNews[index]
            if (!article) {
                throw new Error(`Article not found at index ${index}`)
            }
            return {
                ...article,
                Sentiment: result.Sentiment,
                SentimentScore: result.SentimentScore
            }
        } catch (error) {
            console.error(`Error mapping article at index ${index}:`, error)
            return null // or some other default value
        }
    })
    //for each aritcle, if its negative or pos score ratio is more than 3:1 or 1:3 keep
    function checkSentimentRatio(article) {
        const positive = article.SentimentScore.Positive
        const negative = article.SentimentScore.Negative
        const ratio = positive / negative
        return ratio >= 3 || ratio <= 1 / 3
    }
    const articlesExtremeSentiment = mapped.filter(checkSentimentRatio)
    return articlesExtremeSentiment
}

module.exports = sentimentalArticles;
