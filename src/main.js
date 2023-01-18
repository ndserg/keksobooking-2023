import {mapInit, addMarkers} from './map.js';
import {loadData} from './api.js';
import {disableForms, enableForms} from './form-control';
import {setMapFiltersChangeHandler, getSortedOffers} from './map-filters';

disableForms();

const offersQtyToDisplay = 10;

let offers = [];
let sortedOffers = [];

const onFilterChange = () => {
  sortedOffers = getSortedOffers(offers);
  addMarkers(sortedOffers, offersQtyToDisplay);
};

const onSuccess = (data) => {
  offers = data.slice();
  mapInit();
  addMarkers(offers, offersQtyToDisplay);
  enableForms();
  setMapFiltersChangeHandler(onFilterChange);
};

loadData(onSuccess);
