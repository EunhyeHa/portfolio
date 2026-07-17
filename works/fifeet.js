const identity = document.querySelector('.identity');
const slides = document.querySelectorAll('.identity > div');
let slideCount = slides.length;
let slideWidth = slides[0].offsetWidth;

// 반복
const slideOrder = ['concept', 'icon', 'logo', 'insta', 'concept', 'icon', 'logo', 'insta', 'concept', 'icon', 'logo', 'insta'];

// 슬라이드를 반복해서 순차적으로 나열하는 함수
function reorderSlides() {
    identity.innerHTML = ''; // 기존의 콘텐츠 삭제
    slideOrder.forEach((type) => {
        const div = document.createElement('div');
        div.classList.add(type);

        // 각 타입에 맞는 콘텐츠 추가
        if (type === 'concept') {
            div.innerHTML = `<video src="../assets/images/works/fifeet/design_concept.mp4" muted autoplay loop></video>`;
        } else if (type === 'icon') {
            div.innerHTML = `<img src="../assets/images/works/fifeet/design_icon.jpg" alt="design_icon">`;
        } else if (type === 'logo') {
            div.innerHTML = `<video src="../assets/images/works/fifeet/design_logo.mp4" muted autoplay loop></video>`;
        } else if (type === 'insta') {
            div.innerHTML = `<img src="../assets/images/works/fifeet/design_insta.jpg" alt="design_insta">`;
        }
        identity.appendChild(div);
    });
}

// 비디오 요소 재생을 강제로 시작하는 함수
function playVideo() {
    const videos = identity.querySelectorAll('video');
    videos.forEach((video) => {
        // 비디오가 pause 상태일 경우, play() 호출
        if (video.paused) {
            video.play();
        }
    });
}

// 슬라이드 이동 함수
function slide() {
    identity.style.transform = `translateX(-${slideWidth}px)`;
    // identity.style.transition = 'transform 3s ease-in-out';

    setTimeout(() => {
        const firstSlide = identity.querySelector('.concept');
        identity.appendChild(firstSlide);

        identity.style.transition = 'none';
        identity.style.transform = `translateX(0)`;

        // 비디오 재생 강제 시작
        playVideo();

        setTimeout(() => {
            identity.style.transition = 'transform 3s ease-in-out';
        }, 10);
    }, 0);
}

// 슬라이드를 처음에 순차적으로 준비
reorderSlides();