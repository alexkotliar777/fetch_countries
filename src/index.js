import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries, fetchCountriesAll } from './js/FetchQueries/fetch_countries';
import { createCardCountry } from './js/CreateCardCountry/createCardCountry';
import { createCardListCountries } from './js/CreateCardListCountries/createCardListCountries';

const DEBOUNCE_DELAY = 1300;

export const input = document.querySelector('#search-box');
export const countryInfo = document.querySelector('.country-info');
export const countryList = document.querySelector('.country-list');

const renderCountries = res => {
  const arr = res.map(el => createCardListCountries(el));
  countryList.append(...arr);
};

const renderCountry = res => {
  const array = res.map(el => createCardCountry(el));
  countryInfo.append(...array);
};

fetchCountriesAll().then(response => renderCountries(response));

function searchCountries() {
  const value = input.value;

  countryList.replaceChildren();
  countryInfo.replaceChildren();

  fetchCountries(value.trim())
    .then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (response.length >= 2 && response.length <= 10) {
        renderCountries(response);
      } else {
        renderCountry(response);
        input.value = '';
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log(error);
    });
}

input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));
