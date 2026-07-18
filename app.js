// ── DARK MODE TOGGLE ──────────────────────────────────────────
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Init: check localStorage, then system preference
const saved = localStorage.getItem('theme');
if (saved) {
  applyTheme(saved);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  applyTheme('dark');
}

toggleBtn?.addEventListener('click', () => {
  // Add temporary class to enable smooth transition on all elements
  document.documentElement.classList.add('theme-transition');
  
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
  
  // Remove the transition class after animation completes (500ms)
  // This ensures normal hover effects aren't overridden permanently
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
  }, 500);
});
// ── Lightweight Smooth Scroll (Lerp) for Hands ────────────────
// Lightweight Smooth Scroll (Lerp) for Hands
let targetScrollY = window.scrollY;
let currentScrollY = window.scrollY;

// Intro animation state for hands
let introProgress = 0;

// ── CUSTOM CURSOR ─────────────────────────────────────────────
const cursor = document.querySelector('.cursor');
const navbar = document.querySelector('.navbar');
const handLeft = document.getElementById('image-hand-left');
const handRight = document.getElementById('image-hand-right');

window.addEventListener('scroll', () => {
  let scrollY = window.scrollY;
  targetScrollY = scrollY; // Update target for lerp
  
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

function animateHands() {
  currentScrollY += (targetScrollY - currentScrollY) * 0.08; 
  
  // Calculate intro animation (0 to 1 over approx 1 second)
  if (introProgress < 1) {
    introProgress += 0.015;
    if (introProgress > 1) introProgress = 1;
  }
  // Quartic ease-out for ultra smooth landing
  let introEased = 1 - Math.pow(1 - introProgress, 4);
  
  const projectsSection = document.getElementById('projects');
  if (handLeft && handRight && projectsSection) {
    let projectsTop = projectsSection.offsetTop;
    let projectsBottom = projectsTop + projectsSection.offsetHeight;
    
    let ratio = Math.min(1, currentScrollY / Math.max(1, projectsTop - 250));
    let pushIn = (1 - ratio) * 12; 
    
    // Add a slide-in offset for the initial load (-15vw starting point, resolves to 0)
    let slideInOffset = (1 - introEased) * -15;
    
    let opacity = 1;
    let fadeStart = projectsBottom - (window.innerHeight * 0.8); 
    if (currentScrollY > fadeStart) {
      opacity = 1 - ((currentScrollY - fadeStart) / 300); 
      if (opacity < 0) opacity = 0;
    }
    
    // Apply fade-in for intro
    let finalOpacity = opacity * introEased;
    
    handLeft.style.opacity = finalOpacity;
    handRight.style.opacity = finalOpacity;
    
    handLeft.style.transform = `translateY(-50%) translateX(${pushIn + slideInOffset}vw)`;
    handRight.style.transform = `translateY(-50%) translateX(-${pushIn + slideInOffset}vw) scaleX(-1)`;
  }
  
  requestAnimationFrame(animateHands);
}
requestAnimationFrame(animateHands);

if (document.querySelector('.auto-type-hero')) {
  new Typed('.auto-type-hero', {
    strings: [
      "Turning <span class='hero-highlight h-1'>raw</span> data into meaningful <span class='hero-highlight h-2'>insights.</span>"
    ],
    typeSpeed: 20, /* Reduced from 45 for smoother, faster typing */
    backSpeed: 15, /* Fast deletion */
    loop: true,
    backDelay: 4000, /* Pause fully typed for 4 seconds */
    showCursor: true,
    cursorChar: '|',
    onStringTyped: (arrayPos, self) => {
      // Trigger the left-to-right highlight animations
      const h1 = document.querySelector('.hero-title-new');
      if (h1) h1.classList.add('highlight-active');
      
      // Remove highlight 0.6 seconds before backspacing starts 
      // so it elegantly sweeps backward before text deletes
      setTimeout(() => {
        if (h1) h1.classList.remove('highlight-active');
      }, 3400); 
    }
  });
}

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
    this.hoverTime = 0;
    this.hoverProgress = 0;

    this.init();
  }

  // Draw templates modeled on 200x200 space; dynamically centered and scaled to 96x96

  drawHtmlLogo(ctx) {
    // Web Dev: curly braces {} — bold, centered, unmistakable
    ctx.clearRect(0, 0, 200, 200);
    // Shadow/depth: draw slightly offset in dark charcoal
    ctx.fillStyle = '#111111';
    ctx.font = "bold 150px 'JetBrains Mono', monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('{}', 102, 104);
    // Foreground: charcoal
    ctx.fillStyle = '#2A2A2A';
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
      alpha: 0.38 + Math.random() * 0.52,
      glowPhase: Math.random() * Math.PI * 2,
      glowSpeed: 0.15 + Math.random() * 0.45, // even slower (cycles range from 15 to 60 seconds)
      glowMax: 0.1 + Math.random() * 1.1    // wider upscaling limit (+10% to +110% size)
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

    // Update hover progress
    if (this.isHovered) {
      this.hoverProgress += (1 - this.hoverProgress) * 0.08;
    } else {
      this.hoverProgress += (0 - this.hoverProgress) * 0.12;
    }

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
        const centerX = 48;
        const centerY = 48;
        
        // Relative target coordinates from center
        const rx = p.tx - centerX;
        const ry = p.ty - centerY;
        
        // Individualized slow organic waving/vibration: each particle drifts on its own path
        const waveX = Math.sin(this.time * (p.glowSpeed * 2.0) + p.glowPhase) * 0.7;
        const waveY = Math.cos(this.time * (p.glowSpeed * 2.0) + p.glowPhase) * 0.7;
        
        // Normal scale layout + wave offsets
        const targetX = centerX + rx + waveX;
        const targetY = centerY + ry + waveY;

        const dx = targetX - p.x;
        const dy = targetY - p.y;
        
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

      // Slow, random organic pixel size breathing/twinkling animation
      const pScale = 1.0 + p.glowMax * Math.pow(Math.sin(this.time * p.glowSpeed + p.glowPhase), 2) * this.hoverProgress;
      const renderSize = p.size * pScale;

      this.ctx.fillStyle = `rgba(${Math.round(p.cr)}, ${Math.round(p.cg)}, ${Math.round(p.cb)}, ${p.alpha})`;
      this.ctx.fillRect(p.x - renderSize / 2, p.y - renderSize / 2, renderSize, renderSize);
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

// ── HERO DITHER: floating @ symbols ───────────────────────────
class HeroDither {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.syms   = [];

    this._resize();
    this._populate();
    window.addEventListener('resize', () => {
      this._resize();
      this._populate();
    });
    this._tick();
  }

  _resize() {
    // Match canvas physical pixels to its CSS size
    const r = this.canvas.getBoundingClientRect();
    this.W = this.canvas.width  = r.width  || window.innerWidth;
    this.H = this.canvas.height = r.height || window.innerHeight;
  }

  _populate() {
    const { W, H } = this;
    // One symbol per ~11 000 px² of hero area
    const count = Math.max(30, Math.floor((W * H) / 11000));
    this.syms = [];
    for (let i = 0; i < count; i++) {
      this.syms.push({
        x:          Math.random() * W,
        y:          Math.random() * H,
        travelAngle: Math.random() * Math.PI * 2,     // direction of drift
        speed:      0.04 + Math.random() * 0.10,       // px / frame  (very slow)
        rot:        Math.random() * Math.PI * 2,        // visual rotation angle
        rotSpeed:   (Math.random() - 0.5) * 0.0035,   // spin per frame
        size:       10 + Math.random() * 24,            // font-size px
        baseAlpha:  0.04 + Math.random() * 0.13,       // peak opacity
        phase:      Math.random() * Math.PI * 2,        // breathing phase
        phaseSpd:   0.005 + Math.random() * 0.009,     // breathing speed
      });
    }
  }

  get _isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  _tick() {
    const { ctx, W, H, syms } = this;
    ctx.clearRect(0, 0, W, H);

    // Color: charcoal in light, warm cream in dark
    const [r, g, b] = this._isDark ? [222, 218, 212] : [28, 28, 28];

    for (const s of syms) {
      // Drift
      s.x  += Math.cos(s.travelAngle) * s.speed;
      s.y  += Math.sin(s.travelAngle) * s.speed;
      s.rot += s.rotSpeed;
      s.phase += s.phaseSpd;

      // Wrap around edges with a little padding
      const pad = 50;
      if (s.x < -pad)    s.x = W + pad;
      if (s.x > W + pad) s.x = -pad;
      if (s.y < -pad)    s.y = H + pad;
      if (s.y > H + pad) s.y = -pad;

      // Breathing opacity
      const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.phase));

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.globalAlpha = +alpha.toFixed(4);
      ctx.font = `${s.size}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('@', 0, 0);
      ctx.restore();
    }

    requestAnimationFrame(() => this._tick());
  }
}

const _ditherCanvas = document.getElementById('hero-dither');
if (_ditherCanvas) new HeroDither(_ditherCanvas);

// ── INTERACTIVE 3D DITHER OBJECTS ─────────────────────────────
class Dither3D {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.points = [];
    this.NUM_POINTS = 729; // 9x9x9
    this.shapeIndex = 0;
    
    // Rotation state
    this.angleY = 0;
    this.angleX = 0;

    // Initialize points
    const chars = ['@', '#', '*', '+', ':', '.', '%', '&', 'O', 'x', '=', '~'];
    for (let i = 0; i < this.NUM_POINTS; i++) {
      this.points.push({
        x: 0, y: 0, z: 0,
        tx: 0, ty: 0, tz: 0,
        r: 0, g: 0, b: 0,
        tr: 0, tg: 0, tb: 0,
        char: chars[Math.floor(Math.random() * chars.length)]
      });
    }

    this._resize();
    window.addEventListener('resize', () => this._resize());
    
    // Initial shape
    this.setShape(0);
    // Instantly morph for first shape
    this.points.forEach(p => {
      p.x = p.tx; p.y = p.ty; p.z = p.tz;
      p.r = p.tr; p.g = p.tg; p.b = p.tb;
    });

    this._tick();
  }

  _resize() {
    const r = this.canvas.getBoundingClientRect();
    this.W = this.canvas.width = r.width || 320;
    this.H = this.canvas.height = r.height || 320;
  }

  setShape(index) {
    this.shapeIndex = (index + 6) % 6;
    const labels = ["Python", "R Language", "PostgreSQL", "Web Dev", "Machine Learning", "Data Viz"];
    
    const labelEl = document.getElementById('hero-3d-label');
    if (labelEl) labelEl.textContent = labels[this.shapeIndex];

    if (this.shapeIndex === 0) this.generatePython();
    else if (this.shapeIndex === 1) this.generateRLanguage();
    else if (this.shapeIndex === 2) this.generateSQL();
    else if (this.shapeIndex === 3) this.generateWeb();
    else if (this.shapeIndex === 4) this.generateML();
    else if (this.shapeIndex === 5) this.generateDataViz();
  }

  generatePython() {
    for (let i = 0; i < this.NUM_POINTS; i++) {
      let p = this.points[i];
      let t = i / this.NUM_POINTS; 
      let angle = t * Math.PI * 12; // 6 coils
      let radius = 60 + 40 * Math.sin(t * Math.PI); // thicker in middle
      p.tx = Math.cos(angle) * radius + (Math.random()-0.5)*15;
      p.ty = -100 + t * 200 + (Math.random()-0.5)*15;
      p.tz = Math.sin(angle) * radius + (Math.random()-0.5)*15;
      
      let isYellow = Math.random() > 0.5;
      if (isYellow) { p.tr = 255; p.tg = 212; p.tb = 59; } // Yellow
      else { p.tr = 55; p.tg = 118; p.tb = 171; } // Blue
    }
  }

  generateRLanguage() {
    let idx = 0;
    // Stem
    for (let i = 0; i < 200 && idx < this.NUM_POINTS; i++) {
      let p = this.points[idx++];
      p.tx = -40 + (Math.random()-0.5)*20;
      p.ty = -100 + Math.random()*200;
      p.tz = (Math.random()-0.5)*20;
      p.tr = 39; p.tg = 105; p.tb = 192;
    }
    // Top Loop
    for (let i = 0; i < 300 && idx < this.NUM_POINTS; i++) {
      let p = this.points[idx++];
      let angle = -Math.PI/2 + Math.random() * Math.PI;
      let r = 50 + (Math.random()-0.5)*20;
      p.tx = -40 + Math.cos(angle)*r;
      p.ty = -50 + Math.sin(angle)*r;
      p.tz = (Math.random()-0.5)*20;
      p.tr = 39; p.tg = 105; p.tb = 192;
    }
    // Diagonal leg
    for (let i = 0; i < 229 && idx < this.NUM_POINTS; i++) {
      let p = this.points[idx++];
      let t = Math.random();
      p.tx = -20 + t * 70 + (Math.random()-0.5)*20;
      p.ty = 0 + t * 100 + (Math.random()-0.5)*20;
      p.tz = (Math.random()-0.5)*20;
      p.tr = 39; p.tg = 105; p.tb = 192;
    }
  }

  generateSQL() {
    for (let i = 0; i < this.NUM_POINTS; i++) {
      let p = this.points[i];
      let t = i / this.NUM_POINTS;
      let cyl = Math.floor(t * 3);
      let yBase = -80 + cyl * 70;
      
      let isCap = Math.random() > 0.6;
      let angle = Math.random() * Math.PI * 2;
      let r = 80;
      if (isCap) {
        r = Math.random() * 80;
        p.ty = yBase - 25; 
      } else {
        p.ty = yBase - 25 + Math.random() * 50; 
      }
      p.tx = Math.cos(angle) * r;
      p.tz = Math.sin(angle) * r;
      p.tr = 51; p.tg = 103; p.tb = 145; // Postgres Blue
    }
  }

  generateWeb() {
    for (let i = 0; i < this.NUM_POINTS; i++) {
      let p = this.points[i];
      let isLeft = i < this.NUM_POINTS / 2;
      let t = (i % (this.NUM_POINTS/2)) / (this.NUM_POINTS/2);
      
      let y = -80 + t * 160;
      let xOffset = 50 - Math.abs(y) * 0.6; 
      
      if (isLeft) {
        p.tx = -60 - xOffset + (Math.random()-0.5)*20;
      } else {
        p.tx = 60 + xOffset + (Math.random()-0.5)*20;
      }
      p.ty = y + (Math.random()-0.5)*20;
      p.tz = (Math.random()-0.5)*20;
      
      let rnd = Math.random();
      if (rnd < 0.33) { p.tr = 227; p.tg = 79; p.tb = 38; } // HTML Orange
      else if (rnd < 0.66) { p.tr = 38; p.tg = 77; p.tb = 228; } // CSS Blue
      else { p.tr = 247; p.tg = 223; p.tb = 30; } // JS Yellow
    }
  }

  generateML() {
    const nodes = [
      {x: -80, y: -60, z: 0}, {x: -80, y: 0, z: 0}, {x: -80, y: 60, z: 0},
      {x: 0, y: -90, z: 0}, {x: 0, y: -30, z: 0}, {x: 0, y: 30, z: 0}, {x: 0, y: 90, z: 0},
      {x: 80, y: -60, z: 0}, {x: 80, y: 0, z: 0}, {x: 80, y: 60, z: 0}
    ];
    let idx = 0;
    // Nodes
    for (let i = 0; i < 300 && idx < this.NUM_POINTS; i++) {
      let p = this.points[idx++];
      let node = nodes[i % nodes.length];
      let r = 18;
      let theta = Math.random() * Math.PI * 2;
      let phi = Math.random() * Math.PI;
      p.tx = node.x + Math.sin(phi)*Math.cos(theta)*r;
      p.ty = node.y + Math.cos(phi)*r;
      p.tz = node.z + Math.sin(phi)*Math.sin(theta)*r;
      p.tr = 255; p.tg = 80; p.tb = 100; // Red nodes
    }
    // Lines
    for (; idx < this.NUM_POINTS; idx++) {
      let p = this.points[idx];
      let startLayer = Math.random() > 0.5 ? 0 : 1;
      let startNodes = startLayer === 0 ? nodes.slice(0,3) : nodes.slice(3,7);
      let endNodes = startLayer === 0 ? nodes.slice(3,7) : nodes.slice(7,10);
      let start = startNodes[Math.floor(Math.random()*startNodes.length)];
      let end = endNodes[Math.floor(Math.random()*endNodes.length)];
      let t = Math.random();
      p.tx = start.x + (end.x - start.x) * t + (Math.random()-0.5)*8;
      p.ty = start.y + (end.y - start.y) * t + (Math.random()-0.5)*8;
      p.tz = start.z + (end.z - start.z) * t + (Math.random()-0.5)*8;
      p.tr = 180; p.tg = 180; p.tb = 255; // Blue lines
    }
  }

  generateDataViz() {
    let bars = [40, 100, 70, 130];
    let barWidth = 35;
    let gap = 20;
    let totalW = (bars.length * barWidth) + ((bars.length - 1) * gap);
    let startX = -totalW / 2 + barWidth / 2;
    
    for (let i = 0; i < this.NUM_POINTS; i++) {
      let p = this.points[i];
      let barIdx = i % bars.length;
      let h = bars[barIdx];
      
      let bx = startX + barIdx * (barWidth + gap);
      p.tx = bx + (Math.random()-0.5) * barWidth;
      p.ty = 80 - Math.random() * h * 1.5; 
      p.tz = (Math.random()-0.5) * barWidth;
      
      if (barIdx===0) { p.tr = 255; p.tg = 99; p.tb = 132; }
      else if (barIdx===1) { p.tr = 54; p.tg = 162; p.tb = 235; }
      else if (barIdx===2) { p.tr = 255; p.tg = 206; p.tb = 86; }
      else { p.tr = 75; p.tg = 192; p.tb = 192; }
    }
  }

  _tick() {
    const { ctx, W, H } = this;
    ctx.clearRect(0, 0, W, H);

    // Auto rotate
    this.angleY += 0.002;
    this.angleX = Math.sin(Date.now() * 0.001) * 0.1; // slight nod

    const focalLength = 300;
    const cosY = Math.cos(this.angleY);
    const sinY = Math.sin(this.angleY);
    const cosX = Math.cos(this.angleX);
    const sinX = Math.sin(this.angleX);

    // Sort points by Z to draw back-to-front
    const projected = [];

    for (let p of this.points) {
      // Lerp to target
      p.x += (p.tx - p.x) * 0.04;
      p.y += (p.ty - p.y) * 0.04;
      p.z += (p.tz - p.z) * 0.04;
      p.r += (p.tr - p.r) * 0.04;
      p.g += (p.tg - p.g) * 0.04;
      p.b += (p.tb - p.b) * 0.04;

      // Rotate Y
      let rz = p.z * cosY - p.x * sinY;
      let rx = p.z * sinY + p.x * cosY;
      let ry = p.y;

      // Rotate X
      let finalY = ry * cosX - rz * sinX;
      let finalZ = ry * sinX + rz * cosX;
      let finalX = rx;

      // Project
      const scale = focalLength / (focalLength + finalZ + 200); // push back a bit
      const px = finalX * scale + W / 2;
      const py = finalY * scale + H / 2;

      projected.push({
        x: px, y: py, z: finalZ,
        r: Math.round(p.r), g: Math.round(p.g), b: Math.round(p.b),
        scale: scale,
        char: p.char
      });
    }

    projected.sort((a, b) => b.z - a.z);

    // Draw
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let p of projected) {
      ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;
      ctx.globalAlpha = Math.min(1, Math.max(0.1, p.scale * 1.5));
      ctx.fillText(p.char, p.x, p.y);
    }

    requestAnimationFrame(() => this._tick());
  }
}

const canvas3D = document.getElementById('hero-3d-canvas');
if (canvas3D) {
  const dither3D = new Dither3D(canvas3D);
  const btnNext = document.getElementById('btn-next-3d');
  const btnPrev = document.getElementById('btn-prev-3d');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      dither3D.setShape(dither3D.shapeIndex + 1);
    });
  }
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      dither3D.setShape(dither3D.shapeIndex - 1);
    });
  }
}
// ──────────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────────

