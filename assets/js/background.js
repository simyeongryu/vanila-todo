const body = document.querySelector("body");
const HOW_MANY_IMAGES = 6;

const loadBackground = () => {
  const randomNumber = Math.floor(Math.random() * HOW_MANY_IMAGES);
  const image = new Image();
  image.src = `./assets/img/${randomNumber}.png`;
  image.classList.add("bg");
  body.append(image);
};

loadBackground();
