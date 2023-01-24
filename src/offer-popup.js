import {roomTypes} from './const.js';
import {declOfNums} from './utils.js';

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
    ${data.offer.type ? `<h4 class="popup__type">${roomTypes[data.offer.type]}</h4>` : ''}
    ${data.offer.rooms && data.offer.guests ? `<p class="popup__text popup__text--capacity">${declOfNums(data.offer.rooms, 'комната', 'комнаты', 'комнат')} для ${declOfNums(data.offer.guests, 'гостя', 'гостей', 'гостей')}</p>` : ''}
    ${data.offer.checkin && data.offer.checkout ? `<p class="popup__text popup__text--time">Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}</p>` : ''}
    ${data.offer.features && data.offer.features.length > 0 ? getFeaturesTemplate(data.offer.features) : ''}
    ${data.offer.description ? `<p class="popup__description">${data.offer.description}</p>` : ''}
    ${data.offer.photos && data.offer.photos.length > 0 ? getPhotosTemplate(data.offer.photos) : ''}
  </article>`;

export {createOfferPopup};
