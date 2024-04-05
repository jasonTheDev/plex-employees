const express = require("express");
const cors = require("cors");
const app = express();
const employees = require("./data/employees.json");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
  employees.filter(emp => emp.id !== id);
  res.status(200).json({ message: "Employee deleted successfully" });
});

app.listen(8080, () =>
  console.log("Job Dispatch API running: http://localhost:8080")
);
