// import { useForm } from "react-hook-form";
// import axios from "axios";

export const EmployeeRowForm = () => {
  // const { register, handleSubmit, formState: { errors } } = useForm({
  //   defaultValues: {
  //     name: "Jason Kepler",
  //     code: "F100",
  //     profession: "Runner",
  //     color: "green",
  //     city: "Victoria",
  //     branch: "Tech",
  //     assigned: false
  //   }
  // });

  // async function createEmployee(employee) {
  //   axios
  //     .post("/api/employees", employee)
  //     .then((res) => {
  //       console.log("Employee created successfully");
  //       fetchEmployees(); // reload employees
  //     })
  //     .catch((err) => {
  //       console.error(err.message);
  //     })

  // }
  return (
    <tr>
      <td>
        -
      </td>
      <td>
        <input placeholder="Name" id="name"/>
      </td>
      <td>
        <input placeholder="Code" id="code"/>
      </td>
      <td>
        <input placeholder="Profession" id="profession"/>
      </td>
      <td>
        <input placeholder="Color" id="color"/>
      </td>
      <td>
        <input placeholder="City" id="city"/>
      </td>
      <td>
        <input placeholder="Branch" id="branch"/>
      </td>
      <td>
        <select id="assigned">
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </td>
      <td>
        <input type="submit" />
      </td>
    </tr>
                              

    //   <label htmlFor="name">Name</label>
    //   <input {...register("name", { required: true })} placeholder="Name" id="name"/>

    //   <label htmlFor="code">Code</label>
    //   <input {...register("code", { required: true })} placeholder="Code" id="code"/>

    //   <label htmlFor="profession">Profession</label>
    //   <input {...register("profession", { required: true })} placeholder="Profession" id="profession"/>

    //   <label htmlFor="color">Color</label>
    //   <input {...register("color", { required: true })} placeholder="Color" id="color"/>

    //   <label htmlFor="city">City</label>
    //   <input {...register("city", { required: true })} placeholder="City" id="city"/>

    //   <label htmlFor="branch">Branch</label>
    //   <input {...register("branch", { required: true })} placeholder="Branch" id="branch"/>

    //   <label htmlFor="assigned">Assigned</label>
    //   <select {...register("assigned")} id="assigned">
    //     <option value="false">No</option>
    //     <option value="true">Yes</option>
    //   </select>
    //   <input type="submit" />
    // </form>
  );
}