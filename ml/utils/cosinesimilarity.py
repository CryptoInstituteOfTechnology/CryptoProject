import numpy as np
#this function builds a relation of similarity - for the portfolios, for each user build relation using this and append to dict
#normalizes vectors
def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    if norm1 == 0 or norm2 == 0:
        return 0.0 
    return dot_product / (norm1 * norm2)