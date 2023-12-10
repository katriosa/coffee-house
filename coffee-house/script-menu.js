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
  const tabs = document.querySelectorAll('.tab-category')


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
          <h3 class="title font-h3">${card.name}</h3>
          <p class="description font-body-medium">${card.description}</p>
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

//Modal Window
const cardsContainer = document.querySelector('.cards-container');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalPriceContainer = document.querySelector('.modal-price-container');
const btnCloseModal = document.querySelector('.btn-close-modal');
const imageContainer = document.querySelector('.modal-image-container');
const titleContainer = document.querySelector('.title-container');
const tabsSize = document.querySelector('.tabs-size')
const tabsAdditives = document.querySelector('.tabs-additives')
let totalPrice=0;
let additivesPrice = 0;

const createTotalPrice = ( ) => {
  modalPriceContainer.innerHTML = '';
 
  modalPriceContainer.insertAdjacentHTML('beforeend',
    `<h3 class="font-h3">Total:</h3>
    <h3 class="font-h3">$${totalPrice.toFixed(2)}</h3>`
  );
}

 

const createSizeBlock = (obj) => {
  const objKeys = Object.keys(obj.sizes);

  objKeys.forEach((key) => {
    const tabEl = document.createElement('button');
    tabEl.innerHTML = `<span class="icon">${key.toUpperCase()}</span>${obj.sizes[key].size}`;
    
    tabEl.classList.add('tab-item');
    tabEl.classList.add('font-link-and-button');
    tabEl.setAttribute('data-tab', obj.sizes[key]['add-price']);

    if (key === 's') {
      tabEl.classList.add('active');
    }
    tabsSize.appendChild(tabEl)
  })
  totalPrice =+obj.price;
  createTotalPrice();

  const chooseSize = (e) => {
    const allTabs = tabsSize.querySelectorAll('.tab-item');
    const selected = e.target.closest('.tab-item');
    if (!selected) return;

    allTabs.forEach((tab) => {
      tab.classList.remove('active');
      })
      
      selected.classList.add('active');
    const addPrice = +selected.dataset.tab;
    totalPrice = +obj.price + addPrice +additivesPrice;   
    createTotalPrice();
  }
  tabsSize.addEventListener('click', chooseSize)  
}

const createAdditivesBlock = (obj) => {
  obj.additives.forEach((add, i) => {
    const tabEl = document.createElement('button');
    tabEl.innerHTML = `<span class="icon">${i + 1}</span>${add.name}`;
    
    tabEl.classList.add('tab-item');
    tabEl.classList.add('font-link-and-button');
    tabEl.setAttribute('data-tab', add['add-price']);
    
    tabsAdditives.appendChild(tabEl);
  })
  

  const chooseAdditives = (e) => {
    const selected = e.target.closest('.tab-item');
    if (!selected) return;

    const isActive = selected.classList.toggle('active');
    const addPrice = +selected.dataset.tab;
    if (isActive) {
      totalPrice += addPrice;  
      additivesPrice+=addPrice
    } else {
      totalPrice -= addPrice;
      additivesPrice-=addPrice
    }
  
    createTotalPrice();
  }
  tabsAdditives.addEventListener('click', chooseAdditives)  
}

const createSizeAndAdditivesBlocks = (clickedTitle) => {
  products.forEach((obj) => {
    if (obj.name === clickedTitle) {
      createSizeBlock(obj)
      createAdditivesBlock(obj)
    }
  })
}


const createModal = (clickedCard) => {
  const imageEl = clickedCard.querySelector('.image-card');
  const titleEl = clickedCard.querySelector('.title');
  const descriptionEl = clickedCard.querySelector('.description');
 
  imageContainer.insertAdjacentHTML('beforeend',
  `<img src="${imageEl.getAttribute('src')}"
      alt="product">
    `)   
    
  titleContainer.insertAdjacentHTML('afterbegin',
  `<h3 class="font-h3 modal-title">${titleEl.textContent}</h3>
  <p class="font-body-medium">${descriptionEl.textContent}</p>
  `)   
  
  createSizeAndAdditivesBlocks(titleEl.textContent)
  
}
const clearModal = () => {
  imageContainer.innerHTML = '';
  titleContainer.innerHTML = '';
  tabsAdditives.innerHTML = '';
  tabsSize.innerHTML = '';
}

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  clearModal();
};

const openModal = (e) => {
  const clickedCard = e.target.closest('.card-item');
  if (!clickedCard) return;

  createModal(clickedCard);

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden'); 

}


cardsContainer.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
