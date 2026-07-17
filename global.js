document.addEventListener("DOMContentLoaded", function () {
    let menuLink = document.getElementById("menuToggle");
    let menuMain = document.querySelector(".menu-main");
    let menuSide = document.querySelector(".menu-side");
    let frameEffect = document.getElementById("frameEffect");

    // 이미지 경로 설정
    const imagePaths = {
        mpj1: "./assets/images/global/menu-pj1-img.png",
        mpj2: "./assets/images/global/menu-pj2-img.jpg",
        mpj3: "./assets/images/global/menu-pj3-img.jpg",
        mpj4: "./assets/images/global/menu-pj4-img.jpg",
        mpj5: "./assets/images/global/menu-pj5-img.jpg"
    };

    let currentImageClass = ''; // 현재 로드된 이미지 클래스

    // menuLink 내용 변경
    menuLink.innerHTML = '<span class="front">menu</span><span class="back">close</span>';

    // 메뉴 링크 클릭 이벤트 처리
    menuLink.addEventListener("click", function(e){
        e.preventDefault(); 
        menuLink.classList.toggle("flipped");

        if (menuLink.classList.contains("flipped")) {
            menuMain.classList.add("visible");
            menuSide.classList.add("visible");
            frameEffect.classList.add("visible"); // 프레임 보이기
        } else {
            menuMain.classList.remove("visible");
            menuSide.classList.remove("visible");
            frameEffect.classList.remove("visible"); // 프레임 숨기기
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
                imageLayer.src = imagePath;
                imageLayer.style.opacity = '1'; // 이미지 보이기
                currentImageClass = id;
            }
        });

        item.addEventListener('mouseleave', function() {
            imageLayer.style.opacity = '0'; // 이미지 숨기기
            currentImageClass = ''; 
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