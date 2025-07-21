from utils.cosinesimilarity import cosine_similarity

#function runs for one user, have to do for all, get top 3 similary people
def knn(user_id, users_vectors_map, k=3):
    
    if user_id not in users_vectors_map:
        raise ValueError("user not in map")
    
    
    target_vector = users_vectors_map[user_id]
    
    similarities = []
    
    for other_users in users_vectors_map:
        if other_users == user_id:
            continue
        #cosine similarity between both users portfolios
        sim_score = cosine_similarity(target_vector,users_vectors_map[other_users])
        similarities.append((other_users, sim_score))
        
    #sort by sim_score in descending order
    similarities.sort(key = lambda x: x[1], reverse=True)
    
    #return top k elements
    return similarities[:k]
    
    