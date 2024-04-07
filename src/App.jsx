import { useEffect, useState } from "react";
import axios from 'axios'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import "./App.css";
import { EmployeeForm } from "./EmployeeForm";



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
      cell: ({ row }) => (row.original.assigned? "Yes": "No")
    },
    {
      id: "delete",
      header: "Delete",
      cell: ({ row }) => (
        <button onClick={() => deleteEmployeeById(row.original.id)}>Delete</button>
      ),
    },
  ];

  async function deleteEmployeeById(id) {
    // console.log(`Row Id: ${id} ${typeof id}`);
    axios.delete(`/api/employees/${id}`)
    .then((res) => {
      console.log(res.data.message);
      fetchEmployees(); // reload employees
    })
    .catch((err) => {
      console.error(err);
    });
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
        <EmployeeForm fetchEmployees={fetchEmployees}/>
      </div>
    </div>
  );
}

export default App;
