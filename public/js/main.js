$(document).ready(() => {
  // Fetch and display departments
  $.get('/departments', (departments) => {
    const departmentList = $('#departments');
    departmentList.empty();
    departments.forEach((department) => {
      departmentList.append(`<li>${department.name}</li>`);
    });
  });

  // Handle department form submission
  $('#departmentForm').submit((e) => {
    e.preventDefault();
    const departmentName = $('#departmentName').val();
    $.post('/departments', { name: departmentName }, (department) => {
      $('#departments').append(`<li>${department.name}</li>`);
      $('#departmentName').val('');
    });
  });

  // Fetch and display employees
  $.get('/employees', (employees) => {
    const employeeList = $('#employees');
    employeeList.empty();
    employees.forEach((employee) => {
      employeeList.append(`<li>${employee.firstName} ${employee.lastName} (${employee.department.name})</li>`);
    });
  });

  // Handle employee form submission
  $('#employeeForm').submit((e) => {
    e.preventDefault();
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const department = $('#department').val();
    $.post('/employees', { firstName, lastName, department }, (employee) => {
      $('#employees').append(`<li>${employee.firstName} ${employee.lastName} (${employee.department.name})</li>`);
      $('#firstName').val('');
      $('#lastName').val('');
      $('#department').val('');
    });
  });
});
