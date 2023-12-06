import products from './products.json' assert { type: 'json' }


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

//Tabs
const cardsMenu = () => {
  const cardsContainer = document.querySelector('.cards-container');
  const btnUpdate = document.querySelector('.load-more-btn');
  const tabsContainer = document.querySelector('.tab-navigation')
  const tabs = document.querySelectorAll('.tab-item')


  const displayCards = (cards, clickedBtnUpdate = false) => {
    if (!clickedBtnUpdate) {
      cardsContainer.innerHTML = ''
    }
    const startIndex = clickedBtnUpdate ? 5 : 1;
    cards.forEach((card, i) => {
      cardsContainer.insertAdjacentHTML('beforeend',
      `<div class="card-item">
        <div class="image-card-container">
          <img
            class="image-card"
            src="./img/menu-page/products/${card.category}-${i + startIndex}.jpg"
            alt="${card.category}-${i + startIndex}">
        </div>
        <div class="text-card-container">
          <h3 class="font-h3">${card.name}</h3>
          <p class="font-body-medium">${card.description}</p>
          <div class="price-container">
            <h3 class="font-h3"> $${card.price}</h3>
          </div>
        </div>
      </div>`)
    })
  }

    
  const createCards = (categoryArr) => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const getCardsToDisplay = () => {
      if (mediaQuery.matches && categoryArr.length > 4) {
        btnUpdate.style.display = 'flex';
        return categoryArr.slice(0, 4);
      } else {
        btnUpdate.style.display = 'none';
        return categoryArr;
      }
    }

    const btnUpdateHandler = () => {
      if (categoryArr.length > 4) {
        const restCards = categoryArr.slice(4);
        displayCards(restCards, true);
      }
      btnUpdate.style.display = 'none';
    }  
     
    btnUpdate.addEventListener('click', btnUpdateHandler);
    mediaQuery.addEventListener("change", getCardsToDisplay);
    
    const cardsToDisplay = getCardsToDisplay();
    displayCards(cardsToDisplay)
  }




  const selectTabHandler = (e) => {
    const selectedTab = e.target.closest('.tab-item');
    if (!selectedTab) return;

    tabs.forEach((tab) => tab.classList.remove('active'))
      selectedTab.classList.add('active');

    const curCategory = filterData(selectedTab.dataset.tab)
    if (curCategory) {
      createCards(curCategory)
    }  
  }

  tabsContainer.addEventListener('click', selectTabHandler)


  const filterData = (curNameCategory = 'coffee') => {
    const curCategory = products.filter((prod) => prod.category === curNameCategory);
    return curCategory;
  }

  const initialCards = filterData();
  createCards(initialCards);
  }

cardsMenu();

