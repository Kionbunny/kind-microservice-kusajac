<#list employees as emp>
  <div class="employee-card">
    <h3>${emp.firstName} ${emp.lastName}</h3>
    <p>Email: ${emp.email}</p>
    <p>Department: ${emp.department}</p>
    <p>Role: ${emp.role}</p>
    <button>Edit</button>
    <button>Delete</button>
  </div>
</#list>
