import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then((response) => response.json())
      .then((employees) => setEmployees(employees));
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Plexxis Employees</h1>
        {typeof employees === "undefined" ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
                <th>Profession</th>
                <th>Color</th>
                <th>City</th>
                <th>Branch</th>
                <th>Assigned</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.code}</td>
                  <td>{employee.profession}</td>
                  <td
                    style={{
                      backgroundColor: employee.color,
                      color: employee.color ? "#ffffff" : "#000000",
                    }}
                  >
                    {employee.color}
                  </td>
                  <td>{employee.city}</td>
                  <td>{employee.branch}</td>
                  <td>{employee.assigned ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
