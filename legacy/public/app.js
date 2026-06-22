const canvas = document.querySelector('#starfield');
const context = canvas?.getContext('2d');
let width = 0;
let height = 0;
let stars = [];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function resize() {
  if (!canvas || !context) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.max(120, Math.floor((width * height) / 6200));
  stars = Array.from({ length: count }, () => ({
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    z: randomBetween(0.3, 1.4),
    speed: randomBetween(0.04, 0.18),
    hue: randomBetween(165, 330),
  }));
}

function draw() {
  if (!context) return;

  context.clearRect(0, 0, width, height);
  context.fillStyle = '#050507';
  context.fillRect(0, 0, width, height);

  for (const star of stars) {
    star.x -= star.speed * star.z;
    star.y += star.speed * 0.18;

    if (star.x < -8) {
      star.x = width + 8;
      star.y = randomBetween(0, height);
    }

    const radius = star.z * 1.15;
    context.beginPath();
    context.fillStyle = `hsla(${star.hue}, 88%, 78%, ${0.28 + star.z * 0.3})`;
    context.arc(star.x, star.y, radius, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.strokeStyle = `hsla(${star.hue}, 88%, 78%, ${0.08 + star.z * 0.12})`;
    context.moveTo(star.x + radius * 2, star.y);
    context.lineTo(star.x + radius * 9, star.y - radius * 1.8);
    context.stroke();
  }

  window.requestAnimationFrame(draw);
}

if (canvas && context) {
  resize();
  draw();
  window.addEventListener('resize', resize, { passive: true });
}
