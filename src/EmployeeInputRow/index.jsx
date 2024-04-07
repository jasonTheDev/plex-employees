import { useForm } from "react-hook-form";
import axios from "axios";

export const EmployeeInputRow = ({ fetchEmployees, table }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Jason Kepler",
      code: "F100",
      profession: "Runner",
      color: "green",
      city: "Victoria",
      branch: "Tech",
      assigned: false,
    },
  });

  async function createEmployee(employee) {
    axios
      .post("/api/employees", employee)
      .then((res) => {
        console.log("Employee created successfully");
        fetchEmployees(); // reload employees
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  return (
    <>
      <tr id="spanned-row">
        <td colSpan={table.getCenterLeafColumns().length} align="center">
          <span className="add-employee">Add Employee</span>
        </td>
      </tr>
      <tr id="input-row">
        <td>-</td>
        <td>
          <input
            {...register("name", { required: "Required field" })}
            placeholder="Name"
            id="name"
          />
          <span>{errors.name?.message}</span>
        </td>
        <td>
          <input
            {...register("code", { required: true })}
            size="10"
            placeholder="Code"
            id="code"
          />
        </td>
        <td>
          <input
            {...register("profession", { required: true })}
            size="15"
            placeholder="Profession"
            id="profession"
          />
        </td>
        <td>
          <input
            {...register("color", { required: true })}
            size="10"
            placeholder="Color"
            id="color"
          />
        </td>
        <td>
          <input
            {...register("city", { required: true })}
            size="15"
            placeholder="City"
            id="city"
          />
        </td>
        <td>
          <input
            {...register("branch", { required: true })}
            size="15"
            placeholder="Branch"
            id="branch"
          />
        </td>
        <td>
          <select {...register("assigned")} id="assigned">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </td>
        <td>
          <button
            onClick={handleSubmit((data) => {
              data.assigned = data.assigned === "true";
              createEmployee(data);
            })}
          >
            Submit
          </button>
        </td>
      </tr>
    </>
  );
};
