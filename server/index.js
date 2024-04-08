const express = require("express");
const cors = require("cors");
const app = express();
const employeeRouter = require("./routes/employee.routes.js");
const { createAndPopulateEmployeesTable } = require("./data/db.js")


const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use('/api/employees', employeeRouter);

// create and populate db before listen
createAndPopulateEmployeesTable().then(() => {
  app.listen(PORT, () =>
    console.log(`Job Dispatch API running: http://localhost:${PORT}`)
  );
});
