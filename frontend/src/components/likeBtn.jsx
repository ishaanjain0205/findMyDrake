import likeButton from '../assets/likeButton.svg'

const likeBtn = ({api, songName, userPrefVector, updateUserPreferenceVector}) => {
    const handleLike = async () => {
        try {
            const payLoad = {
                song_name: songName,
                preference_vector: userPrefVector,
                liked_status: true
            }
            console.log("Current payload for like: ", payLoad)

            console.log("Requesting song like")
            const response = await api.post("faiss/update", payLoad)
            console.log("Song like requested")
            updateUserPreferenceVector(response.data.updated_preference_vector)
            console.log("User preference vector updated" + response.data.updated_preference_vector)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <img src={likeButton} className='h-[10vw] w-[10vw] hover:opacity-70' onClick={handleLike}></img>
        </div>
    )
}

export default likeBtn