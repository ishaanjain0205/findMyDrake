import { useEffect, useState } from "react";

import DislikeBtn from "./dislikeBtn"
import AlbumCover from "./albumCover"
import LikeBtn from "./likeBtn"
import rewindBtn from "../assets/rewind.svg"
import playBtn from "../assets/play.svg"
import forwardBtn from "../assets/fastforward.svg"
import axios from "axios";

const media_player = () => {


    let progressPercentage = 50
    return (
        <div className="bg-black grid auto-rows-auto gap-3  h-fit pt-10 w-screen">
            {/* 3 COLS: dislike button, album cover, like button */}
            <div className="bg-black h-fit grid grid-cols-3 items-center justify-center ">

                <div className = "flex justify-end items-end mr-[8vw]">
                    <DislikeBtn className="h-[10vw] w-[10vw]"/>
                </div>

                <div className = "flex justify-center items-center " >
                    <AlbumCover/>
                </div>

                <div className = "flex justify-start items-center ml-[8vw]">
                    <LikeBtn/>
                </div>

            </div>

            {/* 2 ROWS: song name, artist */}
            <div className="grid grid-rows-2 gap-0 h-fit">
                <div className="flex items-center justify-center text-3xl font-bold text-white text-[2vw]">
                    <h1 className="m-0">Hold On We're Going Home</h1>
                </div>
                <div className="flex items-center justify-center text-white text-[1.5vw]">
                    <h1 className="m-0">Drake</h1>
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

