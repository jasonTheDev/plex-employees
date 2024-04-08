import { useForm } from "react-hook-form";
import { updateEmployee } from "../api/employee.api";
import { FormInput } from "./FormInput";
import "./EmployeeInputRow.css"


export const EmployeeUpdateRow = ({ loadEmployees, table }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 2,
      name: "Jason Kepler",
      code: "F100",
      profession: "Runner",
      color: "green",
      city: "Victoria",
      branch: "Tech",
      assigned: false,
    },
  });

  const prepareEmployeeData = (data) => {
    data.assigned = data.assigned === "true";
    if (data.color === "") {
      data.color = "green";
    }
  }

  const handleUpdate = async (data) => {
    prepareEmployeeData(data);
    const success = await updateEmployee(data);
    if (success) {
      loadEmployees();
    }
  }

  return (
    <>
      <tr id="spanned-row">
        <td colSpan={table.getCenterLeafColumns().length} align="center">
          Update Employee
        </td>
      </tr>
      <tr>
        <FormInput
          name="id"
          placeholder="ID"
          size="2"
          register={register}
          errors={errors}
          validator={{ required: "Required", min: 1 }}
        />
        <FormInput
          name="name"
          placeholder="Name"
          size="20"
          register={register}
          errors={errors}
        />
        <FormInput
          name="code"
          placeholder="Code"
          size="10"
          register={register}
          errors={errors}
          validator={{ required: "Required field", maxLength: 50 }}
        />
        <FormInput
          name="profession"
          placeholder="Profession"
          size="15"
          register={register}
          errors={errors}
        />
        <FormInput
          name="color"
          placeholder="Color"
          size="10"
          register={register}
          errors={errors}
          validator={{ maxLength: 50 }}
        />
        <FormInput
          name="city"
          placeholder="City"
          size="15"
          register={register}
          errors={errors}
        />
        <FormInput
          name="branch"
          placeholder="Branch"
          size="15"
          register={register}
          errors={errors}
        />
        <td className="input-td">
          <select {...register("assigned")} id="assigned">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </td>
        <td>
          <button
            className="submit-button"
            onClick={handleSubmit((data) => {
              handleUpdate(data);
            })}
          >
            Update
          </button>
        </td>
      </tr>
    </>
  );
};
