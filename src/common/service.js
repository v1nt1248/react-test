import axios from 'axios';

const TFL = {
  app_id: 'e8748aca',
  app_key: 'fd8f1b0008706449983b0c3ea3939940'
};

const BASE_URL = 'https://api.tfl.gov.uk';

// https://push-api-radon.tfl.gov.uk:8001/StopPoint/Meta/StopTypes?app_id=e8748aca&app_key=fd8f1b0008706449983b0c3ea3939940

export function getListStopPoint() {
  return axios({
    method: 'get',
    url: `${BASE_URL}/StopPoint/Meta/Modes?app_id=${TFL.app_id}&app_key=${TFL.app_key}`
  }).then(res => {
    return res.data;
  }, err => {
    console.error(err)
    return [];
  });
}

export function getListStopPointByType(type) {
  return axios({
    method: 'get',
    url: `${BASE_URL}/StopPoint/Type/${type}?app_id=${TFL.app_id}&app_key=${TFL.app_key}`
  }).then(res => {
    let modes = {
      names: [],
      qt: {}
    };
    res.data.forEach((point, index) => {
      const pointModes = point.modes;
      pointModes.forEach(mode => {
        if (modes.names.indexOf(mode) === -1) {
          modes.names.push(mode);
          modes.qt[mode] = []
        }
        modes.qt[mode].push(index);
      })
    });
    console.log(res.data);
    console.log(modes);

    return res.data;
  }, err => {
    console.error(err)
    return [];
  });
}

export function getListStopPointByMode(modeObj) {
  return axios({
    method: 'get',
    url: `${BASE_URL}/StopPoint/Mode/${modeObj.mode}?app_id=${TFL.app_id}&app_key=${TFL.app_key}&includeRouteBlockedStops=true`
  }).then(res => {
    let types = {
      names: [],
      qt: {}
    };
    res.data.stopPoints.forEach((point, index) => {
      if (types.names.indexOf(point.stopType) === -1) {
        types.names.push(point.stopType);
        types.qt[point.stopType] = []
      }
      types.qt[point.stopType].push(index);
    });
    console.log(res.data.stopPoints);
    console.log(types);

    if (modeObj.stopTypes.length !== 0) {
      return res.data.stopPoints.filter(point => modeObj.stopTypes.indexOf(point.stopType) !== -1);
    }
    return res.data.stopPoints;
  }, err => {
    console.error(err)
    return [];
  });
}


// https://api.tfl.gov.uk/StopPoint/Mode/tram/Disruption?includeRouteBlockedStops=true