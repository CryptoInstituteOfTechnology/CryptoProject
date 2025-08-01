const { ComprehendClient, BatchDetectSentimentCommand } = require("@aws-sdk/client-comprehend");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const baseUrl = 'https://data-api.coindesk.com/news/v1/article/list';
const tickers = [
    "BTC", "ETH", "BNB", "LTC", "XRP", "EOS", "TRX", "ADA", "XMR",
    "DASH", "ZEC", "QTUM", "IOTA", "NEO", "ARB", "VET", "ONT", "LINK",
    "XTZ", "RVN", "DOGE", "SOL", "DOT", "FTM", "XLM", "SUI", "NEAR"
];
const params = {
    lang: "EN",
    limit: "20",
    categories: tickers.join(","),
    api_key: process.env.COINDESK_NEWS_API_KEY
};
const url = new URL(baseUrl);
url.search = new URLSearchParams(params).toString();
const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
};

const config = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
};
const client = new ComprehendClient(config);

/**
 * this function fetches news articles and sends them to AWS comprehend and then returns the articles wiht a high positive or negative sentiment
 * @returns articleswithextreme senitment - articles with positive or negative news that is important
 */
async function sentimentalArticles() {
    try {
        // Fetch news
        let responses;
        try {
            responses = await fetch(url, options);
            if (!responses.ok) {
                throw new Error(`HTTP error: ${responses.status} ${responses.statusText}`);
            }
        } catch (fetchErr) {
            throw fetchErr;
        }

        let json;
        try {
            json = await responses.json();
        } catch (jsonErr) {
            throw jsonErr;
        }

        const news = json.Data || [];
        const filteredNews = news.filter(
            article => article.SOURCE_DATA && article.SOURCE_DATA.BENCHMARK_SCORE > 0
        );
        if (filteredNews.length === 0) {
            throw new Error('No articles with benchmark score > 0');
        }

        // Prepare input for AWS Comprehend
        const input = {
            LanguageCode: "en",
            TextList: filteredNews.map(article => article.TITLE)
        };

        let response;
        try {
            const command = new BatchDetectSentimentCommand(input);
            response = await client.send(command);
        } catch (awsErr) {
            throw awsErr;
        }

        if (!response.ResultList) {
            throw new Error('No results returned from Comprehend');
        }

        // Map sentiment results back to articles
        const mapped = response.ResultList.map((result, index) => {
            try {
                const article = filteredNews[index];
                if (!article) {
                    throw new Error(`Article not found at index ${index}`);
                }
                return {
                    ...article,
                    Sentiment: result.Sentiment,
                    SentimentScore: result.SentimentScore
                };
            } catch (error) {
                return null;
            }
        }).filter(Boolean); // Remove nulls

        // Filter for extreme sentiment
        function checkSentimentRatio(article) {
            const positive = article.SentimentScore.Positive;
            const negative = article.SentimentScore.Negative;
            const ratio = (positive / negative )
            return ratio >= 3 || ratio <= 1 / 3;
        }
        const articlesExtremeSentiment = mapped.filter(checkSentimentRatio);

        if (articlesExtremeSentiment.length === 0) {
            return
        }

        return articlesExtremeSentiment;
    } catch (error) {
        throw error; // propagate error to caller
    }
}

module.exports = sentimentalArticles;