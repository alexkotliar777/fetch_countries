const SEARCH_URL = 'https://restcountries.com/v3.1/name/';
const searchParaMS = new URLSearchParams({
    fields:['name','capital','population','flags','languages'],
})

export const fetchCountries = (name) => {
    return fetch(`${SEARCH_URL}${name}?${searchParaMS}`)
        .then(response => {
        if(!response.ok) {
          throw new Error(response.status);
        }
         return response.json();
    });
}



// Фильтрация полей
// В ответе от бэкенда возвращаются объекты, 
// большая часть свойств которых тебе не пригодится. 
// Чтобы сократить объем передаваемых данных добавь строку параметров запроса
//  - так этот бэкенд реализует фильтрацию полей. 
//  Ознакомься с документацией синтаксиса фильтров.

// Тебе нужны только следующие свойства:

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков