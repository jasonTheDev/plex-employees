export const FormInput = ({
  name,
  placeholder,
  type = "text",
  size = "15",
  register,
  errors,
  validator={ required: "Required field" },
}) => (
  <td className="input-td">
    <input
      {...register(name, validator)}
      type={type}
      size={size}
      placeholder={placeholder}
    />
    {errors[name] && (
      <span className="form-error"> {errors[name].message}</span>
    )}
  </td>
);
