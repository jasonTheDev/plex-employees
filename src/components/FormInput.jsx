export const FormInput = ({
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
