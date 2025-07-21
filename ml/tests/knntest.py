import datetime
from ..recommend.knn import knn
from ..utils.buildvectors import build_vector
sample_portfolios = {
    "user_1": [
        {
            "id": 1,
            "userId": "user_1",
            "symbol": "BTC",
            "quantity": 2,
            "avgPrice": 30000.0,
            "updatedAt": datetime.datetime(2025, 7, 20, 22, 30, 0)
        },
        {
            "id": 2,
            "userId": "user_1",
            "symbol": "ETH",
            "quantity": 10,
            "avgPrice": 2000.0,
            "updatedAt": datetime.datetime(2025, 7, 20, 22, 31, 0)
        }
    ],
    "user_2": [
        {
            "id": 3,
            "userId": "user_2",
            "symbol": "BTC",
            "quantity": 1,
            "avgPrice": 32000.0,
            "updatedAt": datetime.datetime(2025, 7, 20, 22, 32, 0)
        },
        {
            "id": 4,
            "userId": "user_2",
            "symbol": "SOL",
            "quantity": 50,
            "avgPrice": 40.0,
            "updatedAt": datetime.datetime(2025, 7, 20, 22, 33, 0)
        }
    ],
    "user_3": [
        {
            "id": 5,
            "userId": "user_3",
            "symbol": "ETH",
            "quantity": 5,
            "avgPrice": 2100.0,
            "updatedAt": datetime.datetime(2025, 7, 20, 22, 34, 0)
        }
    ]
}

user_id_to_vector = {}

for x in sample_portfolios:
    vector = build_vector(sample_portfolios[x])
    user_id_to_vector[x] = vector
    

    