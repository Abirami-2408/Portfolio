const frameCount = 240;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Store images
const images = [];
const imageSeq = { frame: 0 };

// Get frame path
function getFrame(index) {
  return `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
}

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = getFrame(i);
  images.push(img);
}

// Render function
function render() {
  const img = images[imageSeq.frame];
  if (!img) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // Maintain aspect ratio
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = (canvas.width / 2) - (img.width / 2) * scale;
  const y = (canvas.height / 2) - (img.height / 2) * scale;

  context.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    x,
    y,
    img.width * scale,
    img.height * scale
  );
}

// Scroll animation
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;

  imageSeq.frame = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(render);
});

// Initial render
images[0].onload = render;
