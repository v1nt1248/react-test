import React, { Component } from 'react';
import './App.scss';
import TSelect from './components/select/Select';
import YandexMap from './components/map/Map';

const ModeList = [
  { name: 'Станции метро', label: 'Станция метро', mode: 'tube', stopTypes: ['NaptanMetroStation'] },
  { name: 'Остановки трамвая', label: 'Остановка трамвая', mode: 'tram', stopTypes: [] },
  { name: 'Станции ж/д', label: 'Станция ж/д', mode: 'overground', stopTypes: [] }
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedMode: ModeList[0]
    }
  }

  onSelectMode = (ev) => {
    this.setState({selectedMode: ev});
  };

  render() {
    return (
      <div className="app">
        <div className="app__select">
          <TSelect options={ModeList} label={'Выберите тип остановки:'} onSelect={this.onSelectMode}/>
        </div>

        <div className="app__map">
          <YandexMap mode={this.state.selectedMode} />
        </div>
      </div>
    );
  }
}

export default App;
