import { useForm } from "react-hook-form";
import axios from "axios";
import "./EmployeeForm.css"

export const EmployeeForm = ({ fetchEmployees }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "Jason Kepler",
      code: "F100",
      profession: "Runner",
      color: "green",
      city: "Victoria",
      branch: "Tech",
      assigned: false
    }
  });

  async function addEmployee(employee) {
    axios
      .post("/api/employees", employee)
      .then((res) => {
        console.log(res);
        fetchEmployees();
      })

  }
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        addEmployee(data);
      })}>

      <label htmlFor="name">Name</label>
      <input {...register("name", { required: true })} placeholder="Name" id="name"/>

      <label htmlFor="code">Code</label>
      <input {...register("code", { required: true })} placeholder="Code" id="code"/>

      <label htmlFor="profession">Profession</label>
      <input {...register("profession", { required: true })} placeholder="Profession" id="profession"/>

      <label htmlFor="color">Color</label>
      <input {...register("color", { required: true })} placeholder="Color" id="color"/>

      <label htmlFor="city">City</label>
      <input {...register("city", { required: true })} placeholder="City" id="city"/>

      <label htmlFor="branch">Branch</label>
      <input {...register("branch", { required: true })} placeholder="Branch" id="branch"/>

      <label htmlFor="assigned">Assigned</label>
      <input {...register("assigned")} placeholder="Assigned" id="assigned"/>

      <input type="submit" />
    </form>
  );
}