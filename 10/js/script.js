const books = document.getElementsByClassName('book'),
    ad = document.querySelector('.adv'),
    wrapper = document.querySelector('.books'),
    boddy = document.querySelector('body');
let myUl,
    myBook;

ad.remove(); // удаляем рекламу;

wrapper.insertBefore(books[1], books[0]); // сортируем список
wrapper.insertBefore(books[4], books[2]);
wrapper.insertBefore(books[4], books[3]);
wrapper.insertBefore(books[5], books[4]);

//меняем бг
boddy.style.background = 'url("image/adv.jpg")';

//меняем главы книг
myUl = books[1].querySelectorAll('LI');
myUl[4].before(myUl[6]);
myUl[4].before(myUl[8]);

myUl = books[4].querySelectorAll('LI');
myUl[2].before(myUl[9]);
myUl[2].before(myUl[3]);
myUl[2].before(myUl[4]);

//Добавляем главу в 6 книге
let myChapter = document.createElement('LI');
myChapter.textContent = 'Глава 8: За пределами ES6';
books[5].querySelector('UL').append(myChapter);
myUl = books[5].querySelectorAll('LI');
myUl[9].before(myUl[10]);

//меняем название второй книги
myBook = books[2].querySelectorAll('a');
myBook[0].textContent = 'Книга 3. this и Прототипы Объектов'