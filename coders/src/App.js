import React, { useState, Suspense, useEffect } from 'react';
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
  const [scrollPos, setScrollPos] = useState(window.scrollY)
  const [visible, setVisible] = useState(true)
  const [loading, setLoading] = useState(true)
  const [stopAnimation, setStopAnimation] = useState(false)

  let location = useLocation();

  const handleScroll = () => {
    //console.log(window.scrollY);
    if (window.scrollY >= 150) {
      if (scrollPos >= window.scrollY) {
        setVisible(true)
        setStopAnimation(true)
      }
      else {
        setVisible(false)
        setStopAnimation(false)
      }
    }
    setScrollPos(window.scrollY)
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
              {/* <Header show={visible} handleClick={handleClick} />
              <ToTop top={visible} /> */}
              <Home stopAnimation={stopAnimation} />
              {/* <Footer /> */}
            </>
        } />
        <Route path='/login' element={loading ? <Loading /> : <FullscreenSection><Login /></FullscreenSection>} />
        <Route path='/signup' element={loading ? <Loading /> : <FullscreenSection><Signup /></FullscreenSection>} />
        <Route path='start' element={
          <Game />
        } />
        <Route path='quiz' element={<QuizGame />} />
      </Routes>
      <Footer />
    </div>
  );

}

export default App
