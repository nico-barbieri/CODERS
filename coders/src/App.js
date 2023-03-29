import React, { useState, useEffect, useRef } from 'react';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import './App.css'

//COMMON COMPONTENTS
import Header from './components/Header';
import Footer from './components/Footer';
import ToTop from './components/ToTop';
import Loading from './components/Loading';
import FullscreenSection from './components/FullscreenSection'

//PAGES
import Home from './pages/Home';
import Login from './pages/Login';
import { QuizGame } from './pages/QuizGame';
import Game from './pages/Game';
import Signup from './pages/Signup';

const App = () => {
  const [visible, setVisible] = useState(true)
  const [loading, setLoading] = useState(true)
  const [stopAnimation, setStopAnimation] = useState(false)
  
  let location = useLocation();
  
  const scrollPos = useRef(window.scrollY)
  const handleScroll = () => {
    if (window.scrollY >= 150) {
      if (scrollPos.current >= window.scrollY) {
        setVisible(true)
        setStopAnimation(true)
      }
      else {
        setVisible(false)
        setStopAnimation(false)
      }
    }
    scrollPos.current = window.scrollY;
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);

    return window.scrollTo(0, 0)

  }, [location])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scrollPos]);

  const handleClick = () => {
    setStopAnimation(true)
    setTimeout(() => {
      setStopAnimation(false)
    }, 1500);
  }

  return (
    <div className="App">
        <Header show={visible} handleClick={handleClick} />
        <ToTop top={visible} />
      <Routes>
        <Route path="/" element={
          loading
            ? <Loading />
            : <>
              <Home stopAnimation={stopAnimation} />
            </>
        } />
        <Route path='/login' element={loading ? <Loading /> : <FullscreenSection><Login /></FullscreenSection>} />
        <Route path='/signup' element={loading ? <Loading /> : <FullscreenSection><Signup /></FullscreenSection>} />
        <Route path='/start' element={loading ? <Loading /> :
          <Game />
        } />
        <Route path='/quiz' element={<QuizGame />} />
      </Routes>
      <Footer />
    </div>
  );

}

export default App
