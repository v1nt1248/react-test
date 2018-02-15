import React, { Component } from 'react';
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import logo from './logo.svg';
import './App.css';
import { getListStopPoint, getListStopPointByType } from './common/service';

class App extends Component {
  constructor() {
    super()

    this.state = {
      map: {
        controls: ['smallMapDefaultSet'],
        margin: [0, 16, 0, 16]
      }
    }
  }

  getList = () => {
    getListStopPoint()
      .then(res => {
        console.log(res);
      });
  };

  getListByType = () => {
    getListStopPointByType('NaptanBusCoachStation')
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.getList} style={{margin: '8px'}}>
          GET List
        </button>
        <button onClick={this.getListByType} style={{margin: '8px'}}>
          GET List by Type
        </button>

        <div style={{position: 'relative', paddingTop: '50px'}}>
          <Map state={this.state.map}
               center={[51.509687, -0.089277]}
               zoom={10}
               width={'100%'}
               height={'600px'}>
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
