import dislikeButton from '../assets/dislikeButton.svg'



const dislikeBtn = ({api, songName, userPrefVector, updateUserPreferenceVector}) => {
    const handleDislike = async () => {
        try {
            const payLoad = {
                song_name: songName,
                preference_vector: userPrefVector,
                liked_status: false
            }
            console.log("Current payload for dislike: ", payLoad)

            console.log("Requesting song dislike")
            const response = await api.post("faiss/update", payLoad)
            console.log("Song dislike requested")
            updateUserPreferenceVector(response.data.updated_preference_vector)
            console.log("User preference vector updated" + response.data.updated_preference_vector)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <>
            <img src = {dislikeButton} className='h-[10vw] w-[10vw] hover:opacity-70' onClick={handleDislike}></img>
        </>
    )
}

export default dislikeBtn