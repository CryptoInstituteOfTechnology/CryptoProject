function buildEmail(articles) {
    // Create HTML for articles and join them
    const articleHTML = articles.map((article) => {
        return `
        <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
            <h2>${article.title}</h2>
            <p><strong>Symbols:</strong> ${article.symbols.join(', ')}</p>
            <a href="${article.guid}" target="_blank">Read Full Article</a>
        </div>
        `;
    }).join('');

    // Wrap it in a basic HTML layout for email
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
            </style>
        </head>
        <body>
            <h1>Latest Crypto News For You</h1>
            ${articleHTML}
        </body>
        </html>
    `;
}

module.exports = buildEmail