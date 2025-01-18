# from flask import Blueprint, current_app
# import faiss
# import numpy as np
# from .helpers import *
# import faiss
# import requests

# faiss_bp = Blueprint('faiss', __name__)

# def initialize_faiss(json_file_path):
#     # numer of recs per request 
#     k = 2

#     # initialize song DB
#     songDB = convertJsonToDBVectors(json_file_path)

#     # build FAISS index
#     d = songDB.shape[1]
#     index = faiss.IndexFlatL2(d)
#     index.add(songDB)  

#     return index
    
# @faiss_bp.route("/recommendation", methods = ["POST"])
# def recomnedation():
#     user_vector = requests.json.get("vector")

    
# # initialize faiss on server start
# @faiss_bp.before_first_request
# def setup_faiss():
#     json_file_path = "full_drake_song_metadata.json"  # JSON file path
#     current_app.config["FAISS_INDEX"] = initialize_faiss(json_file_path)