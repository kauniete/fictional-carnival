//modals//
// Get the modal
let modals = document.querySelectorAll(".modal");
// Get the button that opens the modal
let btns = document.querySelectorAll(".open-modal");
// Get the <span> element that closes the modal
let spans = document.getElementsByClassName("close");
//modal blur
let contentWrapper = document.querySelectorAll(".content-behind-active-modal");

//open the modal upon button click
[...btns].forEach((btn, ind) => {
  btn.onclick = () => {
    modals[ind].classList.add("modal-active");
    contentWrapper.forEach((el) => {
      el.classList.add("content-behind-active-modal-blurs");
    });
    modals[ind].style.display = "block";
    document.querySelector("body").style.overflowY = "hidden";
    document.querySelector("body").style.height = "100vh";
  };
});
//close the modal by clicking on x
[...spans].forEach((span, ind) => {
  span.onclick = () => {
    modals[ind].style.display = "none";
    contentWrapper.forEach((el) => {
      el.classList.remove("content-behind-active-modal-blurs");
    });
    modals[ind].classList.remove("modal-active");
    document.querySelector("body").style.overflowY = "visible";
    document.querySelector("body").style.height = "auto";
  };
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = (e) => {
  [...modals].forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = "none";
      contentWrapper.forEach((el) => {
        el.classList.remove("content-behind-active-modal-blurs");
      });
      document.querySelector("body").style.overflowY = "visible";
      document.querySelector("body").style.height = "auto";
      modals.forEach((el) => {
        el.classList.remove("modal-active");
      });
    }
  });
};

//search//
let articles = document.querySelectorAll(".box");
let overlay = document.querySelector(".overlay");
let searchInput = document.getElementById("search-box");
function liveSearch() {
  let search_query = document.getElementById("search-box").value;
  articles.forEach((el) => {
    el.style.display = "block";
    overlay.style.display = "block";
  });

  //Use innerText if all contents are visible
  //Use textContent for including hidden elements
  for (let i = 0; i < articles.length; i++) {
    if (
      articles[i].innerText.toLowerCase().includes(search_query.toLowerCase())
    ) {
      articles[i].classList.remove("is-hidden");
      articles[i].style.display = "block";
      //overlay.style.display = "block";
    } else {
      articles[i].classList.add("is-hidden");
      articles[i].style.display = "none";
    }
  }
  //hide search results if clicked outside the area
  window.addEventListener("click", function (event) {
    if (
      event.target != articles &&
      event.target != overlay &&
      event.target != search_query &&
      event.target != searchInput
    ) {
      overlay.style.display = "none";
    }
  });
}
//hide search results on scroll
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos < currentScrollPos) {
    overlay.style.display = "none";
  }
  prevScrollpos = currentScrollPos;
};

//slider
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}
// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

//pagination
let pageNumber = document.querySelectorAll(".page-number");

let pageIndex = 1;
showPages(pageIndex);

// Next/previous controls
function plusPages(n) {
  showPages((pageIndex += n));
}
function currentPage(n) {
  showPages((pageIndex = n));
}
function showPages(n) {
  let i;
  let pages = document.getElementsByClassName("pagination-container");
  if (n > pages.length) {
    pageIndex = 1;
  }
  if (n < 1) {
    pageIndex = pages.length;
  }

  for (i = 0; i < pages.length; i++) {
    pages[i].style.display = "none";
  }
  pages[pageIndex - 1].style.display = "block";
  //pages[pageIndex - 1].children[9].childNodes[3].firstElementChild
  //.innerText
}

