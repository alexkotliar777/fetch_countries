import { createCardCountry } from "../CreateCardCountry/createCardCountry";
import { countryInfo } from "../..";

export const createCardListCountries = el => {
  const card = document.createElement('li');
  card.setAttribute('class', 'li-card');

  const img = document.createElement('img');
  img.setAttribute('src', el.flags.svg);
  img.setAttribute('class', 'pictureBig');

  const h2 = document.createElement('h2');

  h2.innerText = el.name.common;
  h2.setAttribute('class', 'country-name');

  card.append(img, h2);
  card.addEventListener('click', () => {
    console.log(el);
    // countryList.replaceChildren();
    countryInfo.replaceChildren();
    countryInfo.append(createCardCountry(el));
  });
  return card;
};