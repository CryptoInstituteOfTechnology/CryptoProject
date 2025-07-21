# given a portfolio build a vector
#store weights in a dictionary key vlaue pair
from datetime import datetime, timezone
from dateutil import parser
from utils.timedecay import time_decay_weight
#possible cryptos
crypto_symbols = [
    "BTC", "ETH", "BNB",
    "LTC", "XRP", "EOS", 
    "TRX", "ADA", "XMR", 
    "DASH","ZEC", "QTUM",
    "IOTA", "NEO", "ARB", 
    "VET", "ONT", "LINK", 
    "XTZ", "RVN","DOGE",
    "SOL", "DOT", "FTM", 
    "XLM", "SUI", "NEAR"
]


#build this for raw weight simplicity and so that when we use vector in another program we know which index is what
symbol_indexes = {}
index_ctr = 0

for symbol in crypto_symbols:
    symbol_indexes[symbol] = index_ctr
    index_ctr += 1
    
def build_vector(portfolio_entries): 
    """
    takes portfolio entries - which is a list of dictonaries of someones portfolio entries and turns it
    into a vector of 27 deminsions(we have 27 diff cryptos based on percentage of portfolio and when it was last updates
    to get rid of difference in portfolio similairity btwn long term and short term investors)
    Portfolio entry contains a key for symbol, quantity,avg price, and lastupdated
    get the perctnages of what protfolio entires make up of the portfolio,
    """
    now = datetime.utcnow() #timezone independent timestamp

    #raw weights are floats
    raw_weight = {}
    for symbol in crypto_symbols:
        raw_weight[symbol] = 0.0
        
    #for each entry do avgprice * quantity * timedecay 
    for entry in portfolio_entries:
        #symbol from DB is uppercase just like in symbol_indexes
        symbol = entry["symbol"]
        quantity = float(entry["quantity"])
        avg_price = float(entry["avgPrice"])
        updated_at= entry["updatedAt"]
        
        #all symbols in portoflio entries should be known
        if symbol not in symbol_indexes:
            continue
            
        #get decay %
        updated_at = parser.parse(updated_at)
        if updated_at.tzinfo is not None:
            updated_at = updated_at.replace(tzinfo=None)  # make naive by removing tzinfo
        days_ago = (now - updated_at).days
        decay = time_decay_weight(days_ago)
        #quality to add in raw values
        value = quantity * avg_price * decay
        raw_weight[symbol] = value
    #total val for vectorization
    total_value = 0.0
    for symbol in crypto_symbols:
        total_value += raw_weight[symbol]
    #prevent portfolios with no entries so far
    if total_value > 0:
        vector = []
        for symbol in crypto_symbols:
            value = raw_weight[symbol]
            percentage = value / total_value
            vector.append(percentage)
        return vector
    
    return None