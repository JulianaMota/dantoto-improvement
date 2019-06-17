let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modalClose");
let arrayOfDeactivated = [];
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

    let rows = clone.querySelectorAll(".row");
    rows.forEach(row => {
      row.addEventListener("click", e => {
        showModal(user.id);
        document.querySelector("#deactivateButton").style.display = "block";
        document.querySelector("#activateButton").style.display = "none";
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
    document.querySelector("#main").appendChild(clone2);
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
        document.querySelector("#activateButton").style.display = "block";
      });
    });
    document.querySelector("#table2").appendChild(clone);
    document.querySelector("#table2Wrapper").classList.remove("invisible");
  });
  if (deactivatedList.length == 0) {
    document.querySelector("#table2Wrapper").classList.add("invisible");
  }
}

/*---------------------------------------------------------------deleting from the database-----------------------------------------------------------------*/

function deleteUser(id) {
  //deleting from the database by "delete" method:
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

  let arrayId = findUserById(id, arrayOfUsers);
  if (arrayId < 0) {
    //removing from array of deactivated
    arrayId = findUserById(id, arrayOfDeactivated);
    arrayOfDeactivated.splice(arrayId, 1);
  } else {
    //removing from array of users
    arrayOfUsers.splice(arrayId, 1);
  }

  //updating the table view
  hideWarning(id);
  displayUsers(arrayOfUsers);
  displayDeactivated(arrayOfDeactivated);
}

function findUserById(id, arrayToCheck) {
  // this function can check both arrays, so "arrayToCheck" has to be passed
  return arrayToCheck.findIndex(obj => obj.id === id); //This function finds index of a user with given ID in the defined array. If it finds such a user it returns index number (can be used as a row number in a table), if it does not find user with such id it returns "-1"
}

/*---------------------------------------------------------------------modal with user details---------------------------------------------------------------------------*/
function showModal(id) {
  //the if statement below checks which table was clicked, so if it should display data of a user from arrayOfUsers or from arrayOfDeactivated
  let rowNoUsers = findUserById(id, arrayOfUsers);
  let rowNoDeactivated = findUserById(id, arrayOfDeactivated);

  let data;
  if (rowNoUsers < 0) {
    data = arrayOfDeactivated[rowNoDeactivated];
  } else {
    data = arrayOfUsers[rowNoUsers];
  }

  modal.style.display = "block";
  let photo = document.querySelector(".photoModal");
  let username = document.querySelector("#Username");
  let fullname = document.querySelector("#Fullname");
  let email = document.querySelector("#Email");
  let telephone = document.querySelector("#Telephone");
  let address = document.querySelector("#Address");
  let deactivateButton = document.querySelector("#deactivateButton");
  let activateButton = document.querySelector("#activateButton");

  //the if statements below are used to decide what will be displayed if there is no information about user in one of categories in the database (no photo, no address etc.)
  if (
    data.photo === "https://dantoto-eb44.restdb.io/media/" ||
    data.photo === "https://dantoto-eb44.restdb.io/media/undefined"
  ) {
    photo.src = "./images/noPhoto.png";
  } else {
    photo.src = data.photo;
  }

  if (data.fullname === undefined) {
    fullname.textContent = ".....";
  } else {
    fullname.textContent = data.fullname;
  }

  if (data.telephone === undefined) {
    telephone.textContent = ".....";
  } else {
    telephone.textContent = data.telephone;
  }

  if (data.address === undefined) {
    address.textContent = ".....";
  } else {
    address.textContent = data.address;
  }

  username.textContent = data.username;

  email.textContent = data.email;

  modalClose.onclick = function() {
    hideModal();
  };
  deactivateButton.onclick = function() {
    deactivateUser(id);
  };

  activateButton.onclick = function() {
    activateUser(id);
  };
}

function hideModal() {
  modal.style.display = "none";
}

function deactivateUser(id) {
  let rowNo = findUserById(id, arrayOfUsers);
  arrayOfDeactivated.push(arrayOfUsers[rowNo]);
  arrayOfUsers.splice(rowNo, 1); //the variable rowNo has a value of a number so it can be used as index in splice method
  displayUsers(arrayOfUsers);
  hideModal();
  displayDeactivated(arrayOfDeactivated);

  hideModal();
}

function activateUser(id) {
  //alert("activateUser");
  let rowNo = findUserById(id, arrayOfDeactivated);
  arrayOfUsers.push(arrayOfDeactivated[rowNo]);
  arrayOfDeactivated.splice(rowNo, 1);
  displayUsers(arrayOfUsers);
  displayDeactivated(arrayOfDeactivated);
  hideModal();
}

