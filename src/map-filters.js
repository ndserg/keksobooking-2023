const mapFilters = document.querySelector('.map__filters');

const handlers = new Set();

const defaultSettings = 'any';

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

const filtersSettings = {
  'housing-type': 'any',
  'housing-price': 'any',
  'housing-rooms': 'any',
  'housing-guests': 'any',
  'features': new Set(),
};

const getOffersByType = (item) => filtersSettings['housing-type'] !== defaultSettings ? item.offer.type === filtersSettings['housing-type'] : item;

const getOffersByPrice = (item) => filtersSettings['housing-price'] !== defaultSettings ? item.offer.price >= housePrices[filtersSettings['housing-price']].min && item.offer.price <= housePrices[filtersSettings['housing-price']].max : item;

const getOffersByRooms = (item) => filtersSettings['housing-rooms'] !== defaultSettings ? item.offer.rooms === Number(filtersSettings['housing-rooms']) : item;

const getOffersByGuests = (item) => filtersSettings['housing-guests'] !== defaultSettings ? item.offer.guests === Number(filtersSettings['housing-guests']) : item;

const getOffersByFeatures = (item) => {
  if (filtersSettings['features'].size === 0) {
    return item;
  } else if (item.offer.features) {
    return Array.from(filtersSettings['features']).every((feature) => item.offer.features.includes(feature));
  }
};

const getSortedOffers = (offers) => offers.filter(getOffersByType).filter(getOffersByPrice).filter(getOffersByRooms).filter(getOffersByGuests).filter(getOffersByFeatures);

const callHandlers = () => {
  handlers.forEach((handler) => handler());
};

const mapFiltersChangeHandler = (evt) => {
  if (evt.target.name !== 'features') {
    filtersSettings[evt.target.name] = evt.target.value;
  } else if (filtersSettings[evt.target.name].has(evt.target.value)) {
    filtersSettings[evt.target.name].delete(evt.target.value);
  } else {
    filtersSettings[evt.target.name].add(evt.target.value);
  }

  callHandlers();
};

const setMapFiltersChangeHandler = (cb) => {
  handlers.add(cb);
  mapFilters.addEventListener('change', mapFiltersChangeHandler);
};

export {setMapFiltersChangeHandler, getSortedOffers};
