import {mapInit, addMarkers} from './map.js';
import {loadData} from './api.js';
import {disableForms, enableForms} from './form-control';

disableForms();

const onSuccess = (data) => {
  mapInit();
  addMarkers(data);
  enableForms();
};

loadData(onSuccess);
