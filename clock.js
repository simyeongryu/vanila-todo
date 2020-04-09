const clock = document.querySelector("#clock");

const getTime = () => {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  clock.innerHTML = `${hours}:${minutes}:${seconds}`;
};

const clockInit = () => {
  getTime();
  setInterval(getTime, 1000);
};

clockInit();
