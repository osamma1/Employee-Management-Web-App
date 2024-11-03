document.getElementById("employeeForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Collect input values
    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value.trim();
    const department = document.getElementById("department").value.trim();
    const salary = document.getElementById("salary").value.trim();

    // Validate input fields
    if (!name || !role || !department || !salary) {
        alert("Please fill in all fields.");
        return;
    }

    // Create an employee object
    const employee = { name, role, department, salary: parseFloat(salary) };
    
    // Save employee data to local storage
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
    
    // Provide user feedback and reset the form
    alert("Employee added successfully!");
    e.target.reset();
    displayEmployees();
});

// Function to display employees in the table
function displayEmployees() {
    const employeeTableBody = document.getElementById("employeeTableBody");
    employeeTableBody.innerHTML = ""; // Clear existing table body
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    // Populate table with employee data
    employees.forEach((emp, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.role}</td>
            <td>${emp.department}</td>
            <td>${emp.salary.toFixed(2)}</td> <!-- Format salary to 2 decimal places -->
            <td>
                <button onclick="deleteEmployee(${index})" class="btn btn-danger btn-sm">Delete</button>
            </td>
        `;
        employeeTableBody.appendChild(row);
    });
}

// Function to delete an employee from the list
function deleteEmployee(index) {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.splice(index, 1); // Remove employee at the specified index
    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees(); // Refresh the displayed list
}

// Initial call to display employees when the page loads
displayEmployees();
