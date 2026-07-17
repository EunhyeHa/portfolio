// overview highlight
document.addEventListener('DOMContentLoaded', function() {
    const target = document.querySelector('.highlight');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate'); // 애니메이션 클래스 추가
                }, 300);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(target);
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