const getTime = () => {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  const clock = document.querySelector("#clock");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
};

const clockInit = () => {
  getTime();
  setInterval(getTime, 1000);
};

clockInit();
