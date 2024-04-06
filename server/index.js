const express = require("express");
const cors = require("cors");
const app = express();
const employees = require("./data/employees.json");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());


app.get("/api/employees", (req, res) => {
  console.log("GET: /api/employees");
  res.status(200).json(employees);
});

app.delete("/api/employees/:id", (req, res) => {
  console.log("DELETE: /api/employees/:id");
  const { id } = req.params;
  const match = employees.find(emp => emp.id === Number(id));
  if (typeof match === 'undefined') {
    res.status(404).json({ message: "Employee not found" });
  }
  employees.filter(emp => emp.id !== Number(id));
  res.status(200).json({ message: "Employee deleted successfully" });
});

app.post("/api/employees", (req, res) => {
  console.log("POST: /api/employees");
  const length = employees.length;
  var new_id = 1;
  if (length !== 0) {
    // get the id of the last employee and add 1 to that
    new_id = employees[length - 1].id + 1;
  }
  const new_employee = {id: new_id, ...req.body};
  employees.push(new_employee);
  res.status(200).json(new_employee);
});

app.listen(8080, () =>
  console.log("Job Dispatch API running: http://localhost:8080")
);
