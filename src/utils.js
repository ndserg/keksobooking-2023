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

const shuffleArray = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

export {declOfNums, shuffleArray};
