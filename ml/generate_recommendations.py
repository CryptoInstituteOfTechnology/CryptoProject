from routing.supabasewrapper import SupabaseAPIWrapper
from utils.buildvectors import build_vector
from recommend.knn import knn
from utils.scoretransactions import score_transactions_k

def generate_recommendations_for_users(api):
    """
    Generate and post recommendations for all users based on their portfolio similarity.
    """
    all_users = api.get_all_users()
    if not isinstance(all_users, list):
        return
    users_vectors_map = {}
    # Build user vectors from portfolios
    for user in all_users:
        uid = user.get("id")
        if not uid:
            continue
        portfolio = api.get_portfolio_entries(uid)
        if portfolio:
            vector = build_vector(portfolio)
            if vector:
                users_vectors_map[uid] = vector
    # For each user, find top 3 similar users and generate recommendations
    for user in all_users:
        user_id = user.get("id")
        if not user_id or user_id not in users_vectors_map:
            continue
        try:
            top_similar = knn(user_id, users_vectors_map, k=3)
        except ValueError:
            continue
        all_transactions = []
        # Aggregate transactions from top similar users
        for similar_id, score in top_similar:
            transactions = api.get_latest_transactions(similar_id)
            if transactions:
                all_transactions.extend(transactions)
        watchlist = api.get_watchlist(user_id) or []
        watchlist_symbols = {w["symbol"] for w in watchlist if "symbol" in w}
        recommendations = score_transactions_k(
            all_transactions,
            target_user=user_id,
            top_k=4,
            watchlist_symbols=watchlist_symbols,
            watchlist_boost=1.75,
            similarity_boost=1.0,
        )
        if recommendations:
            api.post_recommendations(recommendations)
