import * as funcWebp from './modules/functions.js';
funcWebp.isWebp();

document.addEventListener('DOMContentLoaded', () => {
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');
  const hh = document.getElementById('hh');
  const mm = document.getElementById('mm');
  const ss = document.getElementById('ss');

  // Всего времени (если таймер должен начинаться не с начала, а как будто уже прошло сколько-то времени)
  const hoursOverall = 10;
  const minutesOverall = 0;
  const secondsOverall = 0;

  // Сколько времени уже "прошло"
  const hoursPassed = 7;
  const minutesPassed = 9;
  const secondsPassed = Math.floor(Math.random() * 60 + 1);

  // Вычисление "остатка" времени
  const overallTime = hoursOverall * 3600000 + minutesOverall * 60000 + secondsOverall * 1000;
  const passedTime = hoursPassed * 3600000 + minutesPassed * 60000 + secondsPassed * 1000;
  const leftTime = overallTime - passedTime;

  let timerLeftTime = leftTime;
  // Таймер
  setInterval(
    (function timer() {
      timerLeftTime -= 1000;
      let h = Math.floor((timerLeftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((timerLeftTime % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((timerLeftTime % (1000 * 60)) / 1000);

      //Выводим в html (pad добавляет 0 если число однозначное )
      hours.innerHTML = pad(h);
      minutes.innerHTML = pad(m);
      seconds.innerHTML = pad(s);

      // Анимация stroke у svg
      hh.style.strokeDashoffset = `${44 - (44 * h) / 24}rem`;
      mm.style.strokeDashoffset = `${44 - (44 * m) / 60}rem`;
      ss.style.strokeDashoffset = `${44 - (44 * s) / 60}rem`;
      //если 00 на часах, то заполнить stroke, а не оставлять ее пустой
      fillStrokeOnZero();

      //Если время истекло, то начать время с начала
      if (timerLeftTime <= 0) {
        timerLeftTime = leftTime;
      }

      return timer;
    })(),
    1000,
  );

  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  function fillStrokeOnZero() {
    if (seconds.innerText == '00') {
      ss.style.strokeDashoffset = 0;
    }

    if (minutes.innerText == '00') {
      mm.style.strokeDashoffset = 0;
    }

    if (hours.innerText == '00') {
      hh.style.strokeDashoffset = 0;
    }
  }
});
