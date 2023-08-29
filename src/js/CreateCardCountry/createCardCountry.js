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

  const h3 = document.createElement('h3');
  h3.innerText = 'Capital: ' + el.capital;

  const p = document.createElement('p');
  p.innerText = 'Population: ' + el.population + ' people';

  const lang = document.createElement('p');
  lang.innerText = 'Languages: ' + Object.values(el.languages).join(', ');

  card.append(img, h2, h3, p, lang);

  return card;
};