const container = document.getElementById("jd-container");
const scrollContainer = container.querySelector("#jd-scrollContainer");
const bar = container.querySelector("#bar");
const wrapper = container.querySelector(".wrap");
const contentDistance = wrapper.clientWidth - container.clientWidth;
const barDistance = container.clientWidth - bar.clientWidth;

let distance = 0;
let timer;
let downed = false;
let x = 0;
let barLeft = 0;
let moveIn = false;

const start = () => {
  moveIn = false;
  if (downed || timer) return;
  if (!downed) bar.parentNode.style.opacity = 0;

  const action = () => {
    scrollContainer.scrollLeft = distance++;
    if (distance > contentDistance) {
      distance = 0;
    }

    barLeft = distance * (barDistance / contentDistance);
    bar.style.left = barLeft + "px";
  };

  timer = setInterval(() => {
    window.requestAnimationFrame(action);
  }, 20);
};

const stop = () => {
  moveIn = true;
  bar.parentNode.style.opacity = 1;
  clearInterval(timer);
  timer = null;
};

start();

container.onwheel = (e) => e.preventDefault();
container.onmouseenter = stop;
container.onmouseleave = start;

document.onmousedown = (e) => {
  if (e.target.classList.contains("bar")) downed = true;
  x = e.offsetX;
};

document.onmouseup = (e) => {
  downed = false;
  !timer && !moveIn && start();
};

document.onmousemove = function (e) {
  if (!downed) return;
  let barNewLeft = e.clientX - x;
  bar.style.left = barNewLeft + "px";

  if (barNewLeft < 0) {
    bar.style.left = "0";
    barNewLeft = 0;
  }

  if (barNewLeft > barDistance) {
    bar.style.left = barDistance + "px";
    barNewLeft = barDistance;
  }

  distance = barNewLeft / (barDistance / contentDistance);
  scrollContainer.scrollLeft = distance;
};
