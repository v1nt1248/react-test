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
    url: `${BASE_URL}/StopPoint/Meta/StopTypes?app_id=${TFL.app_id}&app_key=${TFL.app_key}`
  }).then(res => {
    return res.data;
  }, err => {
    console.error(err)
  });
}

export function getListStopPointByType(type) {
  return axios({
    method: 'get',
    url: `${BASE_URL}/StopPoint/Type/${type}?app_id=${TFL.app_id}&app_key=${TFL.app_key}`
  }).then(res => {
    return res.data;
  }, err => {
    console.error(err)
  });
}