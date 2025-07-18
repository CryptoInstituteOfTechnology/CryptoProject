from datetime import datetime
from utils.buildvectors import build_vector, symbol_indexes

portfolio_entries = [
    {
        "id": 1,
        "userId": "user_abc123",
        "symbol": "BTC",
        "quantity": 10,
        "avgPrice": 30000.50,
        "updatedAt": datetime(2025, 7, 18, 11, 59, 0)
    },
    {
        "id": 2,
        "userId": "user_abc123",
        "symbol": "ETH",
        "quantity": 5,
        "avgPrice": 2000.75,
        "updatedAt": datetime(2025, 7, 17, 11, 59, 0)
    },
    {
        "id": 3,
        "userId": "user_xyz789",
        "symbol": "ADA",
        "quantity": 100,
        "avgPrice": 1.25,
        "updatedAt": datetime(2025, 7, 16, 11, 59, 0)
    },
    {
        "id": 4,
        "userId": "user_xyz789",
        "symbol": "SOL",
        "quantity": 50,
        "avgPrice": 35.10,
        "updatedAt": datetime(2025, 7, 15, 11, 59, 0)
    },
    {
        "id": 5,
        "userId": "user_abc123",
        "symbol": "DOT",
        "quantity": 20,
        "avgPrice": 18.75,
        "updatedAt": datetime(2025, 7, 14, 11, 59, 0)
    }
]

vector = build_vector(portfolio_entries)
for weight in vector:
    print(weight)

    