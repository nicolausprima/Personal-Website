const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

new Typed('.auto-type', {
  strings: [
    "Data Science Student.",
    "Web Developer.",
    "ML Enthusiast.",
    "Data Analyst."
  ],
  typeSpeed: 55,
  backSpeed: 35,
  loop: true,
  backDelay: 2200,
  startDelay: 800,
  showCursor: true,
  cursorChar: '_'
});

// Skill Icon Particle Simulation Class for Skill Cards (96x96)
class SkillPixelIcon {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.skill = this.canvas.dataset.skill;
    this.card = this.canvas.closest('.skill-card');
    if (!this.card) return;

    // 96x96 internal dimensions
    this.width = 96;
    this.height = 96;
    this.particles = [];
    this.isHovered = false;
    this.time = Math.random() * 100;

    // Offscreen canvas for scanning (96x96)
    this.offscreen = document.createElement('canvas');
    this.offscreen.width = 96;
    this.offscreen.height = 96;
    this.oCtx = this.offscreen.getContext('2d', { willReadFrequently: true });

    // Physics parameters
    this.springStrength = 0.06;
    this.friction = 0.87;

    this.init();
  }

  // Draw templates modeled on 200x200 space; dynamically centered and scaled to 96x96

  drawHtmlLogo(ctx) {
    // Web Dev: curly braces {} — bold, centered, unmistakable
    ctx.clearRect(0, 0, 200, 200);
    // Shadow/depth: draw slightly offset in dark orange
    ctx.fillStyle = '#b83d1a';
    ctx.font = "bold 150px 'JetBrains Mono', monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('{}', 102, 104);
    // Foreground: vivid orange
    ctx.fillStyle = '#e34f26';
    ctx.fillText('{}', 100, 100);
  }

  drawPythonLogo(ctx) {
    // Official Python logo shapes using SVG-accurate Path2D
    // Both snakes fit in a 110x110 space
    ctx.clearRect(0, 0, 200, 200);

    ctx.save();
    // Scale and center: 110x110 space → 200x200 canvas
    ctx.translate(100, 100);
    ctx.scale(1.72, 1.72);
    ctx.translate(-55, -55);

    // --- Blue snake (top body) ---
    ctx.fillStyle = '#306998';
    ctx.beginPath();
    // Outer shape: P-shape with rounded corners, matching official logo
    ctx.moveTo(55, 2);
    ctx.bezierCurveTo(29, 2, 26, 14, 26, 22);
    ctx.lineTo(26, 36);
    ctx.lineTo(55, 36);
    ctx.lineTo(55, 40);
    ctx.lineTo(18, 40);
    ctx.bezierCurveTo(6, 40, 2, 49, 2, 62);
    ctx.bezierCurveTo(2, 76, 10, 84, 22, 84);
    ctx.lineTo(32, 84);
    ctx.lineTo(32, 70);
    ctx.bezierCurveTo(32, 58, 41, 50, 55, 50);
    ctx.lineTo(83, 50);
    ctx.bezierCurveTo(94, 50, 102, 42, 102, 31);
    ctx.lineTo(102, 22);
    ctx.bezierCurveTo(102, 11, 93, 2, 82, 2);
    ctx.closePath();
    ctx.fill();
    // Blue eye (small white dot inside blue body)
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(37, 22, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // --- Yellow snake (bottom body, mirrored/rotated) ---
    ctx.fillStyle = '#ffd43b';
    ctx.save();
    ctx.translate(55, 55);
    ctx.rotate(Math.PI);
    ctx.translate(-55, -55);
    ctx.beginPath();
    ctx.moveTo(55, 2);
    ctx.bezierCurveTo(29, 2, 26, 14, 26, 22);
    ctx.lineTo(26, 36);
    ctx.lineTo(55, 36);
    ctx.lineTo(55, 40);
    ctx.lineTo(18, 40);
    ctx.bezierCurveTo(6, 40, 2, 49, 2, 62);
    ctx.bezierCurveTo(2, 76, 10, 84, 22, 84);
    ctx.lineTo(32, 84);
    ctx.lineTo(32, 70);
    ctx.bezierCurveTo(32, 58, 41, 50, 55, 50);
    ctx.lineTo(83, 50);
    ctx.bezierCurveTo(94, 50, 102, 42, 102, 31);
    ctx.lineTo(102, 22);
    ctx.bezierCurveTo(102, 11, 93, 2, 82, 2);
    ctx.closePath();
    ctx.fill();
    // Yellow eye
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(37, 22, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.restore();

    ctx.restore();
  }

  drawRLogo(ctx) {
    // R language: dark blue oval background + white bold "R" drawn on top
    // Two-tone so particles form BOTH the oval and the letter
    ctx.clearRect(0, 0, 200, 200);

    // Dark background oval
    ctx.fillStyle = '#1a4a8c';
    ctx.beginPath();
    ctx.ellipse(100, 100, 85, 70, 0, 0, Math.PI * 2);
    ctx.fill();

    // Medium blue inner oval for depth
    ctx.fillStyle = '#276dc3';
    ctx.beginPath();
    ctx.ellipse(100, 100, 75, 60, 0, 0, Math.PI * 2);
    ctx.fill();

    // White-ish "R" drawn directly on top (light enough to be visible, dark enough to be sampled)
    // Using off-white so pixel filter (avg < 230) still catches it
    ctx.fillStyle = '#e8f0fc';
    ctx.font = "bold 115px 'Arial', 'JetBrains Mono', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('R', 100, 102);
  }

  drawSqlLogo(ctx) {
    // PostgreSQL: clean cylinder stack + large bold SQL text drawn on top in contrasting color
    ctx.clearRect(0, 0, 200, 200);

    // Dark cylinder bodies (background)
    ctx.fillStyle = '#1f4060';
    const drawDarkCylinder = (y) => {
      ctx.beginPath();
      ctx.ellipse(100, y, 68, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(32, y, 136, 28);
      ctx.beginPath();
      ctx.ellipse(100, y + 28, 68, 18, 0, 0, Math.PI * 2);
      ctx.fill();
    };
    drawDarkCylinder(38);
    drawDarkCylinder(83);
    drawDarkCylinder(128);

    // Lighter cylinder sheen on top caps
    ctx.fillStyle = '#336791';
    const drawTopEllipse = (y) => {
      ctx.beginPath();
      ctx.ellipse(100, y, 68, 18, 0, 0, Math.PI * 2);
      ctx.fill();
    };
    drawTopEllipse(38);
    drawTopEllipse(83);
    drawTopEllipse(128);

    // Separation lines between cylinders in dark
    ctx.fillStyle = '#0d2030';
    ctx.fillRect(32, 83 - 1, 136, 3);
    ctx.fillRect(32, 128 - 1, 136, 3);

    // Large bold SQL text in off-white (sampled as bright-but-not-white pixels)
    ctx.fillStyle = '#d8eaf8';
    ctx.font = "bold 56px 'Arial Black', 'JetBrains Mono', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SQL', 100, 96);
  }

  drawMlLogo(ctx) {
    // Machine Learning: dark purple circle + large bold ML text in lavender
    ctx.clearRect(0, 0, 200, 200);

    // Dark outer circle for depth
    ctx.fillStyle = '#3d1a7a';
    ctx.beginPath();
    ctx.arc(100, 100, 85, 0, Math.PI * 2);
    ctx.fill();

    // Medium purple main circle
    ctx.fillStyle = '#6f42c1';
    ctx.beginPath();
    ctx.arc(100, 100, 76, 0, Math.PI * 2);
    ctx.fill();

    // Large bold ML in light lavender (bright enough to be distinct, dark enough to be sampled)
    ctx.fillStyle = '#e0d4f7';
    ctx.font = "bold 88px 'Arial Black', 'JetBrains Mono', sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ML', 100, 100);
  }

  drawVizLogo(ctx) {
    // Data Viz: colored bar chart — no axis lines, just clean bars
    ctx.clearRect(0, 0, 200, 200);
    // Bar 1 (short)
    ctx.fillStyle = '#e83e8c';
    ctx.fillRect(25, 118, 35, 60);
    // Bar 2 (medium)
    ctx.fillStyle = '#fd7e14';
    ctx.fillRect(68, 76, 35, 102);
    // Bar 3 (tall)
    ctx.fillStyle = '#20c997';
    ctx.fillRect(111, 34, 35, 144);
    // Bar 4 (medium-short)
    ctx.fillStyle = '#007bff';
    ctx.fillRect(154, 96, 35, 82);
  }

  getTargets() {
    const S = this.width; // 96
    this.oCtx.clearRect(0, 0, S, S);
    this.oCtx.save();

    // Initial placement: map drawing center (100,100) to canvas center (48,48)
    this.oCtx.translate(S / 2, S / 2);

    // Scale so logo fills ~78px of the 96px slot
    let scale = 0.39;
    if (this.skill === 'python') scale = 0.35;
    else if (this.skill === 'r')   scale = 0.42;
    else if (this.skill === 'sql') scale = 0.41;
    else if (this.skill === 'web') scale = 0.38;
    else if (this.skill === 'ml')  scale = 0.42;
    else if (this.skill === 'viz') scale = 0.39;

    this.oCtx.scale(scale, scale);
    this.oCtx.translate(-100, -100);

    if (this.skill === 'python') this.drawPythonLogo(this.oCtx);
    else if (this.skill === 'r') this.drawRLogo(this.oCtx);
    else if (this.skill === 'sql') this.drawSqlLogo(this.oCtx);
    else if (this.skill === 'web') this.drawHtmlLogo(this.oCtx);
    else if (this.skill === 'ml') this.drawMlLogo(this.oCtx);
    else if (this.skill === 'viz') this.drawVizLogo(this.oCtx);

    this.oCtx.restore();

    const imgData = this.oCtx.getImageData(0, 0, S, S);
    const data = imgData.data;
    const raw = [];
    const step = 3;
    let minX = S, maxX = 0, minY = S, maxY = 0;

    for (let y = 0; y < S; y += step) {
      for (let x = 0; x < S; x += step) {
        const idx = (y * S + x) * 4;
        if (data[idx + 3] > 120) {
          const r = data[idx], g = data[idx + 1], b = data[idx + 2];
          if ((r + g + b) / 3 < 245) {
            raw.push({ x, y, r, g, b });
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
    }

    if (raw.length === 0) return raw;

    // Auto-center: shift all targets so the actual pixel bounding box
    // is perfectly centered in the canvas, regardless of draw offsets.
    const ox = Math.round(S / 2 - (minX + maxX) / 2);
    const oy = Math.round(S / 2 - (minY + maxY) / 2);

    return raw.map(t => ({ ...t, x: t.x + ox, y: t.y + oy }));
  }

  createParticle() {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      tx: null,
      ty: null,
      // Current rendered color (defaults to neutral grey)
      cr: 220,
      cg: 220,
      cb: 225,
      // Targeted color
      tr: 220,
      tg: 220,
      tb: 225,
      // Original sampled tech-specific color
      origR: 220,
      origG: 220,
      origB: 225,
      wx: Math.random() * this.width,
      wy: Math.random() * this.height,
      size: 1.8 + Math.random() * 1.4, // particle sizes 1.8–3.2px for 96px canvas
      alpha: 0.38 + Math.random() * 0.52
    };
  }

  init() {
    this.resize();
    
    this.card.addEventListener('mouseenter', () => { this.isHovered = true; });
    this.card.addEventListener('mouseleave', () => { this.isHovered = false; });

    const targets = this.getTargets();
    targets.forEach(t => {
      const p = this.createParticle();
      p.tx = t.x;
      p.ty = t.y;
      p.origR = t.r;
      p.origG = t.g;
      p.origB = t.b;
      p.x = t.x + (Math.random() - 0.5) * 14;
      p.y = t.y + (Math.random() - 0.5) * 14;
      p.wx = t.x + (Math.random() - 0.5) * 14;
      p.wy = t.y + (Math.random() - 0.5) * 14;
      this.particles.push(p);
    });

    this.tick();
  }

  resize() {
    // Lock to native 96x96 pixels for pixel-perfect centering on all DPR monitors.
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
  }

  tick() {
    this.time += 0.01;
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Update color targets based on hover state (light up on hover, fade to grey on unhover)
      if (this.isHovered) {
        p.tr = p.origR;
        p.tg = p.origG;
        p.tb = p.origB;
      } else {
        p.tr = 220;
        p.tg = 220;
        p.tb = 225;
      }

      // Smooth color morphing
      p.cr += (p.tr - p.cr) * 0.08;
      p.cg += (p.tg - p.cg) * 0.08;
      p.cb += (p.tb - p.cb) * 0.08;

      if (this.isHovered && p.tx !== null) {
        // Assemble logo inside the card icon slot
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        
        const ax = dx * this.springStrength;
        const ay = dy * this.springStrength;

        p.vx = (p.vx + ax) * this.friction;
        p.vy = (p.vy + ay) * this.friction;
      } else {
        // Slow-motion floating dust near their home logo positions (creates a centered breathing outline)
        const dx = p.wx - p.x;
        const dy = p.wy - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 4) {
          p.wx = p.tx + (Math.random() - 0.5) * 12;
          p.wy = p.ty + (Math.random() - 0.5) * 12;
        }

        let ax = dx * 0.005;
        let ay = dy * 0.005;

        ax += Math.sin(this.time + p.wx) * 0.005;
        ay += Math.cos(this.time + p.wy) * 0.005;

        p.vx = (p.vx + ax) * 0.92;
        p.vy = (p.vy + ay) * 0.92;
      }

      // Slow float speed limiter
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const maxSpeed = this.isHovered ? 4 : 0.25; 
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (!this.isHovered) {
        if (p.x < -2) p.x = this.width + 2;
        if (p.x > this.width + 2) p.x = -2;
        if (p.y < -2) p.y = this.height + 2;
        if (p.y > this.height + 2) p.y = -2;
      }

      this.ctx.fillStyle = `rgba(${Math.round(p.cr)}, ${Math.round(p.cg)}, ${Math.round(p.cb)}, ${p.alpha})`;
      this.ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }

    requestAnimationFrame(() => this.tick());
  }
}

// Initialize simulation for all skill canvases on the page
document.querySelectorAll('.skill-pixel-canvas').forEach(canvas => {
  new SkillPixelIcon(canvas);
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { 
  threshold: 0.05,
  rootMargin: '-30px 0px -30px 0px'
});
reveals.forEach(el => observer.observe(el));
