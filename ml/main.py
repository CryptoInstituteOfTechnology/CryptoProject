from routing.supabasewrapper import SupabaseAPIWrapper
from generate_recommendations import generate_recommendations_for_users
import os
from dotenv import load_dotenv
base_url = os.getenv('base_url')

if __name__ == "__main__":
    api = SupabaseAPIWrapper(base_url)
    print("running rec model")
    generate_recommendations_for_users(api)
    print("done")
    