window.addEventListener("load", loadSVG);

//show graphic - load SVG

function loadSVG() {
  fetch("prototypesave1_game 1.svg")
    .then(res => res.text())
    .then(svgdata => {
      document
        .querySelector("#gameBox")
        .insertAdjacentHTML("afterbegin", svgdata);

      document
        .querySelector("#playButton")
        .addEventListener("mouseover", () => {
          TweenLite.to("#playButton", 0.2, {
            scale: 0.96,
            transformOrigin: "50% 50%"
          });
        });
      document.querySelector("#playButton").addEventListener("mouseout", () => {
        TweenLite.to("#playButton", 0.2, {
          scale: 1,
          transformOrigin: "50% 50%"
        });
      });
      animationFallingBoxes();
      animateListOfHorses();

      console.log(document.querySelector("#pointsText").textContent);
      if (document.querySelector("#pointsText").textContent == 0) {
        document.querySelector("#youWonPlaceholder").innerHTML =
          "Are you sure you don't want to play?";
        document.querySelector("#savePoint").innerHTML =
          "If you play you can win points for the real betting";
      }
    });
}

// --------------------------------------- animate list of horses ----------------------------------

function animationFallingBoxes() {

  document.querySelector("#playButton").addEventListener("click", () => {
    document.querySelector("#youWonPlaceholder").innerHTML =
      "YOU WON <span id='pointsPlaceholder'>30</span> POINTS";

    document.querySelector("#FIRST").classList.add("hide");
    TweenLite.to("#playButton", 1, {
      scale: 0.5
    });

    let whooshSound = document.querySelectorAll(
      "#whooshSound0, #whooshSound1, #whooshSound2, #whooshSound3"
    );
    let boxesWithHorses = document.querySelectorAll(
      "#horse1, #horse2, #horse3, #horse4"
    );

    for (let i = 0; i < boxesWithHorses.length; i++) {
      console.log(i);

      TweenLite.from(boxesWithHorses[i], 1, {
        delay: i / 2,
        y: "-=519",
        ease: Elastic.easeOut.config(0.5, 0.3),
        onStart: function() {
          console.log("play " + i);
          whooshSound[i].play();
          //document.querySelector("#whooshSound0").play();
        }
      });
    }
    document.querySelector("#SECOND").classList.remove("hide");
    document
      .querySelectorAll("#horse1, #horse2, #horse3, #horse4")
      .forEach(element => {
        element.addEventListener("click", event => {
          clickToBet(event);
          document.querySelector("#SECOND").classList.add("hide");
          document.querySelector("#THIRD").classList.remove("hide");

          TweenMax.to("#lets-race", 1.4, {
            scale: 5,
            opacity: 0,
            transformOrigin: "50% 50%"
          });

          // document.querySelector("#lets-race").addEventListener("click", () => {
          //   document.querySelector("#THIRD").classList.add("hide");
          //   document.querySelector(".cls-4-1").classList.remove("hide");
          //  });
        });
      });
  });
}

function animateListOfHorses() {
  let allBoxes = document.querySelectorAll(".orangeBox");

  let allBoxes_a = document.querySelectorAll(".cls-2-4a");
  let textGroup = document.querySelectorAll(".text-group");
  let allImageHorses = document.querySelectorAll(
    "#horseImage1, #horseImage2, #horseImage3, #horseImage4"
  );

  console.log(allBoxes);
  for (let i = 0; i < allBoxes.length; i++) {
    Array.from(allBoxes[i].querySelectorAll("text, path")).forEach(item => {
      item.addEventListener("mouseenter", () => {
        event.preventDefault();
        console.log(event.target);
        TweenMax.to(allBoxes_a[i], 0.4, {
          scaleY: -1.2,
          y: "1"
        });
        TweenMax.to(allImageHorses[i], 0.4, {
          scaleY: 0,
          transformOrigin: "100% 100%"
        });
        TweenMax.to(textGroup[i], 0.4, {
          y: "-70"
        });
      });
    });
  }
  for (let i = 0; i < allBoxes.length; i++) {
    Array.from(allBoxes[i].querySelectorAll("path, text")).forEach(item => {
      item.addEventListener("mouseleave", () => {
        event.preventDefault();
        console.log(event.target);
        TweenMax.to(allBoxes_a[i], 0.4, {
          scaleY: 0
        });
        TweenMax.to(allImageHorses[i], 0.4, {
          scaleY: 0.33,
          transformOrigin: "100% 100%"
        });
        TweenMax.to(textGroup[i], 0.4, {
          y: "0"
        });
      });
    });
  }
}

// ---------------------------------------------- race -----------------------------------------

let i;
let time;
let scores = [];
let horses = [];
let chosenHorse;
let position;

// bet on a horse

function clickToBet(event) {
  // Create a condition to add event listener only to the elements that  contains an attribute “data – horse”
  if (event.target.parentElement.parentElement.dataset.horse) {
    // Set the value a variable “chosenHorse” with the value of the “data – horse” attribute
    chosenHorse = event.target.parentElement.parentElement.dataset.horse;
    horseRace();

    console.log(
      chosenHorse,
      document.querySelector("#race [data-horse='" + chosenHorse + "']")
    );
  }
}

let randomVal = Math.random(); // Variable used to create a random easing for the moving horses

