/************** SHOW MENU ***************/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* MENU SHOW */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* HIDE SHOW */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/************** IMAGE GALLERY ***************/
function imageGallery() {
  const mainImage = document.querySelector(".details__image"),
    smallImage = document.querySelectorAll(".details__small-image");

  smallImage.forEach((image) => {
    image.addEventListener("click", function () {
      mainImage.src = this.src;
    });
  });
}
imageGallery();

/************** SWIPER CATEGORIES ***************/
var swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,

  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },

  breakpoints: {
    350: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
});

/************** SWIPER PRODUCTS ***************/
var swiperProducts = new Swiper(".newArrivals__container", {
  spaceBetween: 24,

  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

/**************  PRODUCTS TABS  ***************/
const tabs = document.querySelectorAll("[data-target]"),
  tabContent = document.querySelectorAll("[content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);
    tabContent.forEach((tabContent) => {
      tabContent.classList.remove("active__tab");
    });
    target.classList.add("active__tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active__tab");
    });
    tab.classList.add("active__tab");
  });
});

/**************  CHECKED SIZE  ***************/

const sizeBtns = document.querySelectorAll(".size__link");
// current selected button
let checkedBtn = 0;

sizeBtns.forEach((item, i) => {
  // looping through each button
  item.addEventListener("click", () => {
    // adding click event to each
    sizeBtns[checkedBtn].classList.remove("size-active");

    // adding check class to clicked button
    item.classList.add("size-active");

    // upading the variable
    checkedBtn = i;
  });
});

/**************  LOGIN & REGISTER TEST  ***************/
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".login__register-container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

////////////////////////////////////////////////////////////////////////
