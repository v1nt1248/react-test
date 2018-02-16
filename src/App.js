import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './App.css';
import { getListStopPoint, getListStopPointByType, getListStopPointByMode } from './common/service';
import Select from './components/select/Select';

const markerStyles = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  borderColor: 'orange'
};

const ModeList = [
  { name: 'Станции метро', mode: 'tube', stopTypes: ['NaptanMetroStation'] },
  { name: 'Остановки трамвая', mode: 'tram', stopTypes: [] },
  { name: 'Станции ж/д', mode: 'overground', stopTypes: [] }
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      map: {
        center: [51.509687, -0.089277],
        zoom: 10,
        controls: ['smallMapDefaultSet'],
        margin: [0, 16, 0, 16]
      },
      points: [],
      line: null
    }
  }

  componentDidMount() {
    // this.getListByType();
  }

  getList = () => {
    getListStopPointByMode(ModeList[2])
      .then(res => {
        console.log(res);
      });
  };

  getListByType = () => {
    getListStopPointByType('NaptanMetroStation')
      .then(res => {
        this.setState({
          points: res
        });
      });
  };

  selectMarker = (ev) => {
    console.log(ev.get('target'));
    setTimeout(() => {
      const b = document.querySelector('.custom-baloon');
      b.addEventListener('click', this.test)
    }, 100);
  };

  test = (ev) => {
    console.log(ev.target);
    document.querySelector('.custom-baloon').removeEventListener('click', this.test)
    this.map.balloon.close();
  };

  render() {
    return (
      <div className="App">
        <Select options={ModeList}/>

        <button onClick={this.getList} style={{margin: '8px'}}>
          GET StopPoint
        </button>
        <button onClick={this.getListByType} style={{margin: '8px'}}>
          GET List by Type
       </button>

        <div style={{position: 'relative', padding: '0 20px', marginTop: '50px'}}>
          {/*<YMaps instanceRef={(el) => {this.yMap = el; console.log(el); }}>*/}
            {/*<Map state={this.state.map} width={'100%'} height={'600px'} instanceRef={el => {this.map = el}}>*/}
              {/*{*/}
                {/*this.state.points.map((point, i) => {*/}
                  {/*const geo = {*/}
                    {/*coordinates: [point.lat, point.lon]*/}
                  {/*};*/}
                  {/*const prop = {*/}
                    {/*balloonContent: `<div class="custom-baloon">Станция метро: <b>${point.commonName}</b>`*/}
                  {/*};*/}
                  {/*if (point.lines.length > 0) {*/}
                    {/*prop.balloonContent = `${prop.balloonContent}<ul>Ветки:`;*/}
                    {/*point.lines.forEach(line => {*/}
                      {/*prop.balloonContent = prop.balloonContent + `<li id="${line.id}">${line.name}</li>`;*/}
                    {/*});*/}
                    {/*prop.balloonContent = `${prop.balloonContent}</ul>`*/}
                  {/*}*/}
                  {/*prop.balloonContent = `${prop.balloonContent}</div>`;*/}

                  {/*const opt = {*/}
                    {/*preset: 'islands#icon',*/}
                    {/*iconColor: '#0095b6'*/}
                  {/*};*/}

                  {/*return (*/}
                    {/*<Placemark key={i}*/}
                               {/*geometry={geo}*/}
                               {/*properties={prop}*/}
                               {/*options={opt}*/}
                               {/*onClick={ev => this.selectMarker(ev)}*/}
                    {/*/>*/}
                  {/*)*/}
                {/*})*/}
              {/*}*/}
            {/*</Map>*/}
          {/*</YMaps>*/}
        </div>
      </div>
    );
  }
}

export default App;
