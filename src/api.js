import {URL} from './const.js';

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Произошла ошибка при получении данных');
  }
};

const loadData = (onDataLoaded, onLoadError) => {
  fetch(`${URL}/data`)
    .then((response) => checkResponse(response))
    .then((data) => onDataLoaded(data))
    .catch(() => onLoadError());
};

const sendData = (formData, onPostDataSuccess, onError) => {
  fetch(URL, {
    method: 'POST',
    body: formData
  })
    .then((response) => checkResponse(response))
    .then(() => onPostDataSuccess())
    .catch(() => onError());
};

export {loadData, sendData};
