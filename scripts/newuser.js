// Dropdown to populate categories   
const dropdown = document.getElementById('categoryDropdown');
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8083/api/categories')
        .then(response => response.json())
        .then(data => {
       
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;  // Assuming each category has an 'id' property
                option.textContent = category.name;  // Assuming each category has a 'name' property
                dropdown.appendChild(option);
            });
        })
});