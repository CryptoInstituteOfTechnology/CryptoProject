import requests
import json

class SupabaseAPIWrapper:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip("/")
        self.headers = {'Content-Type': 'application/json'}
    
    def _handle_response(self, response):
        try:
            response.raise_for_status()
            return response.json()
        except requests.HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        except Exception as err:
            print(f"Other error occurred: {err}")
        return None

    def get_all_users(self):
        """Fetch all users via Supabase admin auth."""
        url = f"{self.base_url}/users"
        response = requests.get(url, headers=self.headers)
        return self._handle_response(response)
    
    def get_portfolio_entries(self, user_id):
        """Fetch portfolio entries for a given user ID."""
        url = f"{self.base_url}/portfolio/{user_id}"
        response = requests.get(url, headers=self.headers)
        return self._handle_response(response)

    def get_latest_transactions(self, user_id):
        """Fetch the latest 15 transactions for a given user ID."""
        url = f"{self.base_url}/transactions/{user_id}"
        response = requests.get(url, headers=self.headers)
        return self._handle_response(response)

    def get_recommendations(self, user_id):
        """Fetch recommendations for a given user ID."""
        url = f"{self.base_url}/recommendations/{user_id}"
        response = requests.get(url, headers=self.headers)
        return self._handle_response(response)
    
    def post_recommendations(self, recommendation_list):
        url = f"{self.base_url}/recommendations"
        payload = json.dumps(recommendation_list)
        response = requests.post(url, headers=self.headers, data=payload)
        try:
            response.raise_for_status()
        except requests.HTTPError as e:
            print(f"HTTP error occurred: {e} for url: {url}")
            raise
        return self._handle_response(response)
