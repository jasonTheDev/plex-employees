import { useForm } from "react-hook-form";
import { createEmployee } from "../api/employee.api";
import { FormInput } from "./FormInput";
import "./EmployeeRow.css"


export const EmployeeAddRow = ({ loadEmployees, table }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const setInputsToEmpty = () => {
    setValue("name", "");
    setValue("code", "");
    setValue("profession", "");
    setValue("color", "");
    setValue("city", "");
    setValue("branch", "");
    setValue("assigned", "false");
  }

  const prepareEmployeeData = (data) => {
    data.assigned = data.assigned === "true";
    if (data.color === "") {
      data.color = "green";
    }
  }

  const handleAdd = async (data) => {
    prepareEmployeeData(data);
    const success = await createEmployee(data);
    if (success) {
      loadEmployees();
      setInputsToEmpty();
    }
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
              handleAdd(data);
            })}
          >
            Add
          </button>
        </td>
      </tr>
    </>
  );
};
