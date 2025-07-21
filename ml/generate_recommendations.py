from routing.supabasewrapper import SupabaseAPIWrapper
from utils.buildvectors import build_vector
from recommend.knn import knn
from utils.cosinesimilarity import cosine_similarity
from utils.scoretransactions import score_transactions_k

def generate_recommendations_for_users(api):
    
    all_users = api.get_all_users()
    
    if not isinstance(all_users, list):
        print("Expected a list of users but got:", all_users)
        return 
    users_vectors_map = {}
    #build user vectors
    for user in all_users:
        uid = user.get("id")
        if not uid:
            continue 
        portfolio = api.get_portfolio_entries(uid)
        if portfolio:
            vector = build_vector(portfolio)
            if vector:
                users_vectors_map[uid] = vector
    #find top 3 for users then recommend
    for user in all_users:
        user_id = user["id"]
        if user_id not in users_vectors_map:
            continue
        
        try:
            top_similar = knn(user_id, users_vectors_map, k=3)
        except ValueError:
            continue
        #merge all the transactions from top 3 and then get the top 4 and post them for a user
        all_transactions = []
        for similar_id, score in top_similar:
            transactions = api.get_latest_transactions(similar_id)
            if transactions:
                #extend turns a list and adds it to end of curr list
                all_transactions.extend(transactions)
        
        recommendations = score_transactions_k(all_transactions,top_k=4)
        if recommendations:
            print(f" generated this many recs: {len(recommendations)}")
            api.post_recommendations(recommendations)
            
    
    

