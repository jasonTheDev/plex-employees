import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { EmployeeAddRow } from "./EmployeeAddRow";
import { EmployeeUpdateRow } from "./EmployeeUpdateRow";
import { deleteEmployeeById } from "../api/employee.api";
import "./EmployeeTable.css"

export const EmployeeTable = ({ employees, loadEmployees }) => {
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
        <button className="delete-button" onClick={() => handleDelete(row.original.id)}>X</button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    const success = await deleteEmployeeById(id);
    console.log("success", success);
    if (success) {
      loadEmployees();
    }
  };

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
        <EmployeeAddRow
          loadEmployees={loadEmployees}
          table={table}
        ></EmployeeAddRow>
        <EmployeeUpdateRow
          loadEmployees={loadEmployees}
          table={table}
          employees={employees}
        ></EmployeeUpdateRow>
      </tbody>
    </table>
  );
};