//filtering

let filteredAccounts = arrayOfUsers;
let filteredDeactivatedAccounts = arrayOfDeactivated;
//console.log(filteredAccounts);
//console.log(filteredDeactivatedAccounts);

document.querySelector("#soft").addEventListener("click", function() {
  filteredDeactivatedAccounts = arrayOfDeactivated.filter(function(user) {
    return user.fullname === undefined;
  });
  filteredAccounts = arrayOfUsers.filter(function(user) {
    return user.fullname === undefined;
  });
  displayUsers(filteredAccounts);
  displayDeactivated(filteredDeactivatedAccounts);
});

document.querySelector("#full").addEventListener("click", function() {
  filteredDeactivatedAccounts = arrayOfDeactivated.filter(function(user) {
    return user.fullname !== undefined;
  });
  filteredAccounts = arrayOfUsers.filter(function(user) {
    return user.fullname !== undefined;
  });
  displayUsers(filteredAccounts);
  displayDeactivated(filteredDeactivatedAccounts);
});

document.querySelector("#all").addEventListener("click", function() {
  filteredAccounts = arrayOfUsers;
  displayUsers(filteredAccounts);
  displayDeactivated(arrayOfDeactivated);
});

document
  .querySelector("#username-active")
  .addEventListener("click", sortByUserName);
document.querySelector("#user-wins").addEventListener("click", sortByWins);
document.querySelector("#user-losses").addEventListener("click", sortByLosses);
document
  .querySelector("#user-rating")
  .addEventListener("click", sortByUserRating);

function sortByUserName() {
  function sort(a, b) {
    if (a.username < b.username) {
      return -1;
    } else {
      return 1;
    }
  }
  filteredAccounts.sort(sort);
  displayUsers(filteredAccounts);
  console.log(filteredAccounts);
}

function sortByWins() {
  function sort(a, b) {
    if (a.wins < b.wins) {
      return -1;
    } else {
      return 1;
    }
  }
  filteredAccounts.sort(sort);

  displayUsers(filteredAccounts);
  //console.log(filteredAccounts);
}

function sortByLosses() {
  function sort(a, b) {
    if (a.looses < b.looses) {
      return -1;
    } else {
      return 1;
    }
  }
  filteredAccounts.sort(sort);

  displayUsers(filteredAccounts);
  console.log(filteredAccounts);
}

function sortByUserRating() {
  function sort(a, b) {
    if (a.rating < b.rating) {
      return -1;
    } else {
      return 1;
    }
  }
  filteredAccounts.sort(sort);

  displayUsers(filteredAccounts);
  console.log(filteredAccounts);
}

//Sorting

// document
//   .querySelector("#username-active")
//   .addEventListener("click", sortByUserName);
// document.querySelector("#user-wins").addEventListener("click", sortByWins);
// document.querySelector("#user-losses").addEventListener("click", sortByLosses);
// document
//   .querySelector("#user-rating")
//   .addEventListener("click", sortByUserRating);

// let sortedUsers = arrayOfUsers;
// displayUsers(sortedUsers);
// //console.log(sortedUsers);

// function sortByUserName() {
//   function sort(a, b) {
//     if (a.username < b.username) {
//       return -1;
//     } else {
//       return 1;
//     }
//   }
//   sortedUsers.sort(sort);
//   displayUsers(sortedUsers);
//   //console.log(sortedUsers);
// }

// function sortByWins() {
//   function sort(a, b) {
//     if (a.wins < b.wins) {
//       return -1;
//     } else {
//       return 1;
//     }
//   }
//   sortedUsers.sort(sort);

//   displayUsers(sortedUsers);
//   //console.log(sortedUsers);
// }

// function sortByLosses() {
//   function sort(a, b) {
//     if (a.looses < b.looses) {
//       return -1;
//     } else {
//       return 1;
//     }
//   }
//   sortedUsers.sort(sort);

//   displayUsers(sortedUsers);
//   console.log(sortedUsers);
//   console.log(sortByLosses);
// }

// function sortByUserRating() {
//   function sort(a, b) {
//     if (a.rating < b.rating) {
//       return -1;
//     } else {
//       return 1;
//     }
//   }
//   sortedUsers.sort(sort);

//   displayUsers(sortedUsers);
//   //console.log(sortedUsers);
//   console.log(sortByLosses);
// }
