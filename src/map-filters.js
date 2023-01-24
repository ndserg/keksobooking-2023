import {defaultFilterSettings, housePrices, filterTypes, filtersSettings} from './const.js';

const mapFilters = document.querySelector('.map__filters');

const getOffersByType = (item) => filtersSettings[filterTypes.type] !== defaultFilterSettings ? item.offer.type === filtersSettings[filterTypes.type] : item;

const getOffersByPrice = (item) => filtersSettings[filterTypes.price] !== defaultFilterSettings ? item.offer.price >= housePrices[filtersSettings[filterTypes.price]].min && item.offer.price <= housePrices[filtersSettings[filterTypes.price]].max : item;

const getOffersByRooms = (item) => filtersSettings[filterTypes.rooms] !== defaultFilterSettings ? item.offer.rooms === Number(filtersSettings[filterTypes.rooms]) : item;

const getOffersByGuests = (item) => filtersSettings[filterTypes.guests] !== defaultFilterSettings ? item.offer.guests === Number(filtersSettings[filterTypes.guests]) : item;

const getOffersByFeatures = (item) => {
  if (filtersSettings[filterTypes.features].size === 0) {
    return item;
  } else if (item.offer.features) {
    return Array.from(filtersSettings[filterTypes.features]).every((feature) => item.offer.features.includes(feature));
  }
};

const getSortedOffers = (offers) => offers.filter(getOffersByType).filter(getOffersByPrice).filter(getOffersByRooms).filter(getOffersByGuests).filter(getOffersByFeatures);

const mapFiltersChangeHandler = (evt, offers, onFilterChange) => {
  if (evt.target.name !== filterTypes.features) {
    filtersSettings[evt.target.name] = evt.target.value;
  } else if (filtersSettings[evt.target.name].has(evt.target.value)) {
    filtersSettings[evt.target.name].delete(evt.target.value);
  } else {
    filtersSettings[evt.target.name].add(evt.target.value);
  }

  onFilterChange(getSortedOffers(offers));
};

const setMapFiltersChangeHandler = (offers, onFilterChange) => {
  mapFilters.addEventListener('change', (evt) => mapFiltersChangeHandler(evt, offers, onFilterChange));
};

const resetMapFilters = () => {
  mapFilters.reset();
};

export {setMapFiltersChangeHandler, getSortedOffers, resetMapFilters};
