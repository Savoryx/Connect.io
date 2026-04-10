import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import VideoHero from './components/VideoHero';
import About from './Pages/About';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Footer from './Pages/Footer';
import Meetings from './Pages/AllPages';
import Register from './Pages/Register';
import Signup from './Pages/Signup';
import CreateMeeting from './Pages/CreateMeeting';
import MeetingRoom from './Pages/MeetingRoom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        
        <div className="mx-0 sm:mx-[0%]">

          <Navbar/>

          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/all-pages' element={<Meetings/>}/>
          <Route path='/login' element={<Register/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/create-meeting' element={<CreateMeeting/>}/>
          <Route path='/meeting-room/:roomId' element={<MeetingRoom/>}/>

          </Routes>

          <Footer/>
          
        </div>
      </Router>
      
    </>
  )
}

export default App
