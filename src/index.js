import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const ref = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
};

const DEBOUNCE_DELAY = 300;

const render = array => {
  const htmlUl = array
    .map(({ flags, name }) => {
      return `<ul><img src="${flags.svg}">${name.official}</ul>`;
    })
    .join('');

  if (array.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (array.length >= 2 && array.length <= 10) {
    ref.ul.insertAdjacentHTML('beforeend', htmlUl);
  }
  console.log(htmlUl);
};

const infoRendering = e => {
  const value = e.target.value.trim();

  if (value === '') {
    return;
  } else {
    fetchCountries(value)
      .then(array => render(array))
      .catch(error => console.log(error));
  }
};

ref.input.addEventListener('input', debounce(infoRendering, DEBOUNCE_DELAY));
