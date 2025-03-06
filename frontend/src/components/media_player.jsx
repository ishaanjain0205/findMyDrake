import { useEffect, useState } from "react";

import DislikeBtn from "./dislikeBtn"
import AlbumCover from "./albumCover"
import LikeBtn from "./likeBtn"
import rewindBtn from "../assets/rewind.svg"
import playBtn from "../assets/play.svg"
import forwardBtn from "../assets/fastforward.svg"
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/",
  });

  
const media_player = () => {

    const [songTitle, setSongTitle] = useState("Loading...");
    const [artist, setArtist] = useState("Loading...");
    const [userPreferenceVector, setUserPreferenceVector] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [numSongsPlayed, setNumSongsPlayed] = useState(0);
    const [songsPlayed, setSongsPlayed] = useState(new Set());

    useEffect (() => {
        const coldStart = async () => {
            try {
                const response = await api.get("faiss/coldStart");
                console.log("cold start succesful")
                setSongTitle(response.data.title)
                setArtist(response.data.artist)
                setNumSongsPlayed(1)
                setSongsPlayed(new Set([response.data.title]))
            } catch(error){
                console.error("Error cold starting");
            }
        }

        coldStart();
    }, [])

    const updatePreferenceVector = (newVector) => {
        setUserPreferenceVector(newVector)

        fetchRecommendation(newVector)
    }

    const updateNumSongsPlayed = () => {
        setNumSongsPlayed(numSongsPlayed + 1)
    }

    const updateSongsPlayed = (song) => {
        setSongsPlayed((prev) => new Set([...prev, song]));
    }

    const fetchRecommendation = async (newVector) => {
        try {
            const payLoad = {
                preference_vector: newVector,
                num_played_songs: numSongsPlayed
            }
            console.log("Requesting recommendations with payload" + payLoad)
            const response = await api.post("faiss/recomendation", payLoad)
            console.log("Recommendation fetched")

            const newRecs = response.data.recommendations
            let nextSong = newRecs[0]
            
            for(const rec of newRecs){
                if(!songsPlayed.has(rec.title)){
                    nextSong = rec
                    break
                }
            }

            if(nextSong){
                setSongTitle(nextSong.title)
                setArtist(nextSong.artist)
                updateSongsPlayed(nextSong.title)
                updateNumSongsPlayed()

                console.log("New song recommended: " + nextSong.title)
                console.log("Played songs: ", songsPlayed)
                console.log("Number of songs played: ", numSongsPlayed)
            } else {
                console.log("No new songs to recommend.")
            }
        } catch (error) {
            console.error("Error fetching recommendations", error)
        }
    }

    let progressPercentage = 50
    return (
        <div className="bg-black grid auto-rows-auto gap-3  h-fit pt-10 w-screen">
            {/* 3 COLS: dislike button, album cover, like button */}
            <div className="bg-black h-fit grid grid-cols-3 items-center justify-center ">

                <div className = "flex justify-end items-end mr-[8vw]">
                    <DislikeBtn  
                    api = {api}
                    songName = {songTitle}
                    artist = {artist}
                    userPrefVector = {userPreferenceVector}
                    updateUserPreferenceVector = {updatePreferenceVector}/>
                </div>

                <div className = "flex justify-center items-center " >
                    <AlbumCover/>
                </div>

                <div className = "flex justify-start items-center ml-[8vw]">
                    <LikeBtn 
                    api = {api}
                    songName = {songTitle}
                    artist = {artist}
                    userPrefVector = {userPreferenceVector}
                    updateUserPreferenceVector = {updatePreferenceVector}
                    />
                </div>

            </div>

            {/* 2 ROWS: song name, artist */}
            <div className="grid grid-rows-2 gap-0 h-fit">
                <div className="flex items-center justify-center text-3xl font-bold text-white text-[2vw]">
                    <h1 className="m-0">{songTitle}</h1>
                </div>
                <div className="flex items-center justify-center text-white text-[1.5vw]">
                    <h1 className="m-0">{artist}</h1>
                </div>
            </div>

            
            {/* 2 ROW: playback bar, timestamps*/}
            <div className=" w-full h-fit flex items-center justify-center mt-[2vw]">
                <div className="grid grid-rows-2 w-[70vw] h-[2vw]">
                    <div className="relative w-full h-fill bg-playBarGray rounded-3xl flex items-center justify-start">
                        {/* Total bar */}
                        <div className="absolute w-full h-full rounded-3xl"></div>

                        {/* Played bar */}
                        <div
                            className="absolute h-[60%] mx-1  bg-white rounded-3xl"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* 3 COLS: back, play, forward*/}
            <div className="grid grid-cols-3 h-fit items-center justify-center ">
                <div className = " flex justify-end items-end -mr-[12vw] hover:opacity-70">
                    <img src = {rewindBtn} className = "h-[5vw] w-[5vw]  hover:opacity-70 "></img>
                </div>

                <div className = " flex justify-center items-center ">
                    <img src = {playBtn} className = "h-[5vw] w-[5vw] hover:opacity-70"></img>
                </div>

                <div className = "flex justify-start items-center -ml-[12vw]">
                    <img src = {forwardBtn } className = "h-[5vw] w-[5vw] hover:opacity-70"></img>
                </div>
            </div>


        </div>
    )
}

export default media_player

