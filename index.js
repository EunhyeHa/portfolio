// mainTxt flip
document.addEventListener("DOMContentLoaded", function() {
    class Flip {
        constructor(el) {
            this.el = el;
            this.currentStep = 0;
            this.steps = this.el.querySelectorAll('.step');
        }

        next() {
            const currentStepEl = this.steps[this.currentStep];
            const nextStepNum = (this.currentStep + 1) % this.steps.length;
            const nextStepEl = this.steps[nextStepNum];

            currentStepEl.classList.remove('set');
            currentStepEl.classList.add('down');

            nextStepEl.classList.add('set');
            nextStepEl.classList.remove('down');

            this.currentStep = nextStepNum;
        }
    }

    const flipper = new Flip(document.getElementById('flipper'));
    setInterval(() => flipper.next(), 2000);
});


// project showList
// project1 
document.addEventListener("DOMContentLoaded", function() {
    const pj1 = document.querySelector('.pj1');
    const indexProject1 = document.querySelector('.index-project1');
    const h1 = indexProject1.querySelector('h1');
    const h2 = indexProject1.querySelector('h2');
    const p = indexProject1.querySelector('p');

    function showProject() {
        indexProject1.style.opacity = '1';
        indexProject1.style.visibility = 'visible';

        h1.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        h1.style.opacity = '0';
        h1.style.transform = 'translateX(-30px)';

        h2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        h2.style.opacity = '0';
        h2.style.transform = 'translateY(-10px)';

        p.style.transition = 'opacity 0.2s ease, transform 0.5s ease';
        p.style.opacity = '0';
        p.style.transform = 'translateY(10px)';

        setTimeout(() => {
            h1.style.opacity = '1';
            h1.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            h2.style.opacity = '1';
            h2.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, 100);
    }

    function hideProject() {
        indexProject1.style.opacity = '0';
        indexProject1.style.visibility = 'hidden';

        h1.style.opacity = '0';
        h1.style.transform = 'translateX(-20px)';

        h2.style.opacity = '0';
        h2.style.transform = 'translateY(-20px)';

        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
    }

    pj1.addEventListener('mouseenter', showProject);
    pj1.addEventListener('mouseleave', (event) => {
        if (!indexProject1.contains(event.relatedTarget)) {
            hideProject();
        }
    });
});

// project2 
document.addEventListener("DOMContentLoaded", function() {
    const pj2 = document.querySelector('.pj2');
    const indexProject2 = document.querySelector('.index-project2');
    const h1 = indexProject2.querySelector('h1');
    const h2 = indexProject2.querySelector('h2');
    const p = indexProject2.querySelector('p');

    function showProject() {
        indexProject2.style.opacity = '1';
        indexProject2.style.visibility = 'visible';

        h1.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        h1.style.opacity = '0';
        h1.style.transform = 'translateX(30px)';

        h2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        h2.style.opacity = '0';
        h2.style.transform = 'translateY(-10px)';

        p.style.transition = 'opacity 0.2s ease, transform 0.5s ease';
        p.style.opacity = '0';
        p.style.transform = 'translateX(10px)';

        setTimeout(() => {
            h1.style.opacity = '1';
            h1.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            h2.style.opacity = '1';
            h2.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, 100);
    }

    function hideProject() {
        indexProject2.style.opacity = '0';
        indexProject2.style.visibility = 'hidden';

        h1.style.opacity = '0';
        h1.style.transform = 'translateX(20px)';

        h2.style.opacity = '0';
        h2.style.transform = 'translateY(-20px)';

        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
    }

    pj2.addEventListener('mouseenter', showProject);
    pj2.addEventListener('mouseleave', (event) => {
        if (!indexProject2.contains(event.relatedTarget)) {
            hideProject();
        }
    });
});

// project3 show
document.addEventListener("DOMContentLoaded", function() {
    const pj3 = document.querySelector('.pj3');
    const indexProject3 = document.querySelector('.index-project3');
    const h1 = indexProject3.querySelector('h1');
    const h2 = indexProject3.querySelector('h2');
    const p = indexProject3.querySelector('p');

    function showProject() {
        indexProject3.style.opacity = '1';
        indexProject3.style.visibility = 'visible';

        h1.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        h1.style.opacity = '0';
        h1.style.transform = 'translateX(-30px)';

        h2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        h2.style.opacity = '0';
        h2.style.transform = 'translateY(-10px)';

        p.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        p.style.opacity = '0';
        p.style.transform = 'translateY(10px)';

        setTimeout(() => {
            h1.style.opacity = '1';
            h1.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            h2.style.opacity = '1';
            h2.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, 100);
    }

    function hideProject() {
        indexProject3.style.opacity = '0';
        indexProject3.style.visibility = 'hidden';

        h1.style.opacity = '0';
        h1.style.transform = 'translateX(-20px)';

        h2.style.opacity = '0';
        h2.style.transform = 'translateY(-20px)';

        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
    }

    pj3.addEventListener('mouseenter', showProject);
    pj3.addEventListener('mouseleave', (event) => {
        if (!indexProject3.contains(event.relatedTarget)) {
            hideProject();
        }
    });
});

// project4 show
document.addEventListener("DOMContentLoaded", function() {
    const pj4 = document.querySelector('.pj4');
    const indexProject4 = document.querySelector('.index-project4');
    const h1 = indexProject4.querySelector('h1');
    const h2 = indexProject4.querySelector('h2');
    const p = indexProject4.querySelector('p');

    function showProject() {
        indexProject4.style.opacity = '1';
        indexProject4.style.visibility = 'visible';

        h1.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        h1.style.opacity = '0';
        h1.style.transform = 'translateX(30px)';

        h2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        h2.style.opacity = '0';
        h2.style.transform = 'translateY(-10px)';

        p.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        p.style.opacity = '0';
        p.style.transform = 'translateX(-10px)';

        setTimeout(() => {
            h1.style.opacity = '1';
            h1.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            h2.style.opacity = '1';
            h2.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, 100);
    }

    function hideProject() {
        indexProject4.style.opacity = '0';
        indexProject4.style.visibility = 'hidden';

        h1.style.opacity = '0';
        h1.style.transform = 'translateX(20px)';

        h2.style.opacity = '0';
        h2.style.transform = 'translateY(-20px)';

        p.style.opacity = '0';
        p.style.transform = 'translateX(10px)';
    }

    pj4.addEventListener('mouseenter', showProject);
    pj4.addEventListener('mouseleave', (event) => {
        if (!indexProject4.contains(event.relatedTarget)) {
            hideProject();
        }
    });
});

// project5 show = project2 
document.addEventListener("DOMContentLoaded", function() {
    const pj5 = document.querySelector('.pj5');
    const indexProject5 = document.querySelector('.index-project5');
    const h1 = indexProject5.querySelector('h1');
    const h2 = indexProject5.querySelector('h2');
    const p = indexProject5.querySelector('p');

    function showProject() {
        indexProject5.style.opacity = '1';
        indexProject5.style.visibility = 'visible';

        h1.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        h1.style.opacity = '0';
        h1.style.transform = 'translateX(30px)';

        h2.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        h2.style.opacity = '0';
        h2.style.transform = 'translateY(-10px)';

        p.style.transition = 'opacity 0.2s ease, transform 0.5s ease';
        p.style.opacity = '0';
        p.style.transform = 'translateX(10px)';

        setTimeout(() => {
            h1.style.opacity = '1';
            h1.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            h2.style.opacity = '1';
            h2.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
        }, 100);
    }

    function hideProject() {
        indexProject5.style.opacity = '0';
        indexProject5.style.visibility = 'hidden';

        h1.style.opacity = '0';
        h1.style.transform = 'translateX(20px)';

        h2.style.opacity = '0';
        h2.style.transform = 'translateY(-20px)';

        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
    }

    pj5.addEventListener('mouseenter', showProject);
    pj5.addEventListener('mouseleave', (event) => {
        if (!indexProject5.contains(event.relatedTarget)) {
            hideProject();
        }
    });
});

// fluid displacement — video + .index-txt (desktop / fine pointer only)
document.addEventListener("DOMContentLoaded", function () {
    const layer = document.getElementById("fluidLayer");
    const txtEl = layer ? layer.querySelector(".index-txt") : null;
    const mapEl = document.getElementById("fluidMap");
    const scaleEl = document.getElementById("fluidScale");
    const lightEl = document.getElementById("fluidCaustic");
    const lightInEl = document.getElementById("fluidCausticIn");
    if (!layer || !mapEl || !txtEl) {
        return;
    }

    // tune here — baseline * 3 on DISPLACE_SCALE only (was 12)
    // 굴절 정도 조절 
    const DISPLACE_SCALE = 70;
    const VELOCITY_MULT = 22;
    const TRAIL_STRENGTH = 1;
    const TRAIL_LEN = 14;
    const DECAY_SEC = 1.4;
    const MAP = 256;
    const MOBILE_MAX = 768;
    const NEUTRAL = 128;
    const MIN_SPEED = 0.004;
    const MAX_SPEED = 1.6;
    const CHANNEL_MAG = 36;
    const CHANNEL_CLAMP = 80;
    const STROKE_ALONG = 9;
    const STROKE_ALONG_VEL = 26;
    const STROKE_ACROSS = 3.5;
    const STROKE_ACROSS_VEL = 2.2;
    const LIGHT_OPACITY = 0.85;
    const LIGHT_IDLE_OPACITY = 0.18;
    const LIGHT_IN_OPACITY = 0.32;

    // 기본 굴절률
    const IDLE_STRENGTH = 3;
    const IDLE_SPEED = 1.8;

    const canvas = document.createElement("canvas");
    canvas.width = MAP;
    canvas.height = MAP;
    const ctx = canvas.getContext("2d", { alpha: false }) || canvas.getContext("2d");
    if (!ctx) {
        return;
    }

    const trail = [];
    const mouse = {
        x: 0.5,
        y: 0.5,
        vx: 0,
        vy: 0,
        moving: false,
        lightLife: 0
    };

    let rafId = 0;
    let running = false;
    let lastTime = 0;
    let idleAt = 0;

    function isEffectEnabled() {
        if (window.innerWidth <= MOBILE_MAX) {
            return false;
        }
        if (!window.matchMedia("(pointer: fine)").matches) {
            return false;
        }
        return true;
    }

    function clearMap() {
        ctx.globalAlpha = 1;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = "rgb(" + NEUTRAL + "," + NEUTRAL + "," + NEUTRAL + ")";
        ctx.fillRect(0, 0, MAP, MAP);
    }

    function pushMap() {
        const url = canvas.toDataURL("image/png");
        mapEl.setAttribute("href", url);
        mapEl.setAttributeNS("http://www.w3.org/1999/xlink", "href", url);
    }

    function drawIdle(t) {
        const mag = CHANNEL_MAG * IDLE_STRENGTH;
        const blobs = [
            { x: 0.42, y: 0.64, f: 0.55, p: 0.0, a: 0.5 },
            { x: 0.54, y: 0.68, f: 0.37, p: 1.8, a: -0.8 },
            { x: 0.63, y: 0.28, f: 0.46, p: 3.2, a: 1.1 }
        ];
        const time = t * IDLE_SPEED;
        for (let i = 0; i < blobs.length; i += 1) {
            const b = blobs[i];
            const wobble = 0.62 + 0.38 * Math.sin(time * b.f * 1.25 + b.p);
            const ox = Math.sin(time * b.f + b.p) * 22;
            const oy = Math.cos(time * b.f * 0.82 + b.p) * 16;
            const ang = b.a + Math.sin(time * 0.22 + b.p) * 0.45;
            const dr = Math.max(-CHANNEL_CLAMP, Math.min(CHANNEL_CLAMP, Math.round(Math.cos(ang) * mag * wobble)));
            const dg = Math.max(-CHANNEL_CLAMP, Math.min(CHANNEL_CLAMP, Math.round(Math.sin(ang) * mag * wobble)));
            ctx.save();
            ctx.translate(b.x * MAP + ox, b.y * MAP + oy);
            ctx.rotate(ang);
            ctx.globalAlpha = 0.28 + 0.16 * wobble;
            ctx.fillStyle = "rgb(" + (NEUTRAL + dr) + "," + (NEUTRAL + dg) + "," + NEUTRAL + ")";
            ctx.beginPath();
            ctx.ellipse(0, 0, 26 + 8 * wobble, 16 + 4 * wobble, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function drawTrail(t) {
        clearMap();
        drawIdle(t || 0);
        for (let i = trail.length - 1; i >= 0; i -= 1) {
            const p = trail[i];
            if (p.life <= 0) {
                continue;
            }
            const speed = Math.min(MAX_SPEED, Math.sqrt(p.vx * p.vx + p.vy * p.vy));
            const ang = Math.atan2(p.vy, p.vx);
            const along = (STROKE_ALONG + speed * STROKE_ALONG_VEL) * p.life;
            const across = (STROKE_ACROSS + speed * STROKE_ACROSS_VEL) * p.life;
            const mag = CHANNEL_MAG * p.amp * TRAIL_STRENGTH * p.life;
            const dr = Math.max(-CHANNEL_CLAMP, Math.min(CHANNEL_CLAMP, Math.round(Math.cos(ang) * mag)));
            const dg = Math.max(-CHANNEL_CLAMP, Math.min(CHANNEL_CLAMP, Math.round(Math.sin(ang) * mag)));

            ctx.save();
            ctx.translate(p.x * MAP, p.y * MAP);
            ctx.rotate(ang);
            ctx.globalAlpha = 0.42 * p.life;
            ctx.fillStyle = "rgb(" + (NEUTRAL + dr) + "," + (NEUTRAL + dg) + "," + NEUTRAL + ")";
            ctx.beginPath();
            ctx.ellipse(0, 0, along, across, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        pushMap();
    }

    function applyCaustic(el, x, y, opacity) {
        if (!el) {
            return;
        }
        el.style.opacity = String(Math.max(0, Math.min(1, opacity)));
        el.style.transform = "translate(" + x + "px, " + y + "px)";
    }

    function syncLight() {
        const x = mouse.x * window.innerWidth;
        const y = mouse.y * window.innerHeight;
        const glow = LIGHT_IDLE_OPACITY + (LIGHT_OPACITY - LIGHT_IDLE_OPACITY) * mouse.lightLife;
        if (!running) {
            applyCaustic(lightEl, x, y, 0);
            applyCaustic(lightInEl, x, y, 0);
            return;
        }
        applyCaustic(lightEl, x, y, glow);
        applyCaustic(lightInEl, x, y, glow * LIGHT_IN_OPACITY);
    }

    function tick(now) {
        if (!running) {
            return;
        }
        const t = now * 0.001;
        const dt = lastTime ? Math.min(0.05, t - lastTime) : 0.016;
        lastTime = t;

        let alive = false;
        for (let i = 0; i < trail.length; i += 1) {
            trail[i].life -= dt / DECAY_SEC;
            if (trail[i].life > 0) {
                alive = true;
            }
        }
        while (trail.length && trail[trail.length - 1].life <= 0) {
            trail.pop();
        }

        if (mouse.lightLife > 0 && !mouse.moving) {
            mouse.lightLife = Math.max(0, mouse.lightLife - dt / DECAY_SEC);
        }

        drawTrail(t);
        syncLight();
        rafId = requestAnimationFrame(tick);
    }

    function onMouseMove(event) {
        if (!running) {
            return;
        }
        const nx = event.clientX / Math.max(1, window.innerWidth);
        const ny = event.clientY / Math.max(1, window.innerHeight);
        mouse.vx = (nx - mouse.x) * VELOCITY_MULT;
        mouse.vy = (ny - mouse.y) * VELOCITY_MULT;
        mouse.x = nx;
        mouse.y = ny;
        mouse.moving = true;
        idleAt = performance.now() * 0.001;

        const speed = Math.min(MAX_SPEED, Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy));
        mouse.lightLife = Math.max(mouse.lightLife, Math.min(1, 0.35 + speed * 0.5));
        syncLight();

        if (speed < MIN_SPEED) {
            if (running && !rafId) {
                lastTime = 0;
                rafId = requestAnimationFrame(tick);
            }
            return;
        }

        trail.unshift({
            x: nx,
            y: ny,
            vx: mouse.vx,
            vy: mouse.vy,
            amp: Math.max(0.18, speed),
            life: 1
        });
        if (trail.length > TRAIL_LEN) {
            trail.length = TRAIL_LEN;
        }
        if (running && !rafId) {
            lastTime = 0;
            rafId = requestAnimationFrame(tick);
        }
    }

    function onMouseIdle() {
        mouse.moving = false;
        idleAt = performance.now() * 0.001;
    }

    function start() {
        if (running) {
            return;
        }
        running = true;
        lastTime = 0;
        if (scaleEl) {
            scaleEl.setAttribute("scale", String(DISPLACE_SCALE));
        }
        clearMap();
        pushMap();
        txtEl.classList.add("is-on");
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseleave", onMouseIdle);
        rafId = requestAnimationFrame(tick);
    }

    function stop() {
        running = false;
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseIdle);
        trail.length = 0;
        mouse.lightLife = 0;
        txtEl.classList.remove("is-on");
        clearMap();
        pushMap();
        syncLight();
    }

    function syncMode() {
        if (isEffectEnabled()) {
            start();
        } else {
            stop();
        }
    }

    let idleTimer = 0;
    window.addEventListener("mousemove", function () {
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(onMouseIdle, 80);
    }, { passive: true });

    syncMode();
    requestAnimationFrame(syncMode);
    window.addEventListener("resize", syncMode);
    if (window.matchMedia("(pointer: fine)").addEventListener) {
        window.matchMedia("(pointer: fine)").addEventListener("change", syncMode);
        window.matchMedia("(min-width: 769px)").addEventListener("change", syncMode);
    }
});