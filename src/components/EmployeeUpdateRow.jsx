import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateEmployee } from "../api/employee.api";
import { FormInput } from "./FormInput";
import "./EmployeeRow.css"


export const EmployeeUpdateRow = ({ loadEmployees, table, employees }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 1
    }
  });

  const watchedId = watch("id");

  // check if input id matches an employee id
  useEffect(() => {
    const setInputsToEmployee = (employee) => {
      setValue("name", employee.name, { shouldValidate: true });
      setValue("code", employee.code, { shouldValidate: true });
      setValue("profession", employee.profession, { shouldValidate: true });
      setValue("color", employee.color);
      setValue("city", employee.city, { shouldValidate: true });
      setValue("branch", employee.branch, { shouldValidate: true });
      setValue("assigned", employee.assigned);
    }
  
    const setInputsToEmpty = () => {
      setValue("name", "");
      setValue("code", "");
      setValue("profession", "");
      setValue("color", "");
      setValue("city", "");
      setValue("branch", "");
      setValue("assigned", "");
    }

    const employeesWithId = employees.filter(emp => emp.id === Number(watchedId));
    if (employeesWithId.length === 1) {
      setInputsToEmployee(employeesWithId[0])
    } else {
      setInputsToEmpty();
    }
  }, [watchedId, employees]);

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
          type="number"
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
