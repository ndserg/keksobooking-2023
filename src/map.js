import {createOfferPopup} from './offer-popup.js';
import {mainPinSettings, customPinSettings} from './const.js';

const defaultPin = L.icon(mainPinSettings);
const customPin = L.icon(customPinSettings);

let map = null;
const markersGroup = L.layerGroup();

const getAddress = ({ lat, lng }) => `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

const setMainPin = (startCoords, setAddressInput) => {
  const mainMarker = L.marker(startCoords,
    {
      draggable: true,
      autoPan: true,
      icon: defaultPin,
    },
  );

  mainMarker.addTo(map);

  setAddressInput(getAddress(mainMarker.getLatLng()));

  mainMarker.on('moveend', (evt) => {
    setAddressInput(getAddress(evt.target.getLatLng()));
  });
};

const mapInit = (startCoords, onMapInit, setAddressInput) => {
  const {lat, lng, zoom} = startCoords;

  map = L.map('map-canvas');
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  map.setView([lat, lng], zoom);

  map.whenReady(() => {
    setMainPin([lat, lng], setAddressInput);
    markersGroup.addTo(map);
    onMapInit();
  });
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

const destroyMap = () => {
  map.remove();
};

export {mapInit, destroyMap, addMarkers};
