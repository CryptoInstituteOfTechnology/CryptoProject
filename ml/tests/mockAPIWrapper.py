
class SupabaseAPIWrapperMock:
    def __init__(self, base_url=None):
        self.base_url = base_url
        self.headers = {'Content-Type': 'application/json'}
    def _handle_response(self, response):
        # In the mock, just return the response directly
        return response
    def get_all_users(self):
        """Return fake list of users."""
        fake_users = [
            {"id": "user1", "email": "user1@example.com", "name": "User One"},
            {"id": "user2", "email": "user2@example.com", "name": "User Two"},
            {"id": "user3", "email": "user3@example.com", "name": "User Three"},
        ]
        return self._handle_response(fake_users)
    def get_portfolio_entries(self, user_id):
        """Return fake portfolio entries for a given user ID."""
        fake_portfolio = [
            {"id": 1, "userId": user_id, "symbol": "AAPL", "shares": 10, "price": 150.0},
            {"id": 2, "userId": user_id, "symbol": "GOOGL", "shares": 5, "price": 2800.0},
        ]
        return self._handle_response(fake_portfolio)
    def get_latest_transactions(self, user_id, limit=15):
        """Return fake latest transactions for a given user ID."""
        fake_transactions = [
            {"id": i, "userId": user_id, "symbol": "AAPL", "type": "buy", "shares": 1, "createdAt": f"2025-07-2{i}T12:00:00Z"}
            for i in range(1, limit + 1)
        ]
        return self._handle_response(fake_transactions)
    def get_recommendations(self, user_id):
        """Return fake recommendations for a given user ID."""
        fake_recommendations = [
            {"id": 1, "userId": user_id, "symbol": "TSLA", "note": "Strong buy"},
            {"id": 2, "userId": user_id, "symbol": "MSFT", "note": "Hold"},
        ]
        return self._handle_response(fake_recommendations)
    def post_recommendations(self, user_id, recommendation_data):
        """Mock posting a recommendation, just return success message."""
        return self._handle_response({
            "message": "Recommendation added (mock)",
            "userId": user_id,
            "recommendation": recommendation_data,
        })