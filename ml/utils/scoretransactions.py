#given a list of transactions rank them, for 
from .timedecay import time_decay_weight
import datetime

#needs all transactions merged together
def score_transactions_k(transactions, top_k = 4):
    """
    given a list of transactions from multiple users return the highest rated transactions, ignores sell transacton
    """
    now = datetime.utcnow()
    scored_transactions = {}
    
    for transaction in transactions:
        try:
            if transaction["type"] != "BUY":
                continue
            user_id = transaction["userId"]
            symbol = transactions["symbol"]
            quantity = transactions["quantity"]
            price = float(transactions["price"])
            created_at = transactions["createdAt"]
        except (ValueError) as error:
            print(f"skipping invalid transaction {error}")
            continue
        
        #rank based on days, and size and then multply
        
        decay = time_decay_weight((now - created_at).days)
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
    return top_recs
    