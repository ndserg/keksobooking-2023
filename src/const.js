const URL = 'https://27.javascript.pages.academy/keksobooking';

const offersQtyToDisplay = 10;

const offersRenderDelay = 1000;

const mapStartCoords = {
  lat: 35.66023,
  lng: 139.73007,
  zoom: 12
};

const defaultFilterSettings = 'any';

const housePrices = {
  any: {
    min: 0,
    max: 1000000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  low: {
    min: 0,
    max: 10000
  },
  high: {
    min: 50000,
    max: 1000000
  }
};

const filterTypes = {
  type: 'housing-type',
  price: 'housing-price',
  rooms: 'housing-rooms',
  guests: 'housing-guests',
  features: 'features'
};

const filtersSettings = {
  'housing-type': 'any',
  'housing-price': 'any',
  'housing-rooms': 'any',
  'housing-guests': 'any',
  'features': new Set(),
};

const mainPinSettings = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [40, 40]
};

const customPinSettings = {
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30]
};

const invalidClass = 'ad-form__element--invalid';

const titleLength = {
  min: 30,
  max: 100
};

const houseTypePrices = {
  bungalow: 0,
  flat : 1000,
  hotel : 3000,
  house : 5000,
  palace : 10000,
};

const roomsException = {
  '0': '100',
  '100': '0',
};

const roomTypes = {
  palace : 'Дворец',
  flat: 'Квартира',
  bungalow : 'Бунгало',
  hotel: 'Отель',
  house: 'Дом'
};

const avatarDefaultImg = 'img/muffin-grey.svg';

const adFormErrorClass = 'ad-form__error';

export {URL, offersQtyToDisplay, mapStartCoords, defaultFilterSettings, housePrices, filterTypes, filtersSettings, mainPinSettings, customPinSettings, invalidClass, titleLength, houseTypePrices, roomsException, avatarDefaultImg, adFormErrorClass, roomTypes, offersRenderDelay};
