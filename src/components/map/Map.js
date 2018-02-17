import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import PropTypes from 'prop-types';
import './Map.scss';
import { getListStopPointByMode } from '../../common/service';
import close from './close.png';

class YandexMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: this.props.mode,
      map: {
        center: [51.509687, -0.089277],
        zoom: 10,
        controls: ['zoomControl'],
        margin: [0, 16, 0, 16]
      },
      points: [],
      line: {
        id: null,
        name: null
      }
    }
  }

  componentDidMount() {
    this.changeList(this.state.mode, true);
  }

  componentWillUpdate(nextProps) {
    if (JSON.stringify(this.props.mode) !== JSON.stringify(nextProps.mode)) {
      this.changeList(nextProps.mode);
    }
  }

  changeList = (mode, isInit) => {
    getListStopPointByMode(mode)
      .then(res => {
        if (isInit) {
          this.setState({
            points: res
          });
        } else {
          this.setState({
            mode: mode,
            points: res
          });
        }
      });
  };

  selectMarker = (ev) => {
    // console.log(ev.get('target'));
    setTimeout(() => {
      const b = document.querySelector('.custom-balloon');
      b.addEventListener('click', this.markLine)
    }, 100);
  };

  markLine = (ev) => {
    // console.log(ev.target.innerHTML);
    document.querySelector('.custom-balloon').removeEventListener('click', this.markLine);
    this.map.balloon.close();
    this.setState({
      line: {
        id: ev.target.id,
        name: ev.target.innerHTML
      }
    });

  };

  clearLine = (ev) => {
    this.setState({
      line: {
        id: null,
        name: null
      }
    });
  };

  render() {
    return (
      <div className="map">
        <YMaps>
          <Map state={this.state.map} width={'100%'} height={'100%'} instanceRef={el => this.map = el}>
            {
              this.state.points
                .filter(point => {
                  return this.state.line.id ? point.lines.some(line => line.id === this.state.line.id) : true;
                })
                .map((point, i) => {
                  const geo = { coordinates: [point.lat, point.lon] };
                  const prop = { balloonContent: `<div class="custom-balloon">${this.state.mode.label}: <b>${point.commonName}</b>` };
                  if (point.lines.length > 0) {
                    prop.balloonContent = `${prop.balloonContent}<ul>Ветки:`;
                    point.lines.forEach(line => {
                      prop.balloonContent = prop.balloonContent + `<li id="${line.id}">${line.name}</li>`;
                    });
                    prop.balloonContent = `${prop.balloonContent}</ul>`
                  }
                  prop.balloonContent = `${prop.balloonContent}</div>`;

                  const placemarkColor = point.lines.some(line => line.id === this.state.line.id) ? '#f44336' : '#546e7a';
                  const opt = {
                    preset: 'islands#icon',
                    iconColor: placemarkColor
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
        {
          this.state.line.id &&
          <div className="map__line">
            Выбрана линия: <i>{this.state.line.name}</i>
            <img src={close}
                 className="map__line-icon"
                 onClick={this.clearLine}
                 title="очистить"
                 alt="icon" />
          </div>
        }
      </div>
    )
  }

}

YandexMap.propTypes = {
  mode: PropTypes.object
};

YandexMap.defaultProps = {
  mode: {
    mode: 'tube'
  }
};

export default YandexMap;
