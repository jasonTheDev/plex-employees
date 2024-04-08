import { useForm } from "react-hook-form";
import axios from "axios";


const FormInput = ({
  name,
  placeholder,
  size = "15",
  register,
  errors,
  validator={ required: "Required field" },
}) => (
  <td className="input-td">
    <input
      {...register(name, validator)}
      size={size}
      placeholder={placeholder}
      id={name}
    />
    {errors[name] && (
      <span className="form-error"> {errors[name].message}</span>
    )}
  </td>
);

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

  const prepareEmployeeData = (data) => {
    data.assigned = data.assigned === "true";
    if (data.color === "") {
      data.color = "green";
    }
    return data;
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
            onClick={handleSubmit((data) => {
              data = prepareEmployeeData(data);
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
