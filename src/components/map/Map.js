import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import PropTypes from 'prop-types';
import './Map.css';
import { getListStopPoint, getListStopPointByType, getListStopPointByMode } from '../../common/service';

class YandexMap extends Component {
  constructor() {
    super();

    this.state = {
      mode: this.props.mode,
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
    this.init();
  }

  init = () => {
    getListStopPointByMode(this.state.mode)
      .then(res => {
        this.setState({
          points: res.stopPoints
        });
      })
  };

  render() {
    return (
      <YMaps instanceRef={(el) => {this.yMap = el; console.log(el); }}>
        <Map state={this.state.map} width={'100%'} height={'600px'} instanceRef={el => {this.map = el}}>
          {
            this.state.points.map((point, i) => {
              const geo = {
                coordinates: [point.lat, point.lon]
              };
              const prop = {
                balloonContent: `<div class="custom-baloon">Станция метро: <b>${point.commonName}</b>`
              };
              if (point.lines.length > 0) {
                prop.balloonContent = `${prop.balloonContent}<ul>Ветки:`;
                point.lines.forEach(line => {
                  prop.balloonContent = prop.balloonContent + `<li id="${line.id}">${line.name}</li>`;
                });
                prop.balloonContent = `${prop.balloonContent}</ul>`
              }
              prop.balloonContent = `${prop.balloonContent}</div>`;

              const opt = {
                preset: 'islands#icon',
                iconColor: '#0095b6'
              };

              return (
                <Placemark key={i}
                           geometry={geo}
                           properties={prop}
                           options={opt}
                           onClick={ev => this.selectMarker(ev)}
                />
              )
            })
          }
        </Map>
      </YMaps>
    )
  }

}

YandexMap.propTypes = {
  mode: PropTypes.object
};

export default YandexMap;
