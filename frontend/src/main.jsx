import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/header.jsx'
import MediaPlayer from './components/media_player.jsx'
import AuthBtn from './components/authBtn.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-black h-screen w-screen'>
      <AuthBtn />
      <Header />
      <MediaPlayer />
    </div>
  </StrictMode>,
)
