import React from 'react';
import './App.css'
import { Header } from './Component/Header';
import { MainHeader } from './Component/MainHeader';
import { Rule } from './Component/rule';


export default class App extends React.Component {

render() {
  return (
    <div className="App">
      <Header />
      <MainHeader  />
      <Rule />
    </div>
  );

}
}
