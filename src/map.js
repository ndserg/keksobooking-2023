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

const map = L.map('map-canvas');
const markersGroup = L.layerGroup().addTo(map);

const mapInit = () => {
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

const addMarkers = (data, qty) => {
  markersGroup.clearLayers();
  const offersQty = data.length < qty ? data.length : qty;

  for (let i = 0; i < offersQty; i++) {
    const marker = L.marker(data[i].location, {icon: customPin});
    marker.bindPopup(createOfferPopup(data[i])).openPopup();
    marker.addTo(markersGroup);
  }
};

export {mapInit, addMarkers};
