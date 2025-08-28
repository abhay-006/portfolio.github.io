// Smooth scrolling for in-page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
        const el = document.querySelector(targetId);
        if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    });
});

// Cursor trail that follows the mouse with a slight lag
(function() {
    const cursor = document.getElementById('cursorTrail');
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
    const speed = 0.14; // lower is snappier, higher is laggier

    window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
    });

    window.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
    });

    // expand on press
    window.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
    cursor.style.background = 'rgba(124,58,237,0.22)';
    });
    window.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'rgba(124,58,237,0.12)';
    });

    function animate() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;
    cursor.style.left = posX + 'px';
    cursor.style.top = posY + 'px';
    requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // hide default cursor on desktop for a nicer effect
    function setCursorVisibility() {
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (!isTouch) document.documentElement.style.cursor = 'none';
    }
    setCursorVisibility();
})();

// Typewriter effect - ADDED
(function(){
    const el = document.getElementById('typewriter');
    if (!el) return;
    const words = ['Competitive Programmer', 'Software Developer', 'AI/ML Enthusiast','Student'];
    let w = 0, l = 0, dir = 1; // dir 1 = typing, 0 = deleting

    // Respect users who prefer reduced motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { el.textContent = words[0]; return; }

    function tick(){
    el.textContent = words[w].slice(0, l);
    if (dir === 1) {
        if (l < words[w].length) { l++; setTimeout(tick, 80); }
        else { dir = 0; setTimeout(tick, 800); }
    } else {
        if (l > 0) { l--; setTimeout(tick, 40); }
        else { dir = 1; w = (w + 1) % words.length; setTimeout(tick, 200); }
    }
    }
    tick();
})();

// Small enhancement: highlight nav button when a section is visible
const sections = document.querySelectorAll('main section[id]');
const navLinks = Array.from(document.querySelectorAll('header nav a'));
function onScroll() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = '#' + sec.id;
    const link = navLinks.find(l => l.getAttribute('href') === id);
    if (!link) return;
    if (scrollPos >= top && scrollPos < top + height) link.classList.add('active');
    else link.classList.remove('active');
    });
}
window.addEventListener('scroll', onScroll);
onScroll();

// 🎨 Added theme-based sprinkle colors
const sprinkleColors = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#FFFFFF"];

document.addEventListener("click", (e) => {
    for (let i = 0; i < 100; i++) {
        const sprinkle = document.createElement("div");
        sprinkle.className = "sprinkle";
        sprinkle.style.left = e.clientX + "px";
        sprinkle.style.top = e.clientY + "px";

        // 🎨 Use theme-based colors instead of random hsl
        sprinkle.style.background = sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)];

        sprinkle.style.setProperty("--dx", (Math.random() - 0.5) * 250 + "px");
        sprinkle.style.setProperty("--dy", (Math.random() - 0.5) * 250 + "px");

        document.body.appendChild(sprinkle);

        sprinkle.addEventListener("animationend", () => sprinkle.remove());
    }
    // ripple
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.body.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
});