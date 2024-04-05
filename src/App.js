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
      <h1>Plexxis Employees</h1>
      {typeof employees === "undefined" ? <p>Loading...</p> : <p>{employees[0].id}</p>}
    </div>
  );
}

export default App;
