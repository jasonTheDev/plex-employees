import axios from "axios";

async function createEmployee(employee) {
  try {
    const res = await axios.post("/api/employees", employee);
    console.log("Employee created successfully");
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

async function deleteEmployeeById(id) {
  try {
    const res = await axios.delete(`/api/employees/${id}`)
    console.log(res.data.message);
    return true
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

export { createEmployee, deleteEmployeeById };