"use strict";


const apiUrlNames = "http://localhost:8083/api/users";
const userNameDropdownDiv = document.getElementById("userNameDropdownDiv");

const addBtn = document.getElementById("addBtn");

window.onload = () => {
    getUserNameDropdown();
    addBtn.onclick = onAddBtnClicked;
}


function getUserNameDropdown() {
    // Fetch data from API
    fetch('http://localhost:8083/api/users')
        .then(response => response.json())
        .then(data => {
            
            const select = document.createElement('select');
            select.id = "userNameDropdown";


            select.className = "form form-control container mb-4 w-25"


       


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

            
            userNameDropdownDiv.appendChild(select); 
            return userNameDropdown;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });

}

function onAddBtnClicked(){
    // console.log(userNameDropdown.value)
    let categoryDropdown = document.getElementById("categoryDropdown");
    console.log(categoryDropdown.value)
    let textArea = document.getElementById("textArea");
    let inputDate = document.getElementById("inputDate");
    let priorityDropdown = document.getElementById("priorityDropdown");
    let bodyData = {
        userid: userNameDropdown.value ,
        category: categoryDropdown.value ,
        description: textArea.value ,
        deadline: inputDate.value ,
        priority: priorityDropdown.value
    }

    fetch("http://localhost:8083/api/todos", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {"Content-type":
                    "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => {
        let messagePara =
        document.getElementById("messagePara");
        messagePara.className = "container text-center text-success"
        messagePara.innerHTML = "***New To Do Added***";
        userNameDropdown.value = '';
        categoryDropdown.selectedIndex = 0;
        textArea.value = '';
        inputDate.value = '';
        priorityDropdown.selectedIndex = 0;
        // console.log(json);
    })
    .catch(error => {
        console.error('Error adding To Do:', error);
    });
}
