import requests
import json

class SupabaseAPIWrapper:
    """A Python module that wraps API calls for a Supabase/Postgres Flask app.
    """
    
    def __init__(self, base_url):
        self.base_url = base_url
        self.headers = {'Content-Type': 'application/json'}
    
    def _handle_response(self, response):
        """Handle the HTTP response."""
        try:
            response.raise_for_status()  # Raise an error for bad responses
            return response.json()
        except requests.HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        except Exception as err:
            print(f"Other error occurred: {err}")
        return None

    def get_all_users(self):
        """Fetch all users."""
        url = f"{self.base_url}/users"
        response = requests.get(url, headers=self.headers)
        return self._handle_response(response)
    
    def get_portfolio_entries(self, user_id):
        """Fetch portfolio entries for a given user ID."""
        url = f"{self.base_url}/users/{user_id}/portfolios"
        response = requests.get(url, headers=self.headers)
        return self._handle_response(response)

    def get_latest_transactions(self, user_id, limit=15):
        """Fetch the latest transactions for a given user ID, limited to a specified number."""
        url = f"{self.base_url}/users/{user_id}/transactions?limit={limit}"
        response = requests.get(url, headers=self.headers)
        return self._handle_response(response)

    def get_recommendations(self, user_id):
        """Fetch recommendations for a given user ID."""
        url = f"{self.base_url}/users/{user_id}/recommendations"
        response = requests.get(url, headers=self.headers)
        return self._handle_response(response)
    
    def post_recommendation(self, user_id, recommendation_data):
        """Post a new recommendation for a given user ID."""
        url = f"{self.base_url}/users/{user_id}/recommendations"
        response = requests.post(url, headers=self.headers, data=json.dumps(recommendation_data))
        return self._handle_response(response)