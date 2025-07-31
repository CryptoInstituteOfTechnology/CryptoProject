from routing.supabasewrapper import SupabaseAPIWrapper
from generate_recommendations import generate_recommendations_for_users
import os
from dotenv import load_dotenv
import logging

load_dotenv()

base_url = os.getenv('BASE_URL')

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    logger.info("Starting recommendation generation script...")
    api = SupabaseAPIWrapper(base_url)
    logger.info(f"Using BASE_URL: {base_url}")
    generate_recommendations_for_users(api)
    logger.info("Finished generating recommendations.")