//mobile menu
function openMobileMenu() {
  let navLinks = document.getElementById("myLinks");
  let navLink = document.querySelectorAll(".link");
  let wholeNav = document.getElementById("navigation");
  let toggleFirst = document.querySelector(".toggle1");
  let toggleSecond = document.querySelector(".toggle2");
  let icons =
    '<div class="inserted-icons"><a  href="#"><img src="assets/icons/linkedin-white.svg" alt="" srcset="" /></a><a href="#"><img src="assets/icons/twitter-white.svg" alt="" srcset="" /></a><a href="#"><img src="assets/icons/instagram-white.svg" alt="" srcset="" /></a><a href="#"> <img src="assets/icons/facebook-white.svg" alt="" srcset="" /></a></div>';
  if (navLinks.style.display === "block") {
    navLinks.style.display = "none";
    wholeNav.classList.remove("nav-expanded-nav");
    navLinks.removeChild(document.querySelector(".inserted-icons"));
    toggleFirst.classList.remove("nav-expanded-toggle1");
    toggleSecond.classList.remove("nav-expanded-toggle2");
  } else {
    navLinks.style.display = "block";
    navLinks.classList.add("nav-expanded-ul");
    wholeNav.classList.add("nav-expanded-nav");
    navLink.forEach((el) => {
      el.classList.add("nav-expanded-li");
    });
    toggleFirst.classList.add("nav-expanded-toggle1");
    toggleSecond.classList.add("nav-expanded-toggle2");

    if (document.querySelector(".inserted-icons") === null) {
      navLinks.insertAdjacentHTML("beforeend", icons);
    }
  }
  //hide expanded nav on scroll
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos) {
      navLinks.style.display = "none";
      wholeNav.classList.remove("nav-expanded-nav");
      toggleFirst.classList.remove("nav-expanded-toggle1");
      toggleSecond.classList.remove("nav-expanded-toggle2");
    }
    prevScrollpos = currentScrollPos;
  };
}

///search on mobile
const searchIcon = document.getElementById("search-mobile");
let searchBox = document.getElementsByClassName("search-box");
let searchIconImage =
  '  <img class="inserted-search-icon" src="assets/icons/search.svg" alt="" srcset="" />';
if (window.innerWidth < 451) {
  searchIcon.addEventListener("click", openSearchBar);
}
function openSearchBar() {
  if (document.querySelector("input").style.display === "block") {
    document.querySelector("input").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
    document
      .querySelector("#search-mobile")
      .classList.remove("search-expanded-search-trigger-icon");
    document.querySelector('label[for="toggle"]').style.display = "block";
    document.querySelector(".navbar-logo").style.display = "block";
    document.querySelector("input").classList.remove("search-expanded-input");
    document
      .querySelector(".overlay")
      .classList.remove("search-expanded-overlay");
    for (let i = 0; i < searchBox.length; i++) {
      searchBox[i].classList.remove("search-expanded-box");
    }
    document
      .querySelector(".search-bar-and-some-icons")
      .removeChild(document.querySelector(".inserted-search-icon"));
  } else {
    document.querySelector("input").style.display = "block";
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".overlay").classList.add("search-expanded-overlay");
    document
      .querySelector("#search-mobile")
      .classList.add("search-expanded-search-trigger-icon");
    document.querySelector('label[for="toggle"]').style.display = "none";
    document.querySelector(".navbar-logo").style.display = "none";
    document.querySelector("input").classList.add("search-expanded-input");

    for (let i = 0; i < searchBox.length; i++) {
      searchBox[i].classList.add("search-expanded-box");
    }
    if (document.querySelector(".inserted-search-icon") === null) {
      document
        .querySelector("input")
        .insertAdjacentHTML("beforebegin", searchIconImage);
    }
  }
  //hide mobile search results on scroll
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos &&
currentScrollPos > window.innerHeight) {
      document.querySelector("input").style.display = "none";
      document
        .querySelector("#search-mobile")
        .classList.remove("search-expanded-search-trigger-icon");
      document.querySelector('label[for="toggle"]').style.display = "block";
      document.querySelector(".navbar-logo").style.display = "block";
      document.querySelector("input").classList.remove("search-expanded-input");
      document
        .querySelector(".search-bar-and-some-icons")
        .removeChild(document.querySelector(".inserted-search-icon"));
      document
        .querySelector(".overlay")
        .classList.remove("search-expanded-overlay");
      document.querySelector(".overlay").style.display = "none";
    }
    prevScrollpos = currentScrollPos;
  };
}
