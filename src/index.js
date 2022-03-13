import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const ref = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

const render = array => {
  if (array.length === 1) {
    const arrayLanguages = Object.values(array.languages);

    ref.div.innerHTML = array
      .map(({ flags, name, capital, population }) => {
        return `<h1><img src="${flags.svg}" width = "30px" >${name.official}</h1>
        <p>Capital: ${capital}
        Population: ${population}
        Languages: </p>`;
      })
      .join('');
    console.log(...arrayLanguages);
  }
  if (array.length >= 2 && array.length <= 10) {
    ref.ul.innerHTML = array
      .map(({ flags, name }) => {
        return `<li class = "country-item"><img src="${flags.svg}" width = "30px" >${name.common}</li>`;
      })
      .join('');
    console.log(array);
  }
  if (array.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
};

const infoRendering = e => {
  const value = e.target.value.trim();
  ref.ul.innerHTML = '';
  ref.div.innerHTML = '';

  fetchCountries(value)
    .then(array => render(array))
    .catch(error => console.log(error));
};

ref.input.addEventListener('input', debounce(infoRendering, DEBOUNCE_DELAY));
