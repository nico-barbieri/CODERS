import React from 'react';
import './App.css'
import { FullscreenSection } from './Component/FullscreenSection';
import { Header } from './Component/Header';
import { MainHeader } from './Component/MainHeader';


export default class App extends React.Component {

render() {
  return (
    <div className="App">
      <Header />
      <MainHeader />
      <FullscreenSection />
      <FullscreenSection />
    </div>
  );

}
}
