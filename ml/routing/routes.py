from supabase import create_client
from supabase.lib.client_options import ClientOptions
import os
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor # return query results as dictioaries w column name as keys
from flask import Flask, request, jsonify

load_dotenv()
app = Flask(__name__)

database_url = os.getenv('DATABASE_URL')
supabase_url = os.getenv("SUPABASE_URL")
service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

conn = psycopg2.connect(database_url)

supabase = create_client(
    supabase_url,
    service_role_key,
    options=ClientOptions(
        auto_refresh_token=False,
        persist_session=False,
    ),
)
admin_auth_client = supabase.auth.admin

# Get all user ids  - GET , what we use SUPABSE admin for
@app.route("/users")
def get_users():
    users = admin_auth_client.list_users()
    user_dicts = [user.__dict__ for user in users]
    return jsonify(user_dicts)


#Fetch portfolio entries for a user, given userid
@app.route("/portfolio/<user_id>")
def get_portfolio(user_id):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("SELECT * FROM \"PortfolioEntry\" WHERE \"userId\" = %s", (user_id,))
        rows = cur.fetchall()
    return jsonify(rows)

#Fetch latest 15 transactions for a user
@app.route("/transactions/<user_id>")
def get_transactions(user_id):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(
            """
            SELECT * FROM "Transaction"
            WHERE "userId" = %s
            ORDER BY "createdAt" DESC
            LIMIT 15
            """,
            (user_id,),
        )
        rows = cur.fetchall()
    return jsonify(rows)

#Pull recommendations by userId
@app.route("/recommendations/<user_id>")
def get_recommendations(user_id):
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute("SELECT * FROM \"Recommendation\" WHERE \"userId\" = %s", (user_id,))
        rows = cur.fetchall()
    return jsonify(rows)

#Post news recommendations for one user
@app.route("/recommendations", methods=["POST"])
def post_recommendations():
    data = request.get_json()
    if not isinstance(data,list):
        return jsonify("no list of recs recieved")

    with conn.cursor() as cur:
        try:
            for rec in data:
                user_id = data.get("userId")
                symbol = data.get("symbol")
                if not user_id or not symbol:
                    return jsonify({"error": "Missing userId or symbol"}), 400
                cur.execute(
                    """
                    INSERT INTO "Recommendation" ("userId", "symbol")
                    VALUES (%s, %s)
                    ON CONFLICT DO NOTHING
                    """,
                    (user_id, symbol),
                )
            conn.commit()
        except Exception as error:
            conn.rollback()
            return jsonify({"error": str(error)}), 400
    return jsonify({"message": f"{len(data)} recommendations added"}), 201
if __name__ == "__main__":
    app.run(debug=True)
