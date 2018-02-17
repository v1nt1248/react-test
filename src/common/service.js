import axios from 'axios';

const TFL = {
  app_id: 'e8748aca',
  app_key: 'fd8f1b0008706449983b0c3ea3939940'
};

const BASE_URL = 'https://api.tfl.gov.uk';

/**
 * (не используется в текущем варианте)
 * получение списка видов остановок
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getListStopPoint() {
  addSpinnerElem();
  return axios({
    method: 'get',
    url: `${BASE_URL}/StopPoint/Meta/Modes?app_id=${TFL.app_id}&app_key=${TFL.app_key}`
  }).then(res => {
    removeSpinnerElem();
    return res.data;
  }, err => {
    console.error(err);
    removeSpinnerElem();
    return [];
  });
}

/**
 * (не используется в текущем варианте)
 * получение списка остановок выбранного типа
 * @param type
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getListStopPointByType(type) {
  addSpinnerElem();
  return axios({
    method: 'get',
    url: `${BASE_URL}/StopPoint/Type/${type}?app_id=${TFL.app_id}&app_key=${TFL.app_key}`
  }).then(res => {
    /*
    служебный код (для проверки принадлежности к определенным видам)
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
    */

    removeSpinnerElem();
    return res.data;
  }, err => {
    console.error(err);
    removeSpinnerElem();
    return [];
  });
}

/**
 * получение списка остановок выбранного вида
 * @param modeObj
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getListStopPointByMode(modeObj) {
  addSpinnerElem();
  return axios({
    method: 'get',
    url: `${BASE_URL}/StopPoint/Mode/${modeObj.mode}?app_id=${TFL.app_id}&app_key=${TFL.app_key}&includeRouteBlockedStops=true`
  }).then(res => {
    /*
    // служебный код (для проверки принадлежности к определенным типам)
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
    */

    removeSpinnerElem();
    if (modeObj.stopTypes.length !== 0) {
      return res.data.stopPoints.filter(point => modeObj.stopTypes.indexOf(point.stopType) !== -1);
    }
    return res.data.stopPoints;
  }, err => {
    console.error(err);
    removeSpinnerElem();
    return [];
  });
}

function addSpinnerElem() {
  if (!document.querySelector('#spinner')) {
    const bodyElem = document.querySelector('body');

    const wrapElem = document.createElement('div');
    wrapElem.id = 'spinnerWrap';
    wrapElem.style.position = 'fixed';
    wrapElem.style.top = '0';
    wrapElem.style.left = '0';
    wrapElem.style.bottom = '0';
    wrapElem.style.right = '0';
    wrapElem.style.zIndex = '9000';
    wrapElem.style.poinerEvents = 'none';
    wrapElem.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';

    const spinnerElem = document.createElement('img');
    spinnerElem.src = './wait.gif';
    // spinnerElem.id = 'spinner';
    spinnerElem.style.width = '150px';
    spinnerElem.style.height = '150px';
    spinnerElem.style.position = 'absolute';
    spinnerElem.style.top = 'calc(50% - 75px)';
    spinnerElem.style.left = 'calc(50% - 75px)';

    wrapElem.appendChild(spinnerElem);
    bodyElem.appendChild(wrapElem);
  }
}

function removeSpinnerElem() {
  if (document.querySelector('#spinnerWrap')) {
    const wrapElem = document.querySelector('#spinnerWrap');
    wrapElem.remove();
  }
}
