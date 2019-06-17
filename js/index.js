"use strict";
//global variables
let slideIndex = 1;
const svgDiv = document.querySelector(".gameSize");

//start init function when page loads
window.addEventListener("DOMContentLoaded", init);

//init funtion with arrow eventlistners and call funtions for slideshow and dot event
function init() {
  console.log(svg);

  const xBtn = document.querySelector("#closeIcon");
  const expandBtn = document.querySelector("#expandIcon");
  console.log(xBtn, expandBtn);

  const prev = document.querySelector(".prev");
  prev.addEventListener("click", goPrev);
  const next = document.querySelector(".next");
  next.addEventListener("click", goNext);

  expandBtn.addEventListener("click", gamefullscreen);
  xBtn.addEventListener("click", closeFullscreen);

  xBtn.style.visibility = "hidden";

  const slides = document.querySelectorAll(".slides");
  console.log(slides);
  slides.forEach(slide => {
    // console.log(slide);
    slide.addEventListener("touchstart", startSlide);
    slide.addEventListener("touchmove", moveSlide);
    slide.addEventListener("touchout", outSlide);
  });

  showSlides(slideIndex);
  dotEvent();
}

let startX;
let endX;

//touch and move slide
function startSlide(evt) {
  console.log(evt.touches[0].clientX);
  startX = evt.touches[0].clientX;
}
function moveSlide(evt) {
  const touch = evt.touches[0];
  console.log(touch);
  const change = startX - touch.clientX;
  console.log(change);
  if (change < 20) {
    plus(1);
  } else if (change > 0) {
    plus(-1);
  }
}
function outSlide(evt) {
  endX = evt.touches[0].clientX;
}

function gamefullscreen() {
  console.log("working");
  const xBtn = document.querySelector("#closeIcon");
  const expandBtn = document.querySelector("#expandIcon");
  console.log(xBtn, expandBtn);

  if (svgDiv.requestFullscreen) {
    svgDiv.requestFullscreen();
    xBtn.style.visibility = "visible";
    expandBtn.style.visibility = "hidden";
    // alert("change for landscape for a better visualizationof the game");
  } else if (svgDiv.mozRequestFullScreen) {
    /* Firefox */
    svgDiv.mozRequestFullScreen();
    xBtn.style.visibility = "visible";
    expandBtn.style.visibility = "hidden";
  } else if (svgDiv.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    svgDiv.webkitRequestFullscreen();
    xBtn.style.visibility = "visible";
    expandBtn.style.visibility = "hidden";
  } else if (svgDiv.msRequestFullscreen) {
    /* IE/Edge */
    svgDiv.msRequestFullscreen();
    xBtn.style.visibility = "visible";
    expandBtn.style.visibility = "hidden";
  }
}

function closeFullscreen() {
  const xBtn = document.querySelector("#closeIcon");
  const expandBtn = document.querySelector("#expandIcon");
  console.log(xBtn, expandBtn);

  if (document.exitFullscreen) {
    document.exitFullscreen();
    xBtn.style.visibility = "hidden";
    expandBtn.style.visibility = "visible";
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
    xBtn.style.visibility = "hidden";
    expandBtn.style.visibility = "visible";
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
    xBtn.style.visibility = "hidden";
    expandBtn.style.visibility = "visible";
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
    xBtn.style.visibility = "hidden";
    expandBtn.style.visibility = "visible";
  }
}

//event listner for dots to conect with weach slide
function dotEvent() {
  const dots = document.querySelectorAll(".dot");
  console.log(dots[1]);
  dots[0].addEventListener("click", dot => {
    currenSlide(1);
  });
  dots[1].addEventListener("click", dot => {
    currenSlide(2);
  });
  dots[2].addEventListener("click", dot => {
    currenSlide(3);
  });
  dots[3].addEventListener("click", dot => {
    currenSlide(4);
  });
  dots[4].addEventListener("click", dot => {
    currenSlide(5);
  });
  dots[5].addEventListener("click", dot => {
    currenSlide(6);
  });
}

// funtion current slide ot be equal to index
function currenSlide(index) {
  showSlides((slideIndex = index));
}

// funtion arrow correspond o each index
function plus(index) {
  showSlides((slideIndex += index));
}
let counterSlides = 0;
//activate plus funtion for arrow right
function goNext() {
  plus(1);
  counterSlides++;
  slideArray[counterSlides - 1].classList.add("fadeOut");

  // console.log(counterSlides);
}

//activate plus funtion for arrow left
function goPrev() {
  plus(-1);

  counterSlides = counterSlides - 1;
  console.log(counterSlides);
}
//slide array
const slideArray = document.querySelectorAll(".slides");

//funtion to creat slide show counter and display
function showSlides(index) {
  let counter;
  //console.log(slideArray);

  // dot array
  const dotArray = document.querySelectorAll(".dot");
  // console.log(dotArray);

  if (index < 1) {
    slideIndex = slideArray.length;
  }

  //for loop to display none slide
  for (counter = 0; counter < slideArray.length; counter++) {
    slideArray[counter].style.display = "none";
  }
  //for loop to take current class form dot
  for (counter = 0; counter < dotArray.length; counter++) {
    dotArray[counter].className = dotArray[counter].className.replace(
      " current",
      ""
    );
  }
  if (slideArray[slideIndex - 1]) {
    //add display block based on index
    slideArray[slideIndex - 1].style.display = "block";
    slideArray[slideIndex - 1].classList.remove("fadeOut");
    //add current class based on index
    dotArray[slideIndex - 1].className += " current";
  }

  const nextArrow = document.querySelector(".next");
  const prevArrow = document.querySelector(".prev");
  //change arrow at begining
  if (slideIndex === 1) {
    prevArrow.style.visibility = "hidden";
  } else {
    prevArrow.style.visibility = "visible";
  }

  //arrow move in game slide
  if (slideIndex === 5) {
    nextArrow.classList.add("nextgame");
    prevArrow.classList.add("prevgame");
  } else {
    nextArrow.classList.remove("nextgame");
    prevArrow.classList.remove("prevgame");
  }

  //change arrow at end
  if (slideIndex === 6) {
    console.log("ae");
    document.querySelector(".next").addEventListener("click", lastClick);
    document.querySelector(".next").removeEventListener("click", goNext);
  } else {
    document.querySelector(".next").removeEventListener("click", lastClick);
    document.querySelector(".next").addEventListener("click", goNext);
  }
}

//funtion to change arrow right event at the end
function lastClick() {
  document.querySelector("#main-onboarding section").style.display = "none";
}
