// import { useEffect, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import "./App.css";

function App() {
  const data = [
    { id: 1, name: "Joe" },
    { id: 2, name: "Kim" },
    { id: 3, name: "Kara" },
  ];

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // const [employees, setEmployees] = useState();

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/employees")
  //     .then((response) => response.json())
  //     .then((employees) => setEmployees(employees));
  // }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Plexxis Employees</h1>
        <table>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* {typeof employees === "undefined" ? (
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
        )} */}
      </div>
    </div>
  );
}

export default App;
