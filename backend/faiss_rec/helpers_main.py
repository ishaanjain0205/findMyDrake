import json
import numpy as np
from sklearn.preprocessing import Normalizer

# converts key to vector
def convertKeyToVector(key):

    key_mapping = {
    "C Major": 0, "C Minor": 1,
    "C# Major": 2, "C# Minor": 3,
    "Db Major": 2, "Db Minor": 3,
    "D Major": 4, "D Minor": 5,
    "D# Major": 6, "D# Minor": 7,
    "Eb Major": 6, "Eb Minor": 7,
    "E Major": 8, "E Minor": 9,
    "F Major": 10, "F Minor": 11,
    "F# Major": 12, "F# Minor": 13,
    "Gb Major": 12, "Gb Minor": 13,
    "G Major": 14, "G Minor": 15,
    "G# Major": 16, "G# Minor": 17,
    "Ab Major": 16, "Ab Minor": 17,
    "A Major": 18, "A Minor": 19,
    "A# Major": 20, "A# Minor": 21,
    "Bb Major": 20, "Bb Minor": 21,
    "B Major": 22, "B Minor": 23,
    "C\u266d Major": 22, "C\u266d Minor": 23,
    "C\u266f Major": 2, "C\u266f Minor": 3,
    "D\u266d Major": 2, "D\u266d Minor": 3,
    "D\u266f Major": 6, "D\u266f Minor": 7,
    "E\u266d Major": 6, "E\u266d Minor": 7,
    "E\u266f Major": 8, "E\u266f Minor": 9,
    "F\u266d Major": 6, "F\u266d Minor": 7,
    "F\u266f Major": 12, "F\u266f Minor": 13,
    "G\u266d Major": 16, "G\u266d Minor": 17,
    "G\u266f Major": 16, "G\u266f Minor": 17,
    "A\u266d Major": 16, "A\u266d Minor": 17,
    "A\u266f Major": 20, "A\u266f Minor": 21,
    "B\u266d Major": 20, "B\u266d Minor": 21,
    "B\u266f Major": 22, "B\u266f Minor": 23
    }

    return key_mapping.get(key, -1)

# converts camelot to vector
def convertCamelotToVector(camelot):
    number = int(camelot[:-1])
    letter = camelot[-1]
    letter_value = -1
    if letter == 'A':
        letter_value = 0
    elif letter == 'B':
        letter_value = 1
    
    return [number, letter_value]

# reads json into numpy array of song vectors
def convertJsonToDBVectors(json_file_path):

    with open(json_file_path, 'r') as f:
        songs = json.load(f)

    songDB_vectors = []
    for song in songs:
        key = convertKeyToVector(song['key'])
        camelot = convertCamelotToVector(song['camelot'])
        camelot_number = camelot[0]
        camelot_letter = camelot[1]
        bpm = int(song['BPM'])
        popularity = int(song['popularity'])
        energy = int(song['energy'])
        danceability = int(song['danceability'])
        happiness = int(song['happiness'])
        acousticness = int(song['acousticness'])
        instrumentalness = int(song['instrumentalness'])
        liveness = int(song['liveness'])
        speechiness = int(song['speechiness'])
        songDB_vectors.append([key, camelot_number, camelot_letter, bpm, popularity, energy, danceability, happiness, acousticness, instrumentalness, liveness, speechiness])

    # convert DB to numpy array
    songDB = np.array(songDB_vectors)

    # normalize array
    songDB = Normalizer().fit_transform(songDB)

    return songDB

# returns vector of a song given a song name
def songNameToVector (songName, json_file):

    with open(json_file, 'r') as f:
        songs = json.load(f)

    for song in songs:
        if song['title'] == songName:
            key = convertKeyToVector(song['key'])
            camelot = convertCamelotToVector(song['camelot'])
            camelot_number = camelot[0]
            camelot_letter = camelot[1]
            bpm = int(song['BPM'])
            popularity = int(song['popularity'])
            energy = int(song['energy'])
            danceability = int(song['danceability'])
            happiness = int(song['happiness'])
            acousticness = int(song['acousticness'])
            instrumentalness = int(song['instrumentalness'])
            liveness = int(song['liveness'])
            speechiness = int(song['speechiness'])
            querry_song = [key, camelot_number, camelot_letter, bpm, popularity, energy, danceability, happiness, acousticness, instrumentalness, liveness, speechiness]
            return np.array([querry_song])
