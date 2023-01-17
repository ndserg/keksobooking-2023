import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {createOfferPopup} from './offer-popup.js';


const startCoords = {
  lat: 35.66023,
  lng: 139.73007,
};

const mainPinSettings = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [40, 40]
};

const customPinSettings = {
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30]
};

const defaultPin = L.icon(mainPinSettings);
const customPin = L.icon(customPinSettings);

let map = null;

const mapInit = () => {
  map = L.map('map-canvas');

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  map.setView(startCoords, 12);

  const marker = L.marker(startCoords).setIcon(defaultPin);
  marker.addTo(map);
};

const addMarkers = (data) => {
  const layerGroup = L.layerGroup().addTo(map);

  for (let i = 0; i < 5; i++) {
    const marker = L.marker(data[i].location, {icon: customPin});
    marker.bindPopup(createOfferPopup(data[i])).openPopup();
    layerGroup.addLayer(marker);
  }
};

export {mapInit, addMarkers};
