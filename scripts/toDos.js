"use strict";

const userDropDown = document.getElementById("userDropDown");
const usersDetail = document.getElementById("usersDetail");

const apiUrl = "http://localhost:8083/api/users";
const userDetailsApiUrl = "http://localhost:8083/api/todos/byUser";

window.onload = () => {
  getUserDropDown();
  document.getElementById("userDropDownElement").onchange = (e) => {
    const userId = e.target.value;
    if (userId) {
      populateUserDetails(userId);
    }
  };
};

function getUserDropDown() {
  const selectUser = document.createElement("select");
  selectUser.id = "userDropDownElement";
  selectUser.className = "container form-control w-50";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        const option = document.createElement("option");
        option.textContent = user.name;
        option.value = user.id;
        selectUser.appendChild(option);
      });
    });
  userDropDown.appendChild(selectUser);
}

function populateUserDetails(userId) {
  usersDetail.innerHTML = "";
  fetch(`${userDetailsApiUrl}/${userId}`)
    .then((response) => response.json())
    .then((userData) => {
    //   console.log(userData);
      userData.forEach((task) => {
        console.log(task)
        const detailsDiv = document.createElement("div");
        detailsDiv.className = "container mt-4";

        let detaislCardDiv = document.createElement("div");
        detaislCardDiv.className = "d-flex";

        detailsDiv.appendChild(detaislCardDiv);
        let cardImage = document.createElement("img");
        cardImage.className = "cardImage card-img-top"
        cardImage.alt = task.completed;

        if(task.completed == true){
            cardImage.src = "/assets/img/Rigth sign Icon.jpg"
        } else {
            cardImage.src = "assets/img/Wrong sign Icon.jpg"
        }
        detaislCardDiv.appendChild(cardImage);

        let cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body py-4";

        detaislCardDiv.appendChild(cardBodyDiv);

        let taskCategory = document.createElement("h5");
        taskCategory.innerHTML = `<strong>Category:</strong> ${task.category}`;

        cardBodyDiv.appendChild(taskCategory)

        let taskDescription = document.createElement("p");
        taskDescription.innerHTML = `<strong>Description:</strong> ${task.description}`;

        cardBodyDiv.appendChild(taskDescription);

        let taskDeadline = document.createElement("p");
        taskDeadline.innerHTML = `<strong>Deadline:</strong> ${task.deadline}`

        cardBodyDiv.appendChild(taskDeadline);

        let seeDetails = document.createElement("a");
        seeDetails.className = "btn btn-primary";
        seeDetails.innerHTML = "See Details";
        seeDetails.href = `todo_details.html?id=${task.id}`

        cardBodyDiv.appendChild(seeDetails);

        usersDetail.appendChild(detailsDiv);
      });
    });
}
