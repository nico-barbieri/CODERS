import React, { useState, Suspense, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import './App.css'
import { Header } from './components/Header';

//PAGES
import Home from './pages/Home';

import Footer from './components/Footer';
import { Presentation } from './components/Presentation';
import ToTop from './components/ToTop';
import Login from './pages/Login';
import {FullscreenSection} from './components/FullscreenSection'
import Loading from './components/Loading';




const App = () => {
  const [visible, setVisible] = useState(true)
  const [loading, setLoading] = useState(true)

  let location = useLocation();

useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 1200);

  return window.scrollTo(0, 0)
  
},[location])



let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos >= 150) {

        if (prevScrollpos >= currentScrollPos) {
            setVisible(true)
        }
        else {
            setVisible(false)
        } 
    }
    prevScrollpos = currentScrollPos;
}
  return (
    
    <div className="App">
        <Header top={visible}/>
        <ToTop top={visible}/>
        <Routes>
          <Route path="/" element={loading ? <Loading /> :<Home />}/>
          <Route path='login' element={loading ? <Loading /> :<FullscreenSection><Login /></FullscreenSection>}/>
        </Routes>
        <Footer />
    </div>
  );

}

export default App