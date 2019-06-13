let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modalClose");
let deactivatedList = [];
let arrayOfUsers = [];

//prototype object
const userObject = {
  Photo: "-user photo-",
  Username: "-user name-",
  Password: "-user password-",
  Wins: "-wins-",
  Looses: "-looses-",
  Rating: "-rating-",
  Fullname: "-fullname-",
  Email: "-email-",
  Telephone: "-telephone-",
  Address: "-address-",
  Id: "-id-"
};

/*------------------------------------------------------------------------making object---------------------------------------------------------------------*/

function getJSON() {
  fetch("https://dantoto-eb44.restdb.io/rest/dantoto-users", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce6c77b780a473c8df5cb6d",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(makeObject);
}
getJSON();

function makeObject(usersList) {
  //alert("make obj");
  usersList.forEach(user => {
    const newUserObject = Object.create(userObject);
    newUserObject.photo = "https://dantoto-eb44.restdb.io/media/" + user.Photo;
    newUserObject.username = user.Username;
    newUserObject.password = user.Password;
    newUserObject.wins = user.Wins;
    newUserObject.looses = user.Looses;
    newUserObject.rating = user.Rating;
    newUserObject.fullname = user.Fullname;
    newUserObject.email = user.Email;
    newUserObject.telephone = user.Telephone;
    newUserObject.address = user.Address;
    newUserObject.id = user._id;
    arrayOfUsers.push(newUserObject);
    //console.log(user.Username);
    //console.log(newUserObject.username);
  });
  displayUsers(arrayOfUsers);
}

/*---------------------------------------------------------------displaying table 1 content - with object-----------------------------------------------------------------*/

function displayUsers(arrayOfUsers) {
  document.querySelectorAll(".tableRow").forEach(item => {
    item.remove(); //the rows need to deleted before displaying users, because otherwise they are duplicated if the function is called 2 or more times in the code
  });
  arrayOfUsers.forEach(user => {
    const template1 = document.querySelector("#template1").content;
    const template2 = document.querySelector("#template2").content;
    const clone = template1.cloneNode(true);
    const clone2 = template2.cloneNode(true);
    //console.log(clone);
    //console.log(user.photo);

    if (
      user.photo === "https://dantoto-eb44.restdb.io/media/" ||
      user.photo === "https://dantoto-eb44.restdb.io/media/undefined"
    ) {
      clone.querySelector(".photoTable").src = "./images/noPhoto.png";
    } else {
      clone.querySelector(".photoTable").src = user.photo;
    }
    clone.querySelector(".name").textContent = user.username;

    //console.log(user.wins);
    if (
      user.wins === undefined ||
      user.wins === "https://dantoto-eb44.restdb.io/media/undefined"
    ) {
      clone.querySelector(".wins").textContent = "0";
    } else {
      clone.querySelector(".wins").textContent = user.wins;
    }

    if (
      user.looses === undefined ||
      user.looses === "https://dantoto-eb44.restdb.io/media/undefined"
    ) {
      clone.querySelector(".looses").textContent = "0";
    } else {
      clone.querySelector(".looses").textContent = user.looses;
    }

    if (
      user.rating === undefined ||
      user.rating === "https://dantoto-eb44.restdb.io/media/undefined"
    ) {
      clone.querySelector(".rating").textContent = "0";
    } else {
      clone.querySelector(".rating").textContent = user.rating;
    }

    let removeButtonId = "removeButton" + user.id;
    clone.querySelector(".removeButton").id = removeButtonId;
    removeButtonObject = clone.querySelector(".removeButton");
    removeButtonObject.addEventListener("click", e => {
      showWarning(user.id);
    });

    //warning modal cloned
    clone2.querySelector(".warningWrapper").id = "warningWrapper" + user.id;

    //console.log(user.id);
    let rows = clone.querySelectorAll(".row");
    rows.forEach(row => {
      row.addEventListener("click", e => {
        showModal(user.id);
        document.querySelector("#deactivateButton").style.display = "block";
      });
    });

    //warning modal closing
    let warningCloses = clone2.querySelectorAll(".warningClose");
    warningCloses.forEach(warningClose => {
      warningClose.addEventListener("click", e => {
        hideWarning(user.id);
      });
    });

    //warning modal delete buttons
    let deleteButtons = clone2.querySelectorAll(".deleteButton");
    deleteButtons.forEach(delButton => {
      delButton.addEventListener("click", e => {
        deleteUser(user.id);
      });
    });

    document.querySelector("#table1").appendChild(clone);
    document.querySelector("#parent2").appendChild(clone2);
  });
}

function showWarning(id) {
  let devID = "#warningWrapper" + id;
  document.querySelector(devID).style.display = "block";
  //alert("warning alert");
}

function hideWarning(id) {
  let devID = "#warningWrapper" + id;
  document.querySelector(devID).style.display = "none";
}

/*---------------------------------------------------------------displaying table 2 content - with object-----------------------------------------------------------------*/

function displayDeactivated(deactivatedList) {
  deactivatedList.forEach(user => {
    const template = document.querySelector("#template1").content;
    const clone = template.cloneNode(true);
    //console.log(clone);

    if (user.photo != null) {
      if (
        user.photo === "https://dantoto-eb44.restdb.io/media/" ||
        user.photo === "https://dantoto-eb44.restdb.io/media/undefined"
      ) {
        clone.querySelector(".photoTable").src = "./images/noPhoto.png";
      } else {
        clone.querySelector(".photoTable").src = user.photo;
      }
    }

    if (
      user.wins === undefined ||
      user.wins === "https://dantoto-eb44.restdb.io/media/undefined"
    ) {
      clone.querySelector(".wins").textContent = "0";
    } else {
      clone.querySelector(".wins").textContent = user.wins;
    }

    if (
      user.looses === undefined ||
      user.looses === "https://dantoto-eb44.restdb.io/media/undefined"
    ) {
      clone.querySelector(".looses").textContent = "0";
    } else {
      clone.querySelector(".looses").textContent = user.looses;
    }

    if (
      user.rating === undefined ||
      user.rating === "https://dantoto-eb44.restdb.io/media/undefined"
    ) {
      clone.querySelector(".rating").textContent = "0";
    } else {
      clone.querySelector(".rating").textContent = user.rating;
    }

    clone.querySelector(".name").textContent = user.username;
    //clone.querySelector(".removeButton").id = "removeButton" + user.id;
    let removeButtonId = "removeButton" + user.id;
    clone.querySelector(".removeButton").id = removeButtonId;
    removeButtonObject = clone.querySelector(".removeButton");
    removeButtonObject.addEventListener("click", e => {
      showWarning(user.id);
      //console.log(user.username);
    });
    let rows = clone.querySelectorAll(".row");
    rows.forEach(row => {
      row.addEventListener("click", e => {
        showModal(user.id);
        document.querySelector("#deactivateButton").style.display = "none";
      });
    });
    document.querySelector("#table2").appendChild(clone);
    document.querySelector("#table2Wrapper").classList.remove("invisible");
  });
  if (deactivatedList.length == 0) {
    document.querySelector("#table2Wrapper").classList.add("invisible");
  }
}

/*---------------------------------------------------------------deleting from database-----------------------------------------------------------------*/

function deleteUser(id) {
  //deleting from the database

  fetch("https://dantoto-eb44.restdb.io/rest/dantoto-users/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce6c77b780a473c8df5cb6d",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {});
  //deleting from the object
  let arrayId = findById(id, arrayOfUsers);
  if (arrayId < 0) {
    //removing from deactivated
    arrayId = findById(id, deactivatedList);
    deactivatedList.splice(arrayId, 1);
  } else {
    //removing from users
    arrayOfUsers.splice(arrayId, 1);
  }

  //updating the table view
  hideWarning(id);
  displayUsers(arrayOfUsers);
  displayDeactivated(deactivatedList);
}

function findById(id, arrayToCheck) {
  //as this function checks both arrays,array to check has to be passed
  return arrayToCheck.findIndex(obj => obj.id === id); //the function finds ID of a user in the object (ID in function "deleteTask" argument is an ID number from the database (different than in object)
}

/*---------------------------------------------------------------------modal---------------------------------------------------------------------------*/
function showModal(id) {
  //console.log(id);

  fetch("https://dantoto-eb44.restdb.io/rest/dantoto-users/" + id, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ce6c77b780a473c8df5cb6d",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      modal.style.display = "block";
      let photo = document.querySelector(".photoModal");
      let username = document.querySelector("#Username");
      let fullname = document.querySelector("#Fullname");
      let email = document.querySelector("#Email");
      let telephone = document.querySelector("#Telephone");
      let address = document.querySelector("#Address");
      let button = document.querySelector("#deactivateButton");
      //console.log(data.Photo);

      if (data.Photo === undefined || data.Photo.length === 0) {
        photo.src = "./images/noPhoto.png";
      } else {
        photo.src = "https://dantoto-eb44.restdb.io/media/" + data.Photo;
      }

      if (data.Fullname === undefined) {
        fullname.textContent = ".....";
      } else {
        fullname.textContent = data.Fullname;
      }

      if (data.Telephone === undefined) {
        telephone.textContent = ".....";
      } else {
        telephone.textContent = data.Telephone;
      }

      if (data.Address === undefined) {
        address.textContent = ".....";
      } else {
        address.textContent = data.Address;
      }

      username.textContent = data.Username;

      email.textContent = data.Email;

      modalClose.onclick = function() {
        hideModal();
      };
      button.onclick = function() {
        deactivateUser(id);
      };
    });
}

function hideModal() {
  modal.style.display = "none";
}

function deactivateUser(id) {
  let rowNo = findById(id, arrayOfUsers);
  deactivatedList.push(arrayOfUsers[rowNo]);
  let obj = arrayOfUsers.splice(rowNo, 1); //the variable has a value of a number so it can be used as index in splice
  displayUsers(arrayOfUsers);
  hideModal();
  displayDeactivated(deactivatedList);
  hideModal();
}
