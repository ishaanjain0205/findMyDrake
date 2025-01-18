import songCover from '../assets/album_cover.png'

const albumCover = () => {
    return(
        <div>
            <img src = {songCover} className = "h-[28vw] w-[28vw]"></img>
        </div>
    )
}

export default albumCover