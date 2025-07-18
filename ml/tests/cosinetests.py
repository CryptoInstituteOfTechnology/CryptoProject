from datetime import datetime
from utils.buildvectors import build_vector
from utils.cosinesimilarity import cosine_similarity

portfolio_entries_user1 = [
    {
        "id": 1,
        "userId": "user_abc123",
        "symbol": "BTC",
        "quantity": 2,
        "avgPrice": 30000.50,
        "updatedAt": datetime(2025, 7, 18, 11, 59, 0)
    },
    {
        "id": 2,
        "userId": "user_abc123",
        "symbol": "ETH",
        "quantity": 30,
        "avgPrice": 2000.75,
        "updatedAt": datetime(2025, 7, 17, 11, 59, 0)
    },
    {
        "id": 5,
        "userId": "user_abc123",
        "symbol": "DOT",
        "quantity": 1000,
        "avgPrice": 18.75,
        "updatedAt": datetime(2025, 7, 14, 11, 59, 0)
    }
]
# Portfolio entries for user 2
portfolio_entries_user2 = [
    {
        "id": 3,
        "userId": "user_xyz789",
        "symbol": "ADA",
        "quantity": 1000,
        "avgPrice": 1.25,
        "updatedAt": datetime(2025, 7, 16, 11, 59, 0)
    },
    {
        "id": 4,
        "userId": "user_xyz789",
        "symbol": "SOL",
        "quantity": 500,
        "avgPrice": 35.10,
        "updatedAt": datetime(2025, 7, 15, 11, 59, 0)
    }
]
# Build vectors for each portfolio
vector1 = build_vector(portfolio_entries_user1)
vector2 = build_vector(portfolio_entries_user2)
similar = cosine_similarity(vector1,vector2)
print(f"simialrity score completely diff: {similar:.4f}")
#expected score is 0.00000, bc these portfolios arent similar at all -



#expect score of 100% bc two of the same portfolios
portfolio_entries_user3 = portfolio_entries_user1.copy()

vector3 = build_vector(portfolio_entries_user3)


similar2 = cosine_similarity(vector1,vector3)
print(f"simialrity score same to same: {similar2}") #prints 1.0 bc they are the same

#random score not calculating by hand but just want output , compare to vector 1 and 2
portfolio_entries_user4 = [
    {
        "id": 3,
        "userId": "user_xyz789",
        "symbol": "BTC",
        "quantity": 4,
        "avgPrice": 31500.00,
        "updatedAt": datetime(2025, 7, 16, 10, 45, 0)
    },
    {
        "id": 4,
        "userId": "user_xyz789",
        "symbol": "SOL",
        "quantity": 120,
        "avgPrice": 95.20,
        "updatedAt": datetime(2025, 7, 15, 9, 30, 0)
    },
    {
        "id": 6,
        "userId": "user_xyz789",
        "symbol": "ADA",
        "quantity": 50000,
        "avgPrice": 0.45,
        "updatedAt": datetime(2025, 7, 13, 8, 15, 0)
    }
]

vector4 = build_vector(portfolio_entries_user4)
similar4to1 = cosine_similarity(vector1,vector4)
similar4to2 = cosine_similarity(vector2,vector4)
print(f"simialrity score 4 to 1: {similar4to1}")
print(f"simialrity score 4 to 2: {similar4to2}")