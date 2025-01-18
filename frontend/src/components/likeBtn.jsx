import likeButton from '../assets/likeButton.svg'
const likeBtn = () => {
    return (
        <div>
            <img src={likeButton} className='h-[10vw] w-[10vw] hover:opacity-70'></img>
        </div>
    )
}

export default likeBtn