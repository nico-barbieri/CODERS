import React from 'react';
import './App.css'
import { Canva } from './Component/Canva';
import { Header } from './Component/Header';
import { MainHeader } from './Component/MainHeader';


export default class App extends React.Component {

render() {
  return (
    <div className="App">
      <Header />
      <MainHeader />
    </div>
  );

}
}
