const URL = 'https://27.javascript.pages.academy/keksobooking/data';

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Произошла ошибка при получении данных');
  }
};

const loadData = (onSuccess) => {
  fetch(URL)
    .then((response) => checkResponse(response))
    .then((data) => onSuccess(data))
    .catch((e) => console.error(e.message));
};

export {loadData};
