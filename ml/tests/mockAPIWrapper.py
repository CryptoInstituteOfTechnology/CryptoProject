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
        now = datetime.utcnow()
        return self._handle_response([
            {
                "symbol": "ETH",
                "type": "buy",
                "amount": 5000.0,
                "createdAt": (now - timedelta(days=1)).isoformat()
            },
            {
                "symbol": "DOGE",
                "type": "buy",
                "amount": 800.0,
                "createdAt": (now - timedelta(days=2)).isoformat()
            },
            {
                "symbol": "BTC",
                "type": "sell",
                "amount": 1500.0,
                "createdAt": (now - timedelta(days=3)).isoformat()
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
