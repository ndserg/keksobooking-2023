const mapFilters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const mapFiltersElements = mapFilters.querySelectorAll(':scope > *');
const adFormElements = adForm.querySelectorAll(':scope > *');

const allFormElements = Array.from(mapFiltersElements).concat(Array.from(adFormElements));

const disableForms = () => {
  allFormElements.forEach((element) => {
    element.disabled = true;
  });
};

const enableForms = () => {
  allFormElements.forEach((element) => {
    element.disabled = false;
  });
};

export {disableForms, enableForms};
