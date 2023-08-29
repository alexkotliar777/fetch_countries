const SEARCH_URL = 'https://restcountries.com/v3.1/name/';
const SEARCH_URL_ALL = 'https://restcountries.com/v3.1/all';
const searchParaMS = new URLSearchParams({
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
});

export const fetchCountries = name => {
  return fetch(`${SEARCH_URL}${name}?${searchParaMS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

export const fetchCountriesAll = () => {
  return fetch(`${SEARCH_URL_ALL}?${searchParaMS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
