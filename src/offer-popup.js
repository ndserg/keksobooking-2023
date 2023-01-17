const ROOM_TYPES = {
  palace : 'Дворец',
  flat: 'Квартира',
  bungalow : 'Бунгало',
  hotel: 'Отель',
  house: 'Дом'
};

const declOfNums = (num, item1, items2, items5) => {
  let string = '';
  if (num === 1 || (num > 20 && num % 10 === 1)) {
    string = `${num} ${item1}`;
  } else if (num > 1 && num < 5 || (num > 20 && num % 10 > 1 && num % 10 < 5)) {
    string = `${num} ${items2}`;
  } else if (num > 4 && num < 21 || num % 10 > 4 || num % 10 === 0) {
    string = `${num} ${items5}`;
  }

  return string;
};

const getFeaturesTemplate = (features) =>
  `<ul class="popup__features">
    ${features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join('')}
  </ul>`;

const getPhotosTemplate = (photos) =>
  `<div class="popup__photos">
    ${photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`).join('')}
  </div>`;

const createOfferPopup = (data) =>
  `<article class="popup">
    ${data.author.avatar ? `<img src="${data.author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">` : ''}
    ${data.offer.title ? `<h3 class="popup__title">${data.offer.title}</h3>` : ''}
    ${data.offer.addresss ? `<p class="popup__text popup__text--address">${data.offer.address}</p>` : ''}
    ${data.offer.price ? `<p class="popup__text popup__text--price">${data.offer.price} <span>₽/ночь</span></p>` : ''}
    ${data.offer.type ? `<h4 class="popup__type">${ROOM_TYPES[data.offer.type]}</h4>` : ''}
    ${data.offer.rooms && data.offer.guests ? `<p class="popup__text popup__text--capacity">${declOfNums(data.offer.rooms, 'комната', 'комнаты', 'комнат')} для ${declOfNums(data.offer.guests, 'гостя', 'гостей', 'гостей')}</p>` : ''}
    ${data.offer.checkin && data.offer.checkout ? `<p class="popup__text popup__text--time">Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}</p>` : ''}
    ${data.offer.features && data.offer.features.length > 0 ? getFeaturesTemplate(data.offer.features) : ''}
    ${data.offer.description ? `<p class="popup__description">${data.offer.description}</p>` : ''}
    ${data.offer.photos && data.offer.photos.length > 0 ? getPhotosTemplate(data.offer.photos) : ''}
  </article>`;

export {createOfferPopup};
