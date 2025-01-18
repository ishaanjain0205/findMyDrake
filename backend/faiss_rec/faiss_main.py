from flask import Flask, Blueprint, request, current_app
import json
import jsonify
import faiss
from .helpers_main import *

faiss_bp = Blueprint('faiss_main', __name__)

# builds faiss index
def init_faiss(json_file_path, songVecDB):
    # recs per requests
    k = 2

    # build FAISS index
    d = songVecDB.shape[1]
    index = faiss.IndexFlatL2(d)
    index.add(songVecDB)  

    return index

# init song vector DB as npArray
def init_song_vec_DB(json_file_path):
    return convertJsonToDBVectors(json_file_path)

def init_songDB(json_file_path):
    with open(json_file_path, 'r') as f:
        songs = json.load(f)

    songDB = []
    for song in songs:
        songDB.append({
            "title" : song["title"],
            "artist" : song["artist"]
        })

    return songDB

# init songDB
@faiss_bp.route("/")
def home():
    return "home"

# returns an updated user preference vector based on like/dislike input
# requires as json:
# song_name of song that was liked/disliked
# preference_vector: user's preference vector
# liked_status: true if user liked song, false if disliked
@faiss_bp.route("/update", methods = ["POST"])
def update():
    # get data from json request
    data = request.json
    songName = data.get("song_name")
    userPrefVector = data.get("preference_vector")
    liked = data.get("liked_status")
    
    # ensure prefVector is sent over
    if not userPrefVector or not isinstance(userPrefVector, list):
        return jsonify({"error": "Invalid or missing user preference vector"}), 400
    if liked not in [True, False]:
        return jsonify({"error": "Invalid or missing liked status"}), 400
    
    # get liked/disliked song as feature vector 
    songFeatureVec = songNameToVector(songName, current_app.config["JSON_FILE_PATH"])
    userPrefVector = np.array(userPrefVector)

    # update and normalize user preference vector
    if liked == True:
        userPrefVector += songFeatureVec
    else:
        userPrefVector -= songFeatureVec

    userPrefVector = Normalizer().fit_transform([userPrefVector])[0]

    # return updated preference vector
    return jsonify({"updated_preference_vector": userPrefVector.tolist() })

# returns recommendations 
# searches index for next recomendations
# requires as json:
# preference_vector: user's preference vector
# num_played_songs: number of songs already played
@faiss_bp.route("/recomendation", methods = ["POST"])
def recomendation():

    # get data from json request
    data = request.json
    userPrefVector = data.get("preference_vector")
    numPlayedSongs = data.get("num_played_songs", 0)
    
    # ensure pref vector exists
    if not userPrefVector or not isinstance(userPrefVector, list):
        return jsonify({"error": "Invalid or missing user preference vector"}), 400
    
    
    # initiaze k val : k = num recs to find in index
    k = 2
    if numPlayedSongs > 2:
        k = numPlayedSongs
    
    if k > len(current_app.config["SONG_DB"]):
        k = len(current_app.config["SONG_DB"])

    # load index and songDB from app config
    index = current_app.config["FAISS_INDEX"]
    songDB = current_app.config["SONG_DB"]

    # resize user pref vec for search
    userPrefVector = np.array(userPrefVector)
    if userPrefVector.ndim == 1:  # If it's a 1D array, reshape it
        userPrefVector = userPrefVector.reshape(1, -1)

    # perform search
    try:
        D, I = index.search(userPrefVector, k)
    except Exception as e:
        return jsonify({"error": f"FAISS search failed: {str(e)}"}), 500

    # retreive recomendation song title and artist
    recommendations = []
    for idx in I[0]:
        recommended_song = songDB[idx]
        recommendations.append({
            "title": recommended_song["title"],
            "artist": recommended_song.get("artist"),
        })

    return jsonify({"recommendations": recommendations})

# get cold start recomendaiton
@faiss_bp.route("/coldStart", methods = ["GET"])
def coldStart():

    songDB = current_app.config["SONG_DB"]
    songDBsize = len(songDB)

    if songDBsize == 0:
        return jsonify({"error": "No songs available for recommendation"}), 404

    randomSongIDX = np.random.randint(0, songDBsize)
    
    randomSong = songDB[randomSongIDX]
    return jsonify({
        "title": randomSong["title"],
        "artist": randomSong["artist"]
    })


