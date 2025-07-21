from datetime import datetime, timedelta

class SupabaseAPIWrapperMock:
    def __init__(self, base_url=None):
        self.base_url = base_url
        self.headers = {'Content-Type': 'application/json'}

    def _handle_response(self, response):
        return response  # no-op for mock

    def get_all_users(self):
        return [
            {"id": "user1", "email": "user1@example.com", "name": "User One"},
            {"id": "user2", "email": "user2@example.com", "name": "User Two"},
            {"id": "user3", "email": "user3@example.com", "name": "User Three"},
        ]

    def get_portfolio_entries(self, user_id):
        now = datetime.utcnow()
        mock_data = {
            "user1": [
                {"symbol": "BTC", "quantity": 2.0, "avgPrice": 30000.0, "updatedAt": now - timedelta(days=1)},
                {"symbol": "ETH", "quantity": 10.0, "avgPrice": 2000.0, "updatedAt": now - timedelta(days=2)},
            ],
            "user2": [
                {"symbol": "DOGE", "quantity": 5000.0, "avgPrice": 0.08, "updatedAt": now - timedelta(days=3)},
                {"symbol": "BTC", "quantity": 1.0, "avgPrice": 29000.0, "updatedAt": now - timedelta(days=4)},
            ],
            "user3": [
                {"symbol": "SOL", "quantity": 15.0, "avgPrice": 90.0, "updatedAt": now - timedelta(days=2)},
            ]
        }
        return self._handle_response(mock_data.get(user_id, []))

    def get_latest_transactions(self, user_id, limit=15):
        from datetime import datetime, timedelta
        now = datetime.utcnow()
    
        return self._handle_response([
            {
                "userId": user_id,
                "symbol": "ETH",
                "type": "BUY",
                "quantity": 2.0,
                "price": 2500.0,
                "createdAt": now - timedelta(days=1)
            },
            {
                "userId": user_id,
                "symbol": "DOGE",
                "type": "BUY",
                "quantity": 1000,
                "price": 0.08,
                "createdAt": now - timedelta(days=2)
            },
            {
                "userId": user_id,
                "symbol": "BTC",
                "type": "SELL",  # will be skipped by score_transactions_k()
                "quantity": 0.5,
                "price": 31000.0,
                "createdAt": now - timedelta(days=3)
            },
            {
                "userId": user_id,
                "symbol": "ARB",
                "type": "BUY",
                "quantity": 300.0,
                "price": 1.2,
                "createdAt": now - timedelta(days=4)
            },
            {
                "userId": user_id,
                "symbol": "SOL",
                "type": "BUY",
                "quantity": 15.0,
                "price": 90.0,
                "createdAt": now - timedelta(days=5)
            }
        ])


    def get_recommendations(self, user_id):
        return self._handle_response([
            {"symbol": "ETH", "note": "Strong buy"},
            {"symbol": "DOGE", "note": "Trending"}
        ])

    def post_recommendations(self, user_id, recommendation_data):
        print(f"\n[MOCK POST] Recommendations for {user_id}:")
        for rec in recommendation_data:
            print(f"  - {rec['symbol']}")
        return self._handle_response({
            "message": "Recommendation added (mock)",
            "userId": user_id,
            "recommendations": recommendation_data
        })
