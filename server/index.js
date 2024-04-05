const express = require("express");
const cors = require("cors");
const app = express();
const employees = require("./data/employees.json");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/api/employees", (req, res, next) => {
  console.log("/api/employees");
  res.status(200).json(employees);
});

app.listen(8080, () =>
  console.log("Job Dispatch API running: http://localhost:8080")
);
