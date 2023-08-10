import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetch_countries';
import { replace } from 'lodash';

const DEBOUNCE_DELAY = 1300;

const input = document.querySelector('#search-box');
const countries = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const createCard = (el)=> {
  const card = document.createElement('div');

  const img = document.createElement('img');
  img.setAttribute('src',el.flags.svg);
  img.setAttribute('class','pictureBig');

  const h2 = document.createElement('h2');
  h2.innerText = el.name.common ;

  card.append(img,h2);

  return card;
}

const renderCountries = (res) => {
  const arr = res.map(el => createCard(el));
  countries.append(...arr);
 }


const createCardCountry = (el) => {
  // флаг, название, столица, население и языки.
  
  const card = document.createElement('div');

  const img = document.createElement('img');
  img.setAttribute('src',el.flags.svg);
  img.setAttribute('class','picture');
  
  

  const h2 = document.createElement('h2');
  h2.innerText = el.name.common ;

  const h3 = document.createElement('h3');
  h3.innerText = el.capital ;

  const p = document.createElement('p')
  p.innerText = el.population;

  const lang = document.createElement('p')
  lang.innerText = Object.values(el.languages).join(', ');

  card.append(img,h2,h3,p,lang);
  

  return card;
}

const renderCountry = (res) => {
  const array = res.map(el => createCardCountry(el))
  countryList.append(...array)
}



function searchCountries() {
    const value = input.value;

    countryList.replaceChildren()
    countries.replaceChildren()

    fetchCountries(value.trim()).then(response => {
        if (response.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        } else if (response.length >= 2 && response.length <= 10) {
            renderCountries(response); 
        } else {

            renderCountry(response)
            input.value = ''
        }
    }).catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name')
      console.log(error)
  });
  }

input.addEventListener('input',debounce(searchCountries,DEBOUNCE_DELAY));


// Задание - поиск стран
 
// Создай фронтенд часть приложения поиска данных о стране по её частичному или полному имени. Посмотри демо видео работы приложения - https://user-images.githubusercontent.com/17479434/131147741-7700e8c5-8744-4eea-8a8e-1c3d4635248a.mp4.

// Стартовые файлы
// Работаем в нашей сборке - Parcel 
// Скачай стартовые файлы с базовой разметкой и стилями задания - https://minhaskamal.github.io/DownGit/#/home?url=https:%2F%2Fgithub.com%2Fgoitacademy%2Fjavascript-homework%2Ftree%2Fmain%2Fv2%2F10%2Fsrc . Скопируй их себе в проект, полностью заменив папку src в parcel-project-template.

// HTTP-запросы 
// Используй публичный API Rest Countries (https://restcountries.com/), а именно ресурс name (https://restcountries.com/#api-endpoints-v3-name), возвращающий массив объектов стран удовлетворивших критерий поиска. Добавь минимальное оформление элементов интерфейса. 
 
// Напиши функцию fetchCountries(name) которая делает HTTP-запрос на ресурс name (https://restcountries.com/#api-endpoints-v3-name) и возвращает промис с массивом стран - результатом запроса. Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.

// Фильтрация полей 
// В ответе от бэкенда возвращаются объекты, большая часть свойств которых тебе не пригодится. Чтобы сократить объем передаваемых данных добавь строку параметров запроса - так этот бэкенд реализует фильтрацию полей. Ознакомься с документацией синтаксиса фильтров - https://restcountries.com/#filter-response . 
 
// Тебе нужны только следующие свойства: 
 
// name.official - полное имя страны 
// capital - столица 
// population - население 
// flags.svg - ссылка на изображение флага 
// languages - массив языков

// Поле поиска 
// Название страны для поиска пользователь вводит в текстовое поле input#search-box. 
// HTTP-запросы выполняются при наборе имени страны, то есть по событию input. 
// Но, делать запрос при каждом нажатии клавиши нельзя, 
// так как одновременно получится много запросов и они будут выполняться в непредсказуемом порядке. 
 

// Необходимо применить приём Debounce на обработчике события 
// и делать HTTP-запрос спустя 300мс после того, как пользователь перестал вводить текст.
//  Используй пакет lodash.debounce - https://www.npmjs.com/package/lodash.debounce . 
 
// Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает. 
 
// Выполни санитизацию введенной строки методом trim(), это решит проблему когда в поле ввода только пробелы или они есть в начале и в конце строки.

// Интерфейс 
// Если в ответе бэкенд вернул больше чем 10 стран, в интерфейсе пояляется уведомление о том, что имя должно быть более специфичным.
//  Для уведомлений используй библиотеку notiflix (https://github.com/notiflix/Notiflix#readme) и выводи такую строку "Too many matches found. 
//  Please enter a more specific name.".
// Если бэкенд вернул от 2-х до 10-х стран, под тестовым полем отображается список найденных стран. 
// Каждый элемент списка состоит из флага и имени страны.
// Если результат запроса это массив с одной страной, в интерфейсе отображается разметка карточки с данными о стране: флаг, название, столица, население и языки.

// Обработка ошибки 
// Если пользователь ввёл имя страны которой не существует, бэкенд вернёт не пустой массив, а ошибку со статус кодом 404 - не найдено.
// Если это не обработать, то пользователь никогда не узнает о том, что поиск не дал результатов. 
// Добавь уведомление "Oops, there is no country with that name" в случае ошибки используя библиотеку notiflix (https://github.com/notiflix/Notiflix#readme).


// ВНИМАНИЕ 
// Не забывай о том, что fetch не считает 404 ошибкой, поэтому необходимо явно отклонить промис чтобы можно было словить и обработать ошибку.