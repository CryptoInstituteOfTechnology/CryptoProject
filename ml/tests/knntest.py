import datetime
from recommend.knn import knn
from utils.buildvectors import build_vector
sample_portfolios = {
    "user_1": [
        {"id": 1, "userId": "user_1", "symbol": "BTC", "quantity": 2, "avgPrice": 30000.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 30, 0)},
        {"id": 2, "userId": "user_1", "symbol": "ETH", "quantity": 10, "avgPrice": 2000.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 31, 0)},
    ],
    "user_2": [
        {"id": 3, "userId": "user_2", "symbol": "BTC", "quantity": 1, "avgPrice": 32000.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 32, 0)},
        {"id": 4, "userId": "user_2", "symbol": "SOL", "quantity": 50, "avgPrice": 40.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 33, 0)},
    ],
    "user_3": [
        {"id": 5, "userId": "user_3", "symbol": "ETH", "quantity": 5, "avgPrice": 2100.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 34, 0)},
    ],
    "user_4": [
        {"id": 6, "userId": "user_4", "symbol": "ADA", "quantity": 1000, "avgPrice": 1.2, "updatedAt": datetime.datetime(2025, 7, 20, 22, 35, 0)},
        {"id": 7, "userId": "user_4", "symbol": "DOT", "quantity": 300, "avgPrice": 25.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 36, 0)},
    ],
    "user_5": [
        {"id": 9, "userId": "user_5", "symbol": "ETH", "quantity": 20, "avgPrice": 1900.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 38, 0)},
        {"id": 10, "userId": "user_5", "symbol": "XRP", "quantity": 5000, "avgPrice": 0.5, "updatedAt": datetime.datetime(2025, 7, 20, 22, 39, 0)},
    ],
    "user_6": [
        {"id": 11, "userId": "user_6", "symbol": "LTC", "quantity": 15, "avgPrice": 150.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 40, 0)},
        {"id": 12, "userId": "user_6", "symbol": "DOGE", "quantity": 10000, "avgPrice": 0.07, "updatedAt": datetime.datetime(2025, 7, 20, 22, 41, 0)},
    ],
    "user_7": [
        {"id": 13, "userId": "user_7", "symbol": "ETH", "quantity": 7, "avgPrice": 2050.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 42, 0)},
        {"id": 14, "userId": "user_7", "symbol": "SOL", "quantity": 100, "avgPrice": 38.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 43, 0)},
        {"id": 15, "userId": "user_7", "symbol": "MATIC", "quantity": 2000, "avgPrice": 1.1, "updatedAt": datetime.datetime(2025, 7, 20, 22, 44, 0)},
    ],
    "user_8": [
        {"id": 16, "userId": "user_8", "symbol": "BTC", "quantity": 3, "avgPrice": 31000.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 45, 0)},
    ],
    "user_9": [
        {"id": 17, "userId": "user_9", "symbol": "ETH", "quantity": 12, "avgPrice": 1950.0, "updatedAt": datetime.datetime(2025, 7, 20, 22, 46, 0)},
        {"id": 18, "userId": "user_9", "symbol": "ADA", "quantity": 500, "avgPrice": 1.3, "updatedAt": datetime.datetime(2025, 7, 20, 22, 47, 0)},
    ],
    "user_10": [
        {"id": 19, "userId": "user_10", "symbol": "DOT", "quantity": 400, "avgPrice": 24.5, "updatedAt": datetime.datetime(2025, 7, 20, 22, 48, 0)},
        {"id": 20, "userId": "user_10", "symbol": "XRP", "quantity": 3000, "avgPrice": 0.55, "updatedAt": datetime.datetime(2025, 7, 20, 22, 49, 0)},
    ],
}

user_id_to_vector = {}

for x in sample_portfolios:
    vector = build_vector(sample_portfolios[x])
    if vector:
        user_id_to_vector[x] = vector
    

target_user = "user_1"


if __name__ == "__main__":
    k = 2
    for user_id in user_id_to_vector:
        neighbors = knn(user_id, user_id_to_vector, k=k)
        print(f"\nTop {k} neighbors for {user_id}:")
        
        for neighbor_id, similarity_score in neighbors:
            print(f" name: {neighbor_id} simialrity score: {similarity_score}")