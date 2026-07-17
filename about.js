// title-imgSlide
let slideContainer = $('.main-title .container');
let slide = slideContainer.find('.slide');
let slideCount = slide.length;
let currentIdx = 0;

slide.eq(currentIdx).addClass('show');
setInterval(showNextSlide, 2000);

function showNextSlide(){
    let nextIdx = (currentIdx + 1)%slideCount;
    slide.eq(currentIdx).removeClass('show');
    slide.eq(nextIdx).addClass('show');
    currentIdx = nextIdx;
}


// intro-scollEvent
document.addEventListener('DOMContentLoaded', function () {
    const images = [
        './assets/images/about/intro_6.jpeg',
        './assets/images/about/intro_5.jpeg',
        './assets/images/about/intro_4.jpeg',
        './assets/images/about/intro_3.jpeg',
        './assets/images/about/intro_2.jpeg',
        './assets/images/about/intro_1.jpeg'
    ];

    const imgWrapper = document.querySelector('#txt-img');

    // 이미지 초기 설정
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.style.opacity = index === 0 ? '1' : '0'; // 첫 번째 이미지만 보이도록
        imgWrapper.appendChild(img);
    });

    const imgElements = imgWrapper.querySelectorAll('img');
    let currentIndex = 0;

    // 이미지 전환
    function changeImage() {
        const currentImage = imgElements[currentIndex];
        const nextIndex = (currentIndex + 1) % images.length;
        const nextImage = imgElements[nextIndex];

        // 페이드 효과
        currentImage.style.opacity = '0'; // 현재 이미지 페이드아웃
        nextImage.style.opacity = '1'; // 다음 이미지 페이드인

        currentIndex = nextIndex; // 인덱스 업데이트
    }

    // GSAP ScrollTrigger로 이미지 전환 제어
    gsap.registerPlugin(ScrollTrigger);
    gsap.to({}, {
        scrollTrigger: {
            trigger: '.about-intro',
            start: 'top center',
            end: '10%',
            scrub: true,
            markers : false,
            onUpdate: (self) => {
                const progress = self.progress * images.length;
                const newIndex = Math.floor(progress); // 현재 인덱스 계산
                if (newIndex !== currentIndex) {
                    changeImage();
                }
            }
        }
    });

    // 텍스트 슬라이드
    const txtWordPs = document.querySelectorAll('.txt-word p');
    txtWordPs.forEach((p, index) => {
        gsap.fromTo(p,
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0,  // 스크롤하면서 opacity가 1로, y축 이동
                duration: 1,  // 전환 시간
                scrollTrigger: {
                    trigger: p,
                    start: 'top 60%',  // 화면에서 80%에 도달하면 나타나기 시작
                    end: 'top 50%',    // 화면의 50%에 도달하면 애니메이션 끝
                    scrub: true,
                    markers: false,
                    toggleActions: 'play none none reverse'  // 애니메이션의 동작 설정
                }
            });
    });
});






// career-imgShowup
let careerItems = document.querySelectorAll('.about-career .career-list p');

careerItems.forEach(item => {
    let img = item.querySelector('span img');
    item.addEventListener('mouseover', function() {
        img.classList.add('visible');
    });
});