document.addEventListener("DOMContentLoaded", function () {
    let menuLink = document.getElementById("menuToggle");
    let menuMain = document.querySelector(".menu-main");
    let menuSide = document.querySelector(".menu-side");
    let frameEffect = document.getElementById("frameEffect");
    let logo = document.querySelector(".menu-logo img");
    const hiddenToggle = document.querySelector('.menu-main');

    // 이미지 경로 설정
    const imagePaths = {
        mpj1: "../assets/images/global/menu-pj1-img.png",
        mpj2: "../assets/images/global/menu-pj2-img.jpg",
        mpj3: "../assets/images/global/menu-pj3-img.jpg",
        mpj4: "../assets/images/global/menu-pj4-img.jpg",
        mpj5: "../assets/images/global/menu-pj5-img.jpg"
    };

    let currentImageClass = ''; // 현재 로드된 이미지 클래스

    menuLink.innerHTML = '<span class="front">menu</span><span class="back">close</span>';

    // 메뉴 링크 클릭 이벤트 처리
    menuLink.addEventListener("click", function (event) {
        event.preventDefault();
        const isFlipped = menuLink.classList.toggle("flipped");
        menuMain.classList.toggle("visible", isFlipped);
        menuSide.classList.toggle("visible", isFlipped);
        frameEffect.classList.toggle("visible", isFlipped);

        // GitHub 링크 색상 및 배경색 변경
        const githubLink = document.querySelector('.menu-item1 a');
        githubLink.style.color = isFlipped ? '#fff' : '';
        githubLink.style.backgroundColor = isFlipped ? 'rgba(128, 128, 128, 0.5)' : '';
        githubLink.style.borderRadius = '30px'; 

        logo.src = isFlipped ? '../assets/images/global/logo.png' : '../assets/images/global/logo-b.png';

        // Mail 아이콘 이미지 및 스타일 변경
        const mailLink = document.querySelector('.menu-item2 a img');
        mailLink.src = isFlipped ? '../assets/images/global/icon-mail-w.png' : '../assets/images/global/icon-mail-b.png';
        const mailLinkParent = mailLink.parentElement;
        mailLinkParent.style.backgroundColor = isFlipped ? 'rgba(128, 128, 128, 0.5)' : '';
        mailLinkParent.style.borderRadius = '30px'; 
    });

    // GitHub 링크에 마우스 호버 시 스타일 변경
    const githubLink = document.querySelector('.menu-item1 a');
    githubLink.addEventListener('mouseenter', function() {
        if (hiddenToggle.classList.contains('visible')) { 
            this.style.border = 'var(--color-w) 1px solid';
            this.style.backgroundColor = 'transparent';
        }
    });

    githubLink.addEventListener('mouseleave', function() {
        if (hiddenToggle.classList.contains('visible')) { 
            this.style.border = 'rgba(128, 128, 128, 0.1) solid 1px';
            this.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
        }
    });

    // Mail 링크에 마우스 호버 시 스타일 변경
    const mailLinkParent = document.querySelector('.menu-item2 a');
    mailLinkParent.addEventListener('mouseenter', function() {
        if (hiddenToggle.classList.contains('visible')) { 
            this.style.border = 'var(--color-w) 1px solid';
            this.style.backgroundColor = 'transparent';
        }
    });

    mailLinkParent.addEventListener('mouseleave', function() {
        if (hiddenToggle.classList.contains('visible')) { 
            this.style.border = 'rgba(128, 128, 128, 0.1) solid 1px';
            this.style.backgroundColor = 'rgba(128, 128, 128, 0.5)';
        }
    });

    // 이미지 표시 레이어 추가
    const imageLayer = document.createElement('img');
    imageLayer.style.position = 'absolute';
    imageLayer.style.top = '10%';
    imageLayer.style.left = '30%';
    imageLayer.style.width = '40%';
    imageLayer.style.height = '80%';
    imageLayer.style.objectFit = 'cover';
    imageLayer.style.borderRadius = '10px';
    imageLayer.style.opacity = '0';
    imageLayer.style.transition = 'opacity 0.3s ease-in-out';
    imageLayer.style.zIndex = '9992';
    frameEffect.appendChild(imageLayer);

    // 메뉴 항목에 마우스 호버 이벤트 처리
    document.querySelectorAll('.menu-inner2 ul li:not(.works)').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const id = this.classList[0];
            const imagePath = imagePaths[id];
            if (imagePath && currentImageClass !== id) {
                imageLayer.src = imagePath;  // 이미지 경로 업데이트
                imageLayer.style.opacity = '1'; // 이미지 표시
                currentImageClass = id;
            }
        });
        item.addEventListener('mouseleave', function() {
            if (currentImageClass === this.classList[0]) {
                imageLayer.style.opacity = '0'; // 이미지 숨김
                currentImageClass = '';
            }
        });
    });
});



    // menu-inner1-underline hover
    const menuItems = document.querySelectorAll('.hover-underline-menu li');
    menuItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            menuItems.forEach(i => {
                if (i !== item) {
                    i.querySelector('a').classList.add('gray-text');
                }
            });
        });
        item.addEventListener('mouseout', () => {
            menuItems.forEach(i => {
                i.querySelector('a').classList.remove('gray-text');
            });
        });
    });
