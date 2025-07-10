// this function fetches the latest news articles then filters them by if their benchmark is > 0 - which means somewhat credible
// then it sends these articles to Amazon Comprehend and gets the sentiment
// then it cheks each one, if its negative or positive setiment > .150 then it gets put in return object that puts these articles in a Database with key symbols
export async function sentimentalArticles