function horseRace() {
  let raceSound = document.querySelector("#raceSound");

  let animateArrayOfHorses = document.querySelectorAll(
    "#white-horse, #brown-white-horse, #black-horse, #brown-horse"
  ); // the array contains all the horses from the scene with race, that will be animate with for loop function

  document.querySelector(
    "#race [data-horse='" + chosenHorse + "']"
  ).style.opacity = "0.7";

  for (let i = 0; i < animateArrayOfHorses.length; i++) {
    raceSound.play();
    randomVal = Math.random();

    CustomEase.create(
      "run" + [i],
      "M0,0 C0.216,0.088 0.436,0.168 0.52,0.298 0.627,0.464 0.621,0.492 " +
        randomVal +
        ",0.664 0.804,0.804 0.856,0.81 1,1"
    );
    let roundRandom = Math.random() * 10;
    time = roundRandom + 10;
    let element = animateArrayOfHorses[i];

    let tl = new TimelineMax({ repeat: -1, repeatDelay: 0 });
    tl.from(element, roundRandom / 10 + 0.2, {
      ease: Power2.easeIn,
      rotation: -10,
      transformOrigin: "50% 50%"
    });
    tl.to(element, roundRandom / 10 + 0.2, {
      ease: Power2.easeOut,
      rotation: 10,
      transformOrigin: "50% 50%"
    });
    tl.from(element, roundRandom / 10 + 0.2, {
      ease: Power2.easeIn,
      rotation: 10,
      transformOrigin: "50% 50%"
    });
    tl.to(element, roundRandom / 10 + 0.2, {
      ease: Power2.easeOut,
      rotation: -10,
      transformOrigin: "50% 50%"
    });

    TweenLite.to(element, time, {
      ease: "run" + [i],
      x: 850,

      onComplete: function() {
        console.log(i, Math.round(time * 100) / 100);
        scores.push(Math.round(time * 100) / 100);
        horses.push(element.dataset.name);
        time = Math.random() * 10 + 10;

        scores.sort(function(a, b) {
          return a - b;
        });
        console.log(horses);
        console.log(horses.length);
        if (horses.length === 4) {
          showScores();
          position = horses.indexOf(chosenHorse);
          console.log(position);
          document.querySelector("#THIRD").classList.add("hide");
          document.querySelector(".cls-4-1").classList.remove("hide");
          let scorseBoxes = Array.from(document.querySelectorAll(".scorseBox"));
          scorseBoxes[position].style.opacity = "0.8";

          document
            .querySelector(".nextButton")
            .addEventListener("click", showPoints);
          document
            .querySelector("#playAgainButton")
            .addEventListener("click", () => {
              document.querySelector(".cls-4-1").classList.add("hide");
              document.querySelector("#FIRST").classList.remove("hide");
              document.location.reload();
            });
        }
      }
    });
  }
}

// ------------------------------------------- show scores -------------------------------------

function showScores() {
  let horseNames = document.querySelectorAll(".horseName");
  let horsesTimes = document.querySelectorAll(".horseTime");
  console.log(horseNames.length);
  for (let i = 0; i < horseNames.length; i++) {
    horseNames[i].textContent = horses[i];
    horsesTimes[i].textContent = scores[i];
  }
}

function showPoints() {
  console.log(chosenHorse);

  document
    .querySelectorAll(
      ".FIFTHcls-9a, .FIFTH2cls-24a, .FIFTH2cls-32a, .FIFTH2cls-39a"
    )
    .forEach(horse => {
      if (horse.dataset.horse === chosenHorse) {
        horse.classList.remove("hide");
      }
      TweenMax.from(horse, 3, {
        opacity: 0
      });
    });

  document
    .querySelectorAll(".nextButton, #playAgainButton, .scoresBox")
    .forEach(e => {
      e.classList.add("hide");
    });
  document.querySelector("#FIFTH").classList.remove("hide");

  let horseFeet = document.querySelectorAll(".FIFTHcls-4a");
  console.log(position);
  document.querySelector("#pointsText").textContent =
    50 - position * 10 + " POINTS";

  document.querySelector(
    "#pointsPlaceholder"
  ).textContent = document.querySelector("#pointsText").textContent;

  let bellSound = document.querySelectorAll(
    "#Bell1, #Bell2, #Bell3, #Bell4, #Bell5"
  );

  for (let i = 0; i < 5 - position - 1 + 1; i++) {
    TweenMax.to(horseFeet[i], 0.5, {
      delay: i,
      fill: "#f7931e",
      onStart: function() {
        bellSound[i].play();
      }
    });
  }
  TweenMax.from("#pointsText", 0.5, {
    delay: 5 - position - 1 + 1,
    scale: 5,
    transformOrigin: "50% 50%",
    opacity: 0,
    onStart: function() {
      document.querySelector("#sucess").play();
    },
    ease: Bounce.easeOut
  });

  let scoresParents = Array.from(document.querySelectorAll(".scoresParent"));
  let scorseBoxes = Array.from(document.querySelectorAll(".scorseBox"));
  // box animatiom
  TweenMax.to(scorseBoxes[position], 0.5, {
    attr: { y: 258 }
  });
  // text animation
  console.log(scorseBoxes[position].parentNode.childNodes[2]);
  TweenMax.to(scoresParents[position].querySelector(".cls-4-6"), 0.5, {
    attr: { transform: "translate(303.23 298.35)" }
  });
  TweenMax.to(scoresParents[position].querySelector(".cls-4-7"), 0.5, {
    attr: { transform: "translate(798.01 300.63)" }
  });
  TweenMax.to(scoresParents[position].querySelector(".cls-4-8"), 0.5, {
    attr: { transform: "translate(195.33 299.36)" }
  });
  // remove all postion but one
  console.log(position);
  for (let i = 0; i < scoresParents.length; i++) {
    if (i != position) {
      scoresParents[i].classList.add("hide");
    }
  }
}
