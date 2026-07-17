document.addEventListener("DOMContentLoaded", function () {
    let menuLink = document.getElementById("menuToggle");
    let menuMain = document.querySelector(".menu-main");
    let menuSide = document.querySelector(".menu-side");
    let frameEffect = document.getElementById("frameEffect");
    let logo = document.querySelector(".menu-logo img");
    const hiddenToggle = document.querySelector('.menu-main');

    const imagePaths = {
        mpj1: "./assets/images/global/menu-pj1-img.png",
        mpj2: "./assets/images/global/menu-pj2-img.jpg",
        mpj3: "./assets/images/global/menu-pj3-img.jpg",
        mpj4: "./assets/images/global/menu-pj4-img.jpg",
        mpj5: "./assets/images/global/menu-pj5-img.jpg"
    };

    let currentImageClass = '';

    // 이미지 표시 레이어 추가
    const imageLayer = document.createElement('img');
    imageLayer.style.position = 'absolute';
    imageLayer.style.top = '10%';
    imageLayer.style.left = '30%';
    imageLayer.style.width = '40%';
    imageLayer.style.height = '80%';
    imageLayer.style.objectFit = 'cover';
    imageLayer.style.borderRadius = '10px';
    imageLayer.style.opacity = '0'; // 기본적으로 보이지 않음
    imageLayer.style.transition = 'opacity 0.3s ease-in-out';
    imageLayer.style.zIndex = '9992';
    frameEffect.appendChild(imageLayer);

    menuLink.innerHTML = '<span class="front">menu</span><span class="back">close</span>';

    menuLink.addEventListener("click", function (e) {
        e.preventDefault();
        const isFlipped = menuLink.classList.toggle("flipped");
        menuMain.classList.toggle("visible", isFlipped);
        menuSide.classList.toggle("visible", isFlipped);
        frameEffect.classList.toggle("visible", isFlipped);

        const githubLink = document.querySelector('.menu-item1 a');
        githubLink.style.color = isFlipped ? '#fff' : '';
        githubLink.style.backgroundColor = isFlipped ? 'rgba(128, 128, 128, 0.5)' : '';
        githubLink.style.borderRadius = '30px';

        logo.src = isFlipped ? './assets/images/global/logo.png' : './assets/images/global/logo-b.png';

        const mailLink = document.querySelector('.menu-item2 a img');
        mailLink.src = isFlipped ? './assets/images/global/icon-mail-w.png' : './assets/images/global/icon-mail-b.png';
        const mailLinkParent = mailLink.parentElement;
        mailLinkParent.style.backgroundColor = isFlipped ? 'rgba(128, 128, 128, 0.5)' : '';
        mailLinkParent.style.borderRadius = '30px';
    });

    document.querySelectorAll('.menu-inner2 ul li:not(.works)').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const id = this.classList[0];
            const imagePath = imagePaths[id];
            if (imagePath && currentImageClass !== id) {
                imageLayer.src = imagePath;
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