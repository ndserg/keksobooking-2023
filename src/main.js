import {offersQtyToDisplay, mapStartCoords, offersRenderDelay} from './const.js';
import {debounce} from './utils.js';
import {shuffleArray} from './utils.js';
import {mapInit, destroyMap, addMarkers} from './map.js';
import {loadData, sendData} from './api.js';
import {disableForms, enableForms} from './form-control.js';
import {setMapFiltersChangeHandler, getSortedOffers, resetMapFilters} from './map-filters.js';
import {setFormCheck, setAddressInput, adFormOnSubmit, resetForm} from './offer-form';

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const loadErrorTemplate = document.querySelector('#load-error').content;

let offers = [];

disableForms();

const onMapInit = () => {
  addMarkers(offers, offersQtyToDisplay);
};

const initMap = () => {
  mapInit(mapStartCoords, onMapInit, setAddressInput);
};

const onFilterChange = debounce(()=> addMarkers(shuffleArray(getSortedOffers(offers)), offersQtyToDisplay), offersRenderDelay);

const onPostDataSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  document.body.appendChild(successElement);
  destroyMap();
  setTimeout(() => {
    enableForms();
    initMap();
    document.querySelector('.success').remove();
  }, 3000);
  resetForm();
  resetMapFilters();
};

const errorButtonClickHandler = (evt) => {
  evt.preventDefault();

  const errorElement = document.querySelector('.error');
  destroyMap();
  resetForm();
  resetMapFilters();
  initMap();
  enableForms();
  document.querySelector('.error__button').removeEventListener('click', errorButtonClickHandler);
  errorElement.remove();

};

const onError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);
  document.querySelector('.error__button').addEventListener('click', errorButtonClickHandler);
};

const onSubmit = (formData) => {
  disableForms();
  sendData(formData, onPostDataSuccess, onError);
};

const onDataLoaded = (data) => {
  offers = shuffleArray(data.slice());
  initMap();
  enableForms();
  setFormCheck();
  adFormOnSubmit(onSubmit);
  setMapFiltersChangeHandler(onFilterChange);
};

const loadErrorButtonClickHandler = (evt) => {
  evt.preventDefault();
  const errorElement = document.querySelector('.error');
  document.querySelector('.error__button').removeEventListener('click', errorButtonClickHandler);
  errorElement.remove();
  window.location.reload();
};

const onLoadError = () => {
  const errorElement = loadErrorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);
  document.querySelector('.error__button').addEventListener('click', loadErrorButtonClickHandler);
};

loadData(onDataLoaded, onLoadError);
