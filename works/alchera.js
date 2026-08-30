// overview highlight
document.addEventListener('DOMContentLoaded', function() {
    const target = document.querySelector('.highlight');

    if (target) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(target);
    }
});

// ader-main 스크롤 — desktop only
document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('.ader-main');
    if (!main) {
        return;
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 768px)');
    let ticking = false;

    function clamp(n, a, b) {
        return Math.max(a, Math.min(b, n));
    }

    function isStatic() {
        return reduce.matches || mobile.matches;
    }

    function apply(fg, bg) {
        main.style.setProperty('--main-fg', fg.toFixed(4));
        main.style.setProperty('--main-bg', bg.toFixed(4));
    }

    function update() {
        ticking = false;
        if (isStatic()) {
            apply(0, 0);
            return;
        }
        const rect = main.getBoundingClientRect();
        const track = Math.max(1, main.offsetHeight - window.innerHeight);
        const p = clamp(-rect.top / track, 0, 1);
        const fg = clamp(p * 1.2, 0, 1);
        const bg = p * p * (3 - 2 * p);
        apply(fg, bg);
    }

    function onScroll() {
        if (ticking) {
            return;
        }
        ticking = true;
        requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    if (reduce.addEventListener) {
        reduce.addEventListener('change', update);
        mobile.addEventListener('change', update);
    }
    update();
});

// 첫 스크롤부터 비디오 재생
document.addEventListener('DOMContentLoaded', function () {
    const video = document.querySelector('.main-content video');
    if (!video) {
        return;
    }
    video.pause();

    function startVideo() {
        const play = video.play();
        if (play && play.catch) {
            play.catch(function () {});
        }
        window.removeEventListener('scroll', startVideo);
        window.removeEventListener('wheel', startVideo);
        window.removeEventListener('touchmove', startVideo);
    }

    window.addEventListener('scroll', startVideo, { passive: true });
    window.addEventListener('wheel', startVideo, { passive: true });
    window.addEventListener('touchmove', startVideo, { passive: true });
});

// Video hover circle + link (desktop)
document.addEventListener('DOMContentLoaded', function () {
    const link = document.querySelector('.main-video-link');
    const cursor = document.querySelector('.main-video-cursor');
    if (!link || !cursor) {
        return;
    }
    if (window.matchMedia('(pointer: coarse)').matches) {
        return;
    }

    function move(event) {
        cursor.style.left = event.clientX + 'px';
        cursor.style.top = event.clientY + 'px';
    }

    link.addEventListener('mouseenter', function () {
        cursor.classList.add('is-on');
    });
    link.addEventListener('mouseleave', function () {
        cursor.classList.remove('is-on');
    });
    link.addEventListener('mousemove', move);
});


// Next Project Slide
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.pj-title');
    const originalText = container.textContent.trim(); // 원본 텍스트
    const containerWidth = container.offsetWidth;

    // 텍스트 복제 및 채우기
    while (container.scrollWidth < containerWidth * 30) {
        const clone = document.createElement('span');
        clone.textContent = `${originalText}`;
        clone.style.marginLeft = '50px'; // 텍스트 간격
        container.appendChild(clone);
    }

    let position = 0;

    // 애니메이션 함수
    function animate() {
        position -= 1; // 이동 속도
        container.style.transform = `translateX(${position}px)`;

        // 텍스트가 화면을 벗어나면 위치 초기화
        if (Math.abs(position) >= container.scrollWidth / 2) {
            position = 0;
        }
        requestAnimationFrame(animate);
    }
    animate();
});


// back to top
// let BTT = $('.back-to-top');

// BTT.click(function(e){
//     e.preventDefault();
//     $('html, body').animate({
//         scrollTop: 0
//     }, 1000);
// });