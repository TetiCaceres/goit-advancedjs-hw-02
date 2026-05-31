import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startBtn.disabled = true;

let userSelectedDate = null;
let intervalId = null;

// ---------- helpers ----------
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateUI(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

// ---------- flatpickr ----------
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (!selectedDate || selectedDate <= now) {
      startBtn.disabled = true;

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight', // Позиція на екрані
        backgroundColor: '#ef4040', // Колір фону
        titleColor: '#ffffff', // Колір заголовка
        messageColor: '#ffffff', // Колір тексту повідомлення
        iconUrl: './img/icon.svg',
        iconColor: '#ffffff', // Колір іконки
        progressBarColor: '#b51b1b', // Колір смуги прогресу
        timeout: 5000, // Час відображення в мілісекундах
        closeOnClick: true, // Закриття по кліку
      });

      return;
    }

    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

// ---------- timer ----------
function startTimer() {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  input.disabled = true;

  clearInterval(intervalId);

  updateUI(userSelectedDate - Date.now());

  intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      clearInterval(intervalId);

      updateUI(0);

      input.disabled = false;
      startBtn.disabled = true;
      userSelectedDate = null;

      return;
    }

    updateUI(diff);
  }, 1000);
}

// ---------- events ----------
startBtn.addEventListener('click', startTimer);
