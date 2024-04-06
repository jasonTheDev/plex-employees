import { useEffect, useState } from "react";
import axios from 'axios'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    fetch("/api/employees")
    .then((response) => response.json())
    .then((employees) => setEmployees(employees));
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const reloadComponent = () => {
    fetchEmployees();
  }

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Code",
      accessorKey: "code",
    },
    {
      header: "Profession",
      accessorKey: "profession",
    },
    {
      header: "Color",
      accessorKey: "color",
    },
    {
      header: "City",
      accessorKey: "city",
    },
    {
      header: "Branch",
      accessorKey: "branch",
    },
    {
      header: "Assigned",
      accessorKey: "assigned",
    },
    {
      id: "delete",
      header: "Delete",
      cell: ({ row }) => (
        <button onClick={() => deleteEmployeeById(row.original.id)}>Delete</button>
      ),
    },
  ];

  function deleteEmployeeById(id) {
    console.log(`Row Id: ${id} ${typeof id}`);
    axios.delete(`/api/employees/${id}`)
    .then((response) => {
      console.log(`Response: ${response.data}`);
      reloadComponent();
    })
  }

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="App">
      <div className="container">
        <h1>Plexxis Employees</h1>

        <table>
          <thead>
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
          </thead>

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
      </div>
    </div>
  );
}

export default App;
