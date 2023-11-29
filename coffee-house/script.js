'use strict';

const btnBurgerMenu = document.querySelector('.btn-burger-menu');
const menuOpen = document.querySelector('.menu-open');

btnBurgerMenu.addEventListener('click', () => {
  btnBurgerMenu.classList.toggle('active');
  menuOpen.classList.toggle('active');
});
