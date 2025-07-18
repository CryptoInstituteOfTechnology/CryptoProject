# given a portfolio build a vector
#store weights in a dictionary key vlaue pair
from datetime import datetime
from collections import OrderedDict
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



