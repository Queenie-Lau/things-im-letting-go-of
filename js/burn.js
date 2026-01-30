/**
 * BURN.JS - Realistic Random-Spot Fractal Burn
 */

let count = 1;
let isBurning = false;
let seeds = []; // Points where fire starts
let particles = [];
let capturedImageData = null;

const list = document.getElementById("list");
const burnBtn = document.getElementById("burnBtn");
const paper = document.querySelector('.paper');
const canvas = document.getElementById('burnCanvas');
const ctx = canvas.getContext('2d');
const paperImg = new Image();
paperImg.src = '/assets/pasted-paper.jpg';

// 1. INPUT LOGIC
list.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const input = e.target;
        if (!input.value.trim() || isBurning) return;
        input.disabled = true;
        count++;
        const line = document.createElement("div");
        line.className = "line";
        line.innerHTML = `<span>${count}.</span><input type="text" autofocus />`;
        list.appendChild(line);
        line.querySelector("input").focus();
        burnBtn.disabled = false;
    }
});

// 2. CAPTURE CONTENT
async function captureContent() {
    await document.fonts.ready;
    canvas.width = paper.offsetWidth;
    canvas.height = paper.offsetHeight;
    
    ctx.drawImage(paperImg, 0, 0, canvas.width, canvas.height);
    
    const paperStyle = window.getComputedStyle(paper);
    const h2Style = window.getComputedStyle(paper.querySelector('h2'));
    const inputStyle = window.getComputedStyle(document.querySelector('input'));
    const pLeft = parseFloat(paperStyle.paddingLeft);
    const pTop = parseFloat(paperStyle.paddingTop);

    ctx.fillStyle = "black";
    ctx.font = `${h2Style.fontWeight} ${h2Style.fontSize} ${h2Style.fontFamily}`;
    ctx.textBaseline = "top";
    ctx.fillText("Things I’m letting go of", pLeft, pTop);

    ctx.font = `${inputStyle.fontSize} ${inputStyle.fontFamily}`;
    document.querySelectorAll('#list input').forEach((input, i) => {
        ctx.fillText(`${i + 1}. ${input.value}`, pLeft, pTop + 70 + (i * 35));
    });

    capturedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// 3. BURN ENGINE (Point-Growth System)
function initBurn() {
    if (isBurning) return;
    captureContent().then(() => {
        paper.style.backgroundImage = 'none';
        paper.style.boxShadow = 'none';
        paper.style.backgroundColor = 'transparent';
        Array.from(paper.children).forEach(c => { if (c.id !== 'burnCanvas') c.style.opacity = '0'; });
        canvas.style.display = 'block';

        // Add 3-5 random ignition points (seeds)
        for (let i = 0; i < 4; i++) {
            seeds.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 0, // Current radius
                maxR: Math.max(canvas.width, canvas.height) * 1.2,
                noise: Math.random() * 100
            });
        }

        isBurning = true;
        requestAnimationFrame(updateLoop);
    });
}

function updateLoop() {
    if (!isBurning) return;

    // 1. Draw original paper
    ctx.putImageData(capturedImageData, 0, 0);

    // 2. Process seeds (Expanding holes)
    seeds.forEach(seed => {
        if (seed.r < seed.maxR) {
            seed.r += 0.8; // Control speed of burn expansion
            drawOrganicHole(seed);
        }
    });

    // 3. Ash Particles
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(updateLoop);
}

function drawOrganicHole(seed) {
    // We use a "Destination-Out" mode to eat away at the putImageData
    ctx.globalCompositeOperation = 'destination-out';
    
    ctx.beginPath();
    // Create jagged edges by varying the radius with a sine-based noise
    for (let i = 0; i < Math.PI * 2; i += 0.1) {
        const noise = Math.sin(i * 6 + seed.noise) * 15 + Math.cos(i * 3 + seed.r * 0.05) * 10;
        const x = seed.x + (seed.r + noise) * Math.cos(i);
        const y = seed.y + (seed.r + noise) * Math.sin(i);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    // Reset composite to draw embers on top of the hole's edge
    ctx.globalCompositeOperation = 'source-over';
    
    // Draw the Glowing Scorch Edge
    ctx.strokeStyle = `rgba(255, ${Math.random() * 100 + 50}, 0, 0.8)`;
    ctx.lineWidth = 4;
    ctx.setLineDash([5, 15]); // Creates flickering ember spots
    ctx.stroke();

    // Spawn ash at the edge
    if (Math.random() > 0.8) {
        const angle = Math.random() * Math.PI * 2;
        particles.push(new AshParticle(
            seed.x + seed.r * Math.cos(angle),
            seed.y + seed.r * Math.sin(angle)
        ));
    }
}

class AshParticle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = -Math.random() * 1 - 0.5;
        this.life = 1.0;
        this.size = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        this.life -= 0.01;
    }
    draw() {
        ctx.fillStyle = `rgba(30, 30, 30, ${this.life})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

burnBtn.addEventListener('click', initBurn);