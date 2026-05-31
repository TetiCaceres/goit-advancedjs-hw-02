// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();
    
  const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;
    
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
    
  promise
    .then(value => {
      // Викликаємо успішне сповіщення
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${value}ms`,
        position: 'topRight',
        iconUrl: '/img/isSucces.png',
        backgroundColor: ' #59a10d',
        titleColor: '#ffffff', // Колір заголовка
        messageColor: '#ffffff',
      });
    })
    .catch(error => {
      // Викликаємо сповіщення про помилку
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${error}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040', 
        titleColor: '#ffffff', // Колір заголовка
        messageColor: '#ffffff', // Колір тексту повідомлення
        iconUrl: '/img/icon.svg',
        iconColor: '#ffffff',
      });
    });
});
