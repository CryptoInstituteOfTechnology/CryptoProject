import datetime
from dateutil import parser
from .timedecay import time_decay_weight
def score_transactions_k(transactions, top_k=4):
    """
    given a list of transactions from multiple users return the highest rated transactions, ignores sell transaction
    """
    now = datetime.datetime.now(datetime.timezone.utc)  # timezone-aware now
    scored_transactions = {}

    for transaction in transactions:
        try:
            if transaction["type"] != "BUY":
                continue
            user_id = transaction["userId"]
            symbol = transaction["symbol"]
            quantity = transaction["quantity"]
            price = float(transaction["price"])
            created_at = transaction["createdAt"]
            created_at_dt = parser.parse(created_at)
            if created_at_dt.tzinfo is None:
                created_at_dt = created_at_dt.replace(tzinfo=datetime.timezone.utc)
        except (ValueError) as error:
            print(f"skipping invalid transaction {error}")
            continue
        decay = time_decay_weight((now - created_at_dt).days)
        size = abs(quantity * price)
        score = decay * size
        #use symbol as a key and only change if scoe is higher than usual to help ranking
        if (symbol not in scored_transactions) or (score > scored_transactions[symbol]["score"]):
            scored_transactions[symbol] = {
                "user_id": user_id,
                "symbol": symbol,
                "score":score
            }
        
    top_recs = sorted(scored_transactions.values(), key = lambda x: x["score"], reverse=True)
    return top_recs[:top_k]
    