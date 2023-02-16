import React from 'react';
import './App.css'
import { Champions } from './Component/champions';
import { Header } from './Component/Header';
import { MainHeader } from './Component/MainHeader';
import { Rule } from './Component/rule';
import Canvas from './Component/Canvas';
import { FullscreenSection } from './Component/FullscreenSection';
import Footer from './Component/Footer';
import { Presentation } from './Component/Presentation';



export default class App extends React.Component {

render() {
  return (
    <div className="App">
      <Header />
      <MainHeader  />
      <Presentation />
      <Rule />
      <Champions />
      {/* <Canvas /> */}
      <Footer/>
    </div>
  );

}
}
