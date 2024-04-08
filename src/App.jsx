import { useEffect, useState } from "react";
import { EmployeeTable } from "./components/EmployeeTable";
import { fetchEmployees } from "./api/employee.api";
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState();

  const loadEmployees = async () => {
    const employees = await fetchEmployees();
    if (employees) {
      setEmployees(employees);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Plexxis Employees</h1>
        {typeof employees === "undefined" ? (
          <span className="loading">Loading...</span>
        ) : (
          <EmployeeTable employees={employees} loadEmployees={loadEmployees} />
        )}
      </div>
    </div>
  );
};

export default App;
