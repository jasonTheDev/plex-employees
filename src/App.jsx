import { useEffect, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import "./App.css";
import { EmployeeInputRow } from "./EmployeeInputRow";
import { deleteEmployeeById } from "./api/employee.api"

function App() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    fetch("/api/employees")
      .then((response) => response.json())
      .then((employees) => setEmployees(employees));
  };

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
      cell: ({ row }) => (row.original.assigned ? "Yes" : "No"),
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) => (
        <button onClick={() => handleDelete(row.original.id)}>
          Delete
        </button>
      ),
    },
  ];

  async function handleDelete(id) {
    const success = await deleteEmployeeById(id);
    console.log("success", success);
    if (success) {
      fetchEmployees();
    }
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
        <form>
          <table className="employee-table">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <EmployeeInputRow
                fetchEmployees={fetchEmployees}
                table={table}
              ></EmployeeInputRow>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default App;
