const graficoCtx = document.getElementById('graficoGatos').getContext('2d');

new Chart(graficoCtx, {
  type: 'pie',
  data: {
    labels: ['África', 'Ásia', 'América Latina', 'União Europeia', 'GLOBAL'],
    datasets: [{
      label: 'Gatinhos',
      data: [25, 50, 20, 30, 75],
      backgroundColor: ['#f8c291', '#6a89cc', '#82ccdd', '#60a3bc', '#e58e26'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}`;
          }
        }
      }
    }
  }
});


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

const canvas = document.getElementById("paw-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawCatPaw(ctx, x, y, size) {
  ctx.fillStyle = 'rgba(80, 40, 20, 0.7)'; 

  
  for (let i = 0; i < 4; i++) {
    const offsetX = (i - 1.5) * (size / 3);
    ctx.beginPath();
    ctx.ellipse(x + offsetX, y, size / 4, size / 3, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  
  ctx.beginPath();
  ctx.ellipse(x, y + size / 3, size / 2, size / 3, 0, 0, Math.PI * 2);
  ctx.fill();
}

const paws = [];

function createPaw() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * canvas.height,
    size: 20 + Math.random() * 20,
    speed: 0.5 + Math.random() * 1,
    angle: Math.random() * Math.PI * 2
  };
}

function init() {
  for (let i = 0; i < 30; i++) {
    paws.push(createPaw());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  paws.forEach((paw) => {
    paw.y -= paw.speed;
    paw.angle += 0.02;
    paw.x += Math.sin(paw.angle) * 0.5;

    if (paw.y < -paw.size * 2) {
      paw.y = canvas.height + paw.size;
      paw.x = Math.random() * canvas.width;
    }

    drawCatPaw(ctx, paw.x, paw.y, paw.size);
  });

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

init();
animate();
