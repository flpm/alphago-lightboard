import React, { Component } from 'react';
//import Player from './Player';
import Player2 from './Player2';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
      	<h1 className='title'>Master and AlphaGo (lightboard test)</h1>
        <Player2 />
      </div>
    );
  }
}

export default App;
