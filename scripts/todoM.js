"use strict";


const apiUrlNames = "http://localhost:8083/api/users";
const userNameDropdown = document.getElementById("userNameDropdown");
const addBtn = document.getElementById("addbtn");

window.onload = () => {
    getUserNameDropdown();
    addBtn.onclick = onAddBtn;
}

function getUserNameDropdown() {
    // Fetch data from API
    fetch('http://localhost:8083/api/users')
        .then(response => response.json())
        .then(data => {
            
            const select = document.createElement('select');

            select.classList.add('form-control','mb-4');


            // Create default option
            const defaultOption = document.createElement('option');
            defaultOption.textContent = 'Select a user';
            defaultOption.value = '';

            select.appendChild(defaultOption);


            // Populate dropdown with names 
            data.forEach(user => {
                const option = document.createElement('option');
                option.textContent = user.name; 
                option.value = user.id; 
                select.appendChild(option);
            });

            
            userNameDropdown.appendChild(select); 
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });


}

function onAddBtn(){
    let bodyData = {
        userid: document.getElementById("userNameDropdown").value ,
        // category: document.getElementById("categoryDropdown").value ,
        description: document.getElementById("textArea").value ,
        deadline: document.getElementById("inputDate").value ,
        priority: document.getElementById("priorityDropdown").value ,


    }

    fetch("http://localhost:8083/api/todos", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {"Content-type":
                    "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => {
        let confirmationMessage =
        document.getElementById("confirmationMessage");
        confirmationMessage.innerHTML = "New To Do Added";
    })
    .catch(error => {
        console.error('Error adding To Do:', error);
    });
}