import { useForm } from "react-hook-form";
import axios from "axios";

export const EmployeeInputRow = ({ fetchEmployees, table }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   name: "Jason Kepler",
    //   code: "F100",
    //   profession: "Runner",
    //   color: "green",
    //   city: "Victoria",
    //   branch: "Tech",
    //   assigned: false,
    // },
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
          Add Employee
        </td>
      </tr>
      <tr>
        <td>-</td>
        <td className="input-td">
          <input
            {...register("name", { required: "Required field" })}
            placeholder="Name"
            id="name"
          />
          {errors.name && <span className="form-error"> {errors.name.message}</span>}
        </td>
        <td className="input-td">
          <input
            {...register("code", { required: "Required field" })}
            size="10"
            placeholder="Code"
            id="code"
          />
          {errors.code && <span className="form-error"> {errors.code.message}</span>}
        </td>
        <td className="input-td">
          <input
            {...register("profession", { required: "Required field" })}
            size="15"
            placeholder="Profession"
            id="profession"
          />
          {errors.profession && <span className="form-error"> {errors.profession.message}</span>}
        </td>
        <td className="input-td">
          <input
            {...register("color", { required: "Required field" })}
            size="10"
            placeholder="Color"
            id="color"
          />
          {errors.color && <span className="form-error"> {errors.color.message}</span>}
        </td>
        <td className="input-td">
          <input
            {...register("city", { required: "Required field" })}
            size="15"
            placeholder="City"
            id="city"
          />
          {errors.city && <span className="form-error"> {errors.city.message}</span>}
        </td>
        <td className="input-td">
          <input
            {...register("branch", { required: "Required field" })}
            size="15"
            placeholder="Branch"
            id="branch"
          />
          {errors.branch && <span className="form-error"> {errors.branch.message}</span>}
        </td>
        <td className="input-td">
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
