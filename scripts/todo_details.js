"use strict";

const apiBaseUrl = "http://localhost:8083/api/todos";
let todoId;


const resultsDiv = document.getElementById("resultsDiv");
resultsDiv.className  = "container"

window.onload = () => {
    getToDoFromUrl();
    loadToDoData();
};

function getToDoFromUrl() {
    let UrlParams = new URLSearchParams(location.search);
    if(UrlParams.has("id")){
        todoId = UrlParams.get("id");
    };
};


function loadToDoData() {
    resultsDiv.innerHTML = "";
    fetchToDoData(apiBaseUrl)
    .then((data) => {
        displaySelectedToDo(data);
        // console.log(data)
    })
}

function fetchToDoData(apiUrl) {
    return fetch(apiUrl)
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching course data:', error));
  }
  
  function displaySelectedToDo(todos) {
    for (let selectedtodo of todos) { 
      if (selectedtodo.id == todoId) {
        displayToDoDetails(selectedtodo);
        console.log(selectedtodo)
      }
    }
  }
  
  function displayToDoDetails(todo) {
    let category = createToDoDetailElement("Category", todo.category);
    let description = createToDoDetailElement("Description", todo.description);
    let deadLine = createToDoDetailElement("DeadLine", todo.deadline);
    let priority = createToDoDetailElement("Priority", todo.priority)
  
    resultsDiv.appendChild(category);
    resultsDiv.appendChild(description);
    resultsDiv.appendChild(deadLine);
    resultsDiv.appendChild(priority);
  }
  
  function createToDoDetailElement(label, value) {
    let element = document.createElement("h5");
    element.innerHTML = `${label}: ${value}`;
    return element;
  }