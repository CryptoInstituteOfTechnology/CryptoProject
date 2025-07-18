import math

#let older portfolios still matter, transactions will have a rate of .10 because recent matters a lot more
def time_decay_weight(days, decay_rate =0.05):
    
    if days < 0:
        raise ValueError("days must be > 0")
    
    if days == 0:
        return 1.0

    return math.exp(-decay_rate * days)

