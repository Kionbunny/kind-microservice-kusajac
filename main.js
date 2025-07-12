let filteredEmployees = [...employees];
let currentPage = 1;
let itemsPerPage = 10;

function renderEmployees() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const list = document.getElementById("employeeList");
  list.innerHTML = "";

  filteredEmployees.slice(start, end).forEach((emp) => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    list.appendChild(card);
  });

  renderPagination();
}

function openForm() {
  document.getElementById("formModal").classList.remove("hidden");
  document.getElementById("employeeForm").reset();
  document.getElementById("employeeId").value = "";
  document.getElementById("formTitle").innerText = "Add Employee";
}

function closeForm() {
  document.getElementById("formModal").classList.add("hidden");
}

function submitForm(e) {
  e.preventDefault();
  const id = document.getElementById("employeeId").value;
  const newEmp = {
    id: id ? parseInt(id) : Date.now(),
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    department: document.getElementById("department").value,
    role: document.getElementById("role").value,
  };

  if (id) {
    const index = employees.findIndex((e) => e.id == id);
    employees[index] = newEmp;
  } else {
    employees.push(newEmp);
  }

  filteredEmployees = [...employees];
  closeForm();
  renderEmployees();
}

function editEmployee(id) {
  const emp = employees.find((e) => e.id == id);
  openForm();
  document.getElementById("employeeId").value = emp.id;
  document.getElementById("firstName").value = emp.firstName;
  document.getElementById("lastName").value = emp.lastName;
  document.getElementById("email").value = emp.email;
  document.getElementById("department").value = emp.department;
  document.getElementById("role").value = emp.role;
  document.getElementById("formTitle").innerText = "Edit Employee";
}

function deleteEmployee(id) {
  const index = employees.findIndex((e) => e.id == id);
  if (index > -1) employees.splice(index, 1);
  filteredEmployees = [...employees];
  renderEmployees();
}

function applyFilters() {
  const name = document.getElementById("filterFirstName").value.toLowerCase();
  const dept = document.getElementById("filterDepartment").value.toLowerCase();
  const role = document.getElementById("filterRole").value.toLowerCase();

  filteredEmployees = employees.filter(
    (e) =>
      e.firstName.toLowerCase().includes(name) &&
      e.department.toLowerCase().includes(dept) &&
      e.role.toLowerCase().includes(role)
  );
  renderEmployees();
}

function resetFilters() {
  document.getElementById("filterFirstName").value = "";
  document.getElementById("filterDepartment").value = "";
  document.getElementById("filterRole").value = "";
  filteredEmployees = [...employees];
  renderEmployees();
}

function openFilter() {
  document.getElementById("filterSidebar").classList.toggle("hidden");
}

function applySort() {
  const sortKey = document.getElementById("sortBy").value;
  filteredEmployees.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  renderEmployees();
}

function changePagination() {
  itemsPerPage = parseInt(document.getElementById("itemsPerPage").value);
  renderEmployees();
}

function renderPagination() {
  const pageCount = Math.ceil(filteredEmployees.length / itemsPerPage);
  const container = document.getElementById("pagination");
  container.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderEmployees();
    };
    container.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", renderEmployees);
