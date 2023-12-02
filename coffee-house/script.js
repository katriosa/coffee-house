'use strict';

//burger-menu
const openMenu = () => {
  const btnBurgerMenu = document.querySelector('.btn-burger-menu');
  const menuOpen = document.querySelector('.menu-open');

  btnBurgerMenu.addEventListener('click', () => {
    btnBurgerMenu.classList.toggle('active');
    menuOpen.classList.toggle('active');
  });
};
openMenu();


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

  const createControls = () => {
    slides.forEach((s, i) => {
      console.log(s, i);
      sliderControls.insertAdjacentHTML('beforeend',
        `<div class="control" data-slide="${i}"></div>`)
    })
  }


  const activateControl = (slide) => {
    document.querySelectorAll('.control').forEach(line => line.classList.remove('active'));

    document.querySelector(`.control[data-slide="${slide}"]`).classList.add('active')
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
    touchStartX = e.touches[0].clientX;
  }
 
  const touchMoveHandle = (e) => {
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

  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  touchArea.addEventListener('touchstart', touchStartHandle);
  touchArea.addEventListener('touchend', touchMoveHandle);
  sliderControls.addEventListener('click', controlsHandler)
}
slider();