// 마이카 dropdown
const dropdownBtn = document.querySelector(".dropdown");
const showMenu = document.querySelector(".dropdown_menu");
const upCloseBtn = document.querySelector(".up_close");

dropdownBtn.addEventListener("click", () => {
  showMenu.classList.add("dropShow");
});
upCloseBtn.addEventListener("click", () => {
  showMenu.classList.remove("dropShow");
});

//search icon
const searchIcon = document.querySelector(".search_ico");

window.addEventListener("scroll", () => {
  let scrollNum = window.scrollY;
  if (scrollNum > 0) {
    searchIcon.classList.add("showSearchIcon");
    searchIcon.classList.remove("hideSearchIcon");
  } else {
    searchIcon.classList.remove("showSearchIcon");

    searchIcon.classList.add("hideSearchIcon");
  }
});

// card menu
const cardMenu = document.querySelectorAll(".card_menu ul li");

// popular card
const itemBoxes = document.querySelector(".card_item_boxes");
const URL = "./card.json";

fetch(URL)
  .then((response) => response.json())
  .then((json) => {
    let popOutput = "";
    json.popularCard.forEach((it) => {
      popOutput += `
    <div class="card_item_box">
      <img src="${it.img}" alt="${it.alt}" />
      <div class="card_desc">
        <span>${it.desc}</span>
      </div>
    </div>
      `;
    });

    let recommendCardOutput = "";
    json.recommendCard.forEach((it) => {
      recommendCardOutput += `
    <div class="card_item_box">
      <img src="${it.img}" alt="${it.alt}" />
      <div class="card_desc">
        <span>${it.desc}</span>
      </div>
    </div>
      `;
    });

    let premiumOutput = "";
    json.premiumCard.forEach((it) => {
      premiumOutput += `
    <div class="card_item_box">
      <img src="${it.img}" alt="${it.alt}" />
      <div class="card_desc">
        <span>${it.desc}</span>
      </div>
    </div>
      `;
    });

    itemBoxes.innerHTML = popOutput;

    cardMenu.forEach((li) => {
      li.addEventListener("click", (e) => {
        e.preventDefault();
        cardMenu.forEach((li) => {
          li.classList.remove("active");
        });
        li.classList.add("active");
        let target = e.target;
        if (target.innerText === "인기카드") {
          itemBoxes.innerHTML = popOutput;
        } else if (target.innerText === "추천카드") {
          itemBoxes.innerHTML = recommendCardOutput;
        } else if (target.innerText === "프리미엄카드") {
          itemBoxes.innerHTML = premiumOutput;
        }
      });
    });

    const slides = document.querySelector(".recommend_items");

    let recSlideOutput = "";
    json.recommendSlide.forEach((it) => {
      recSlideOutput += `
      <li data-index="${it.dataI}" class="recommend_slide_item swiper-slide">
        <a href="#">
          <div class="text_sec">
            <h2>${it.desc}</h2>
          </div>
          <img src="${it.img}" alt="${it.alt}">
        </a>
      </li>
      `;
      slides.innerHTML = recSlideOutput;
    });

    const swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });

    const financeItems = document.querySelector(".finance_list_items");

    let financeOutput = "";
    json.finance.forEach((it) => {
      financeOutput += `
      <div class="finance_list_item">
      <div class="item_info">
        <div class="img_sec">
          <img src="${it.img}" alt="${it.alt}">
          <h4>${it.h4} <span>${it.span}</span></h4>
          </div>
            <a href="">${it.a}</a>
      </div>
    </div>
      `;
    });
    financeItems.innerHTML = financeOutput;

    const menuBox1 = document.querySelector(".slide_box1");

    let categoryOutput1 = "";
    json.category1.forEach((it) => {
      categoryOutput1 += `
        <li class="menu_item">
          <img src="${it.img}" alt="${it.alt}"/>
          <span>${it.desc}</span>
        </li>
      `;
    });
    menuBox1.innerHTML = categoryOutput1;

    const menuBox2 = document.querySelector(".slide_box2");

    let categoryOutput2 = "";
    json.category2.forEach((it) => {
      categoryOutput2 += `
        <li class="menu_item">
          <img src="${it.img}" alt="${it.alt}"/>
          <span>${it.desc}</span>
        </li>
      `;
    });
    menuBox2.innerHTML = categoryOutput2;
  });

// category 슬라이드
const categoryWrapper = document.querySelector(".category_wrapper");
const categoryInner = document.querySelector(".category_inner");
const slideItems = document.querySelectorAll(".menu_box");
const C_slideCount = slideItems.length;
let C_currentIndex = 0;
const cPrevBtn = document.querySelector(".C_prev_btn");
const cNextBtn = document.querySelector(".C_next_btn");
const pager = document.querySelectorAll(".C_pager > span");

const C_goToSlide = (i) => {
  categoryInner.style.transform = `translateX(${i * -100}%)`;
  if (window.innerWidth < 1024) {
    categoryInner.style.transform = `translateX(${i * -50}%)`;
  }
  // categoryInner.classList.add("animated");
  C_currentIndex = i;

  for (let i = 0; i < pager.length; i++) {
    pager[i].classList.remove("active");
  }
  pager[i].classList.add("active");
};
for (let i = 0; i < pager.length; i++) {
  pager[i].addEventListener("click", (e) => {
    let pagerNum = e.target.innerText - 1;
    C_goToSlide(pagerNum);
  });
}

cPrevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (C_currentIndex > 0) {
    C_goToSlide(C_currentIndex - 1);
  } else {
    C_goToSlide(C_slideCount - 1);
  }
});
cNextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (C_currentIndex < C_slideCount - 1) {
    C_goToSlide(C_currentIndex + 1);
  } else {
    C_goToSlide(0);
  }
});

// footer_family
const familyBtns = document.querySelectorAll(".family_group > div > button");
const DetailSec = document.querySelector(".family");

familyBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.nextElementSibling.classList.toggle("family_showDetailSec");
  });
});

// footer_expand
const footerExpandBtn = document.querySelector(".footer_expand_btn img");

console.log(footerExpandBtn);
const footerHideSec = document.querySelector(".footer_expand");

footerExpandBtn.addEventListener("click", () => {
  console.log("click");
  footerHideSec.classList.toggle("show_f_hide_sec");
  footerExpandBtn.classList.toggle("toggleOn");
});
