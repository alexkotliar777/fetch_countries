export const createCardCountry = el => {
  // флаг, название, столица, население и языки.
  const card = document.createElement('div');

  const img = document.createElement('img');
  img.setAttribute('src', el.flags.svg);
  img.setAttribute('class', 'picture');
  card.setAttribute('class', 'card');

  const h2 = document.createElement('h2');
  h2.innerText = el.name.common;
  h2.setAttribute('class', 'country-name-card');

  const capital = document.createElement('h3');
  capital.innerText = 'Capital: ' + el.capital;

  const currency = document.createElement('h3');
  currency.innerText = 'Currency: ' + Object.keys(el.currencies).join(', ');

  const people = document.createElement('p');
  people.innerText = 'Population: ' + el.population + ' people';

  const lang = document.createElement('p');
  lang.innerText = 'Languages: ' + Object.values(el.languages).join(', ');

  card.append(img, h2, capital, currency, people, lang);

  return card;
};