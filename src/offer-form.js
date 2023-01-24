import {invalidClass, titleLength, houseTypePrices, roomsException, avatarDefaultImg, adFormErrorClass} from './const.js';
const adForm = document.querySelector('.ad-form');
const avatarInput = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview > img');
const adFormPhotoInput = adForm.querySelector('#images');
const adFormPhoto = adForm.querySelector('.ad-form__photo');
const address = adForm.querySelector('#address');
const title = adForm.querySelector('#title');
const houseType = adForm.querySelector('#type');
const housePrice = adForm.querySelector('#price');
const roomsNumber = adForm.querySelector('#room_number');
const roomsCpacity = adForm.querySelector('#capacity');
const adFormReset = document.querySelector('.ad-form__reset');

adFormPhoto.style.lineHeight = `${adFormPhoto.getBoundingClientRect().height}px`;

housePrice.placeholder = houseTypePrices[houseType.value];

const createErrorMessage = (element, errorMessage) => {
  let errorMessageBox = element.parentElement.querySelector(`.${invalidClass}`);

  if (errorMessageBox && !errorMessage) {
    errorMessageBox.remove();
  } else if (errorMessageBox) {
    errorMessageBox.remove();
  }

  errorMessageBox = document.createElement('div');
  errorMessageBox.className = invalidClass;
  element.parentElement.appendChild(errorMessageBox);
  errorMessageBox.textContent = errorMessage;
};

const checkTitle = (value) => {
  if (!value) {
    return;
  }

  const isError = value.length >= titleLength.min && value.length <= titleLength.max;

  const errorMessage = `Необходимо ввести минимум ${titleLength.min} и максимум ${titleLength.max} символов. ${value.length < titleLength.min ? `Вам нужно ввести еще ${titleLength.min - value.length} символов` : `Вам нужно удалить лишние ${value.length - titleLength.max} символов`}`;

  if (!isError) {
    title.setCustomValidity(errorMessage);
    createErrorMessage(title, errorMessage);
  } else {
    title.setCustomValidity('');
    createErrorMessage(title, '');
  }
};

const checkHousePrice = (value) => {
  if (!value) {
    return;
  }

  const isError = Number(value) >= houseTypePrices[houseType.value];

  const errorMessage = `Минимальная цена для данного типа размещения ${houseTypePrices[houseType.value]}`;

  if (!isError) {
    housePrice.setCustomValidity(errorMessage);
    createErrorMessage(housePrice, errorMessage);
  } else {
    housePrice.setCustomValidity('');
    createErrorMessage(housePrice, '');
  }
};

const checkRoomsErrorMessage = (selectedField, checkingField) => {
  if (roomsException[selectedField.value]) {
    return (`${selectedField.options[selectedField.selectedIndex].text} ${[...checkingField.options].find((option) => option.value === roomsException[selectedField.value]).text}`);
  } else {
    return (`${selectedField.options[selectedField.selectedIndex].text} максимум ${[...checkingField.options].find((option) => option.value === selectedField.value).text}`);
  }
};

const checkRooms = (evt) => {
  const selectedField = evt.target || evt;
  let checkingField = null;

  const roomsAndGuests = {};

  roomsAndGuests[roomsNumber.id] = null;
  roomsAndGuests[roomsCpacity] = null;

  if (selectedField.id === roomsNumber.id) {
    checkingField = roomsCpacity;
    roomsAndGuests[roomsNumber.id] = selectedField.value;
    roomsAndGuests[roomsCpacity.id] = checkingField.value;
  } else {
    checkingField = roomsNumber;
    roomsAndGuests[roomsNumber.id] = checkingField.value;
    roomsAndGuests[roomsCpacity.id] = selectedField.value;
  }

  const resetValidity = () => {
    selectedField.setCustomValidity('');
    createErrorMessage(selectedField, '');
    checkingField.setCustomValidity('');
    createErrorMessage(checkingField, '');
  };

  let errorMessage = null;

  if (roomsException[roomsAndGuests[roomsNumber.id]] && roomsException[roomsAndGuests[roomsCpacity.id]]) {
    resetValidity();
  } else if (roomsException[roomsAndGuests[roomsNumber.id]] || roomsException[roomsAndGuests[roomsCpacity.id]]) {
    resetValidity();
    errorMessage = checkRoomsErrorMessage(selectedField, checkingField);
    selectedField.setCustomValidity(errorMessage);
    createErrorMessage(selectedField, errorMessage);
  } else if (roomsAndGuests[roomsCpacity.id] > roomsAndGuests[roomsNumber.id]) {
    resetValidity();
    errorMessage = checkRoomsErrorMessage(selectedField, checkingField);
    selectedField.setCustomValidity(errorMessage);
    createErrorMessage(selectedField, errorMessage);
  } else {
    resetValidity();
  }
};

const titleInputHandler = (evt) => {
  if (evt.target.id === title.id) {
    checkTitle(evt.target.value);
  }
};

const housePriceInputHandler = (evt) => {
  if (evt.target.id === housePrice.id) {
    checkHousePrice(evt.target.value);
  }
};

const houseTypeChangeHandler = (evt) => {
  housePrice.placeholder = houseTypePrices[evt.target.value];
  checkHousePrice(housePrice.value);
};

const roomsNumberChangeHandler = (evt) => {
  if (evt.target.id === roomsNumber.id) {
    checkRooms(evt);
  }
};

const roomsCapacityChangeHandler = (evt) => {
  if (evt.target.id === roomsCpacity.id) {
    checkRooms(evt);
  }
};

const setAddressInput = (markerCoords) => {
  address.value = markerCoords;
};

const avatarLoadHandler = (evt) => {
  const files = evt.target.files;

  const reader = new FileReader();

  if (files && files.length > 0) {
    reader.readAsDataURL(files[0]);
  }

  reader.onload = () => {
    avatarPreview.src = reader.result;
  };
};

const adImagesLoadHandler = (evt) => {
  const files = evt.target.files;

  const renderImg = (image) => {
    const img = document.createElement('img');

    img.src = image;
    img.style.verticalAlign = 'middle';
    img.style.maxWidth = '100%';
    adFormPhoto.appendChild(img);
  };

  if (files && files.length > 0) {
    const reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      renderImg(reader.result);
    };
  }
};

const resetForm = () => {
  avatarPreview.src = avatarDefaultImg;
  adFormPhoto.textContent = '';
  adForm.reset();
};

const adFormResetHandler = (evt) => {
  evt.preventDefault();
  resetForm();
};

const validateForm = () => {
  checkTitle(title.value);
  checkHousePrice(housePrice.value);
  checkRooms(roomsCpacity);
};

const adFormOnSubmit = (onSubmit) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    adForm.classList.remove(adFormErrorClass);
    validateForm();
    if (adForm.checkValidity()) {
      const formData = new FormData(evt.target);
      onSubmit(formData);
    } else {
      adForm.classList.add(adFormErrorClass);
    }
  });
};

const setFormCheck = () => {
  title.addEventListener('input', titleInputHandler);
  housePrice.addEventListener('input', housePriceInputHandler);
  houseType.addEventListener('change', houseTypeChangeHandler);
  roomsNumber.addEventListener('change', roomsNumberChangeHandler);
  roomsCpacity.addEventListener('change', roomsCapacityChangeHandler);
  avatarInput.addEventListener('change', avatarLoadHandler);
  adFormPhotoInput.addEventListener('change', adImagesLoadHandler);
  adFormReset.addEventListener('click', adFormResetHandler);
};

export {setFormCheck, setAddressInput, adFormOnSubmit, resetForm};
