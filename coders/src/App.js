import React, { useState } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import './App.css'
import { Header } from './Component/Header';

//PAGES
import Home from './pages/Home';

import Footer from './Component/Footer';
import { Presentation } from './Component/Presentation';
import ToTop from './Component/ToTop';
import Login from './pages/Login';
import {FullscreenSection} from './Component/FullscreenSection'




const App = () => {

  const [state, setState] = useState({
    visible: true,
})

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos >= 150) {

        if (prevScrollpos >= currentScrollPos) {
            setState({
                visible: true,
            })
        }
        else {
            setState({
                visible: false,
            })
        } 
    }
    prevScrollpos = currentScrollPos;
}
  return (
    <div className="App">
      <Header top={state.visible}/>
      <ToTop top={state.visible}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='login' element={<FullscreenSection><Login /></FullscreenSection>}/>
      </Routes>
      
      <Footer />
    </div>
  );

}

export default App