import dislikeButton from '../assets/dislikeButton.svg'

const dislikeBtn = () => {
    return(
        <>
            <img src = {dislikeButton} className='h-[10vw] w-[10vw] hover:opacity-70'></img>
        </>
    )
}

export default dislikeBtn