import datetime
from dateutil import parser
from .timedecay import time_decay_weight
def score_transactions_k(
                        transactions, 
                        target_user,
                        watchlist_symbols: set[str] | None,
                        watchlist_boost = 1.75,
                        similarity_boost = 1.0,
                        top_k=4
):
    """
    Given a list of transactions from multiple users, return the highest rated transactions.
    Ignores 'SELL' transactions.
    """
    now = datetime.datetime.now(datetime.timezone.utc)  # timezone-aware current time
    scored_transactions = {}
    for transaction in transactions:
        try:
            # Skip non-buy transactions
            if transaction.get("type") != "BUY":
                continue
            user_id = transaction["userId"]
            symbol = transaction["symbol"]
            quantity = transaction["quantity"]
            price = float(transaction["price"])
            created_at = transaction["createdAt"]
            # Parse and ensure timezone-aware datetime
            created_at_dt = parser.parse(created_at)
            if created_at_dt.tzinfo is None:
                created_at_dt = created_at_dt.replace(tzinfo=datetime.timezone.utc)
        except (ValueError, KeyError, TypeError) as error:
            print(f"Skipping invalid transaction due to error: {error}")
            continue
        # Calculate decay weight based on transaction age
        decay = time_decay_weight((now - created_at_dt).days)
        size = abs(quantity * price)
        score = decay * size
        # Boost score if symbol is in user's watchlist
        if watchlist_symbols and symbol in watchlist_symbols:
            score *= (watchlist_boost + similarity_boost)
        # Keep only the highest score per symbol
        if (symbol not in scored_transactions) or (score > scored_transactions[symbol]["score"]):
            scored_transactions[symbol] = {
                "userId": target_user,
                "symbol": symbol,
                "score": score,
            }
            
        # Sort scored transactions by score descending and return top_k
    top_recs = sorted(scored_transactions.values(), key=lambda x: x["score"], reverse=True)
    return top_recs[:top_k]