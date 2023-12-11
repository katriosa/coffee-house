'use strict';

//burger-menu
const toggleBurgerMenu = () => {
  const btnBurgerMenu = document.querySelector('.btn-burger-menu');
  const linksContainer = document.querySelector('.nav-items')
  const menu = document.querySelector('.menu');
  let isOpenMenu = false;

  const openMenu = () => {
    menu.classList.remove('menu-close');

    btnBurgerMenu.classList.add('active');
    menu.classList.add('menu-open');
  }

  const closeMenu = () => {
    btnBurgerMenu.classList.remove('active');
    menu.classList.remove('menu-open');

    menu.classList.add('menu-close');
  }

  btnBurgerMenu.addEventListener('click', () => {
    isOpenMenu = !isOpenMenu;
    if (isOpenMenu) {
      openMenu();
    } else {closeMenu()};
  });

  linksContainer.addEventListener('click', (e) => {
    e.preventDefault();
    const clickedLink = e.target.closest('.menu-link');
    if (!clickedLink) return;
    isOpenMenu = false;
    closeMenu();
   
    setTimeout(() => {
      const targetAnchor = clickedLink.getAttribute('href');
      window.location.href = targetAnchor;
    }, 500);
  })
};
toggleBurgerMenu();


//slider
const slider = () => {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector('.btn-arrow-left');
  const btnRight = document.querySelector('.btn-arrow-right');
  const touchArea = document.querySelector('.slider')
  const sliderControls = document.querySelector('.slider-controls')

  let curSlide = 0;
  const lastSlide = slides.length;

  let touchStartX = 0;
  let touchEndX = 0;
  let touchMoveX = 0;
  let isPaused = false;

  const createControls = () => {
    slides.forEach((s, i) => {
      sliderControls.insertAdjacentHTML('beforeend',
        `<div class="control" data-slide="${i}"></div>`)
    })
  }


  const activateControl = (slide) => {
    document.querySelectorAll('.control').forEach(line => line.classList.remove('active'));

    const curLineControl = document.querySelector(`.control[data-slide="${slide}"]`);
    curLineControl.classList.add('active');
  }

  const goToSlide = (slide) => {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  }

  const controlsHandler = (e) => {
    if (e.target.classList.contains('control')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide)
      activateControl(slide)
    }
  }

  const nextSlide = () => {
    if (curSlide === lastSlide - 1) {
      curSlide = 0
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateControl(curSlide);
  }

  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = lastSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateControl(curSlide);
  }


  const touchStartHandle = (e) => {
    pauseAutoSwip();
    touchStartX = e.touches[0].clientX;
  }
 
  const touchMoveHandle = (e) => {
    resumeAutoSwip();
    touchEndX = e.changedTouches[0].clientX;
    touchMoveX = touchEndX - touchStartX;
    if (touchMoveX > 0) prevSlide();
    if (touchMoveX < 0) nextSlide();
  }

  const init = () => {
    goToSlide(0);
    createControls();
    activateControl(0);
  }
  init();

  const autoSwipHandler = () => {
    nextSlide();
  }

  const pauseAutoSwip = () =>{
    if (!isPaused) {
      isPaused = true;

      document.querySelectorAll('.control').forEach(line => line.classList.add('paused'));
    }
  }
  
const  resumeAutoSwip= () => {
    if (isPaused) {
      isPaused = false;
      document.querySelectorAll('.control').forEach(line => line.classList.remove('paused'));
    }
  }
  

  touchArea.addEventListener('mouseover', pauseAutoSwip);
  
  touchArea.addEventListener('mouseout', resumeAutoSwip);

  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  touchArea.addEventListener('touchstart', touchStartHandle);
  touchArea.addEventListener('touchend', touchMoveHandle);
  sliderControls.addEventListener('click', controlsHandler);
  sliderControls.addEventListener('animationend', autoSwipHandler)
}
slider();

