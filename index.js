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