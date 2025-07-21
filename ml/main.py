from routing.supabasewrapper import SupabaseAPIWrapper
from generate_recommendations import generate_recommendations_for_users


if __name__ == "__main__":
    base_url = "http://localhost:5000"
    api = SupabaseAPIWrapper(base_url)
    print("running rec model")
    generate_recommendations_for_users(api)
    print("done")
    