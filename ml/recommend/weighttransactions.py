#file for after knn is ran, data goes in ehre for each user, use apiwrapper librayr to make calls
from dotenv import load_dotenv
import os
from ..routing.supabasewrapper import SupabaseAPIWrapper
base_url = os.getenv('base_url')