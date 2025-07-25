function buildEmail(articles) {
    // Separate articles into positive and negative based on sentiment scores
    const positiveArticles = articles.filter(article => article.positiveScore > article.negativeScore);
    const negativeArticles = articles.filter(article => article.positiveScore <= article.negativeScore);

    // function to generate HTML for a list of articles
    function generateArticlesHTML(articleList) {
        return articleList.map(article => `
        <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
            <img src="${article.image_url}" alt="${article.title}" style="height: auto; max-width: 100%;" />
            <h2>${article.title}</h2>
            <p><strong>Symbols:</strong> ${article.symbols.join(', ')}</p>
            <a href="${article.guid}" target="_blank" rel="noopener noreferrer">Read Full Article</a>
        </div>
        `).join('');
        }

        // Generate HTML for positive and negative articles
        const positiveHTML = generateArticlesHTML(positiveArticles);
        const negativeHTML = generateArticlesHTML(negativeArticles);

        return `
        <html>
        <head>
            <style>
                body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                }
                a {
                color: #1a73e8;
                text-decoration: none;
                }
                h1, h2 {
                color: #222;
                }
                .section {
                margin-bottom: 40px;
                }
            </style>
        </head>
        <body>
            <h1>Latest Crypto News For You</h1>

            <div class="section">
                <h2>Positive Articles</h2>
                ${positiveHTML || '<p>No positive articles at this time.</p>'}
            </div>

            <div class="section">
                <h2>Negative Articles</h2>
                ${negativeHTML || '<p>No negative articles at this time.</p>'}
            </div>
        </body>
        </html>
    `;
}

module.exports = buildEmail;