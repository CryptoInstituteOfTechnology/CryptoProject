import unittest
from unittest.mock import patch, MagicMock
from ..routes import app
from types import SimpleNamespace
class TestSensitiveRoutes(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
    
    #testing for users - supabase auth
    @patch('routes.admin_auth_client')
    def test_get_users(self, mock_admin_auth):
        mock_admin_auth.list_users.return_value = [
            SimpleNamespace(id='fakeid1'),
            SimpleNamespace(id='fakeid2')
        ]

        response = self.client.get('/users')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data[0]['id'], 'fakeid1')

    #testing for portoflio
    @patch('routes.conn')
    def test_get_portfolio(self, mock_conn):
        # Mock cursor
        mock_cursor = MagicMock()
        mock_cursor.fetchall.return_value = [{'userId': 'fakeid', 'entry': 'fakeentry'}]
        mock_conn.cursor.return_value.__enter__.return_value = mock_cursor
        response = self.client.get('/portfolio/fakeid')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data[0]['userId'], 'fakeid')
    
    #testing for transactions
    @patch('routes.conn')
    def test_get_transactions(self, mock_conn):
        mock_cursor = MagicMock()
        mock_cursor.fetchall.return_value = [
            {'userId': 'user1', 'amount': 100, 'createdAt': '2023-01-01T00:00:00Z'},
            {'userId': 'user1', 'amount': 50, 'createdAt': '2023-01-02T00:00:00Z'}
        ]
        mock_conn.cursor.return_value.__enter__.return_value = mock_cursor
        response = self.client.get('/transactions/user1')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['amount'], 100)
    #testing for recs
    @patch('routes.conn')
    def test_get_recommendations(self, mock_conn):
        mock_cursor = MagicMock()
        mock_cursor.fetchall.return_value = [
            {'userId': 'user1', 'symbol': 'BTC'},
            {'userId': 'user1', 'symbol': 'ETH'}
        ]
        mock_conn.cursor.return_value.__enter__.return_value = mock_cursor
        response = self.client.get('/recommendations/user1')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['symbol'], 'BTC')
    #testing for post
    @patch('routes.conn')
    def test_post_recommendation_success(self, mock_conn):
        mock_cursor = MagicMock()
        mock_conn.cursor.return_value.__enter__.return_value = mock_cursor
        response = self.client.post('/recommendations', json={'userId': 'user1', 'symbol': 'BTC'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.get_json(), {'message': 'Recommendation added'})
        mock_conn.commit.assert_called_once()
        
    
if __name__ == '__main__':
    unittest.main()