import headerImage from '../assets/header.svg'
import headerImage2 from '../assets/header2.svg'
function App() {

  return (
    <>
      <header className='bg-black w-full h-[6vw] flex items-center justify-start'>
        <img src={headerImage2} className='h-full max-h-full  px-5 py-2 object-contain' />
      </header>
    </>

  )
}

export default App