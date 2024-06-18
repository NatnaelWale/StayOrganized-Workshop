"use strict";


const apiUrlNames = "http://localhost:8083/api/users";
const userNameDropdown = document.getElementById("userNameDropdown");

window.onload = () => {
    getUserNameDropdown( );
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
