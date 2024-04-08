import axios from "axios";

const fetchEmployees = async () => {
  try {
    const res = await axios.get("/api/employees");
    console.log("Employees fetched successfully");
    return res.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

const createEmployee = async (employee) => {
  try {
    const res = await axios.post("/api/employees", employee);
    console.log("Employee created successfully");
    return true;
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

const deleteEmployeeById = async (id) => {
  try {
    const res = await axios.delete(`/api/employees/${id}`)
    console.log(res.data.message);
    return true
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

export { fetchEmployees, createEmployee, deleteEmployeeById };