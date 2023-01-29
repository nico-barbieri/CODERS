import React from 'react';
import './App.css'
import { Canva } from './Component/Canva';
import { Header } from './Component/Header';
import { MainHeader } from './Component/MainHeader';


export default class App extends React.Component {
  componentDidMount () {
    const script = document.createElement("script");
    script.src = './js/backgroundStage.js';
    script.async = false;
    document.body.appendChild(script);
};

render() {
  return (
    <div className="App">
      <Canva />
      <Header />
      <MainHeader />
    </div>
  );

}
}
