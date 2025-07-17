from flask import Flask, jsonify
from supabase import create_client
from supabase.lib.client_options import ClientOptions
import os
from dotenv import load_dotenv

load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(
    supabase_url,
    service_role_key,
    options=ClientOptions(
        auto_refresh_token=False,
        persist_session=False,
    ),
)

admin_auth_client = supabase.auth.admin

app = Flask(__name__)

@app.route("/users")
def get_users():
    users = admin_auth_client.list_users()
    # users is a list of User objects; convert to dicts for JSON serialization
    user_dicts = [user.__dict__ for user in users]
    return jsonify(user_dicts)

if __name__ == "__main__":
    app.run(debug=True)
