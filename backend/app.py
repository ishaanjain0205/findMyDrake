from flask import Flask, blueprints
import json
from faiss_rec.faiss_main import init_faiss, init_song_vec_DB, init_songDB, faiss_bp

json_file_path = "full_drake_song_metadata.json"

def create_app(json_file_path):
    app = Flask(__name__)

    # init faiss index on app start
    app.config["SONG_DB"] = init_songDB(json_file_path)
    print("SONG DB INITIALIZED")
    app.config["SONG_VECTORS_DB"] = init_song_vec_DB(json_file_path)
    print("SONG VECTORS DB INITIALIZED")
    app.config["FAISS_INDEX"] = init_faiss(json_file_path, app.config["SONG_VECTORS_DB"])
    print("FAISS INDEX INITIALIZED")
    app.config["JSON_FILE_PATH"] = json_file_path
    # register blueprints
    app.register_blueprint(faiss_bp, url_prefix="/faiss")

    return app

if __name__ == '__main__':
    app = create_app(json_file_path)
    print("APP CREATED")
    app.run(debug = True)