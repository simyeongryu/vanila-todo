const API_KEY = "91c9d63d5dcf2b74c7d2e66cb945ce0a";

const getWeather = async (lat, lng) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  );
  const json = await response.json();
  const temp = json.main.temp;
  const country = json.sys.country;
  const place = json.name;
  weather.innerText = `${temp} °C @ ${place} ${country}`;
};

const handleFail = () => {
  alert("현재 위치를 얻을 수 없습니다.");
  console.log("Geolocation Fail");
};

const handleSuccess = loc => {
  const lat = loc.coords.latitude;
  const lng = loc.coords.longitude;
  const coords = { lat, lng };
  localStorage.setItem(LS_COORDS, JSON.stringify(coords));
  getWeather(lat, lng);
};

const loadCoords = () => {
  const loadedCoords = localStorage.getItem(LS_COORDS);

  if (!loadedCoords) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleFail);
  } else {
    const lat = JSON.parse(loadedCoords).lat;
    const lng = JSON.parse(loadedCoords).lng;
    getWeather(lat, lng);
  }
};

loadCoords();
