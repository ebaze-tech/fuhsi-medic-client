// Select Input Component
export const SelectInput = ({
  label,
  name,
  value,
  onChange,
  error,
  options,
  className = "",
  required = false,
  disabled = false,
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className} mb-4`}>
      <label htmlFor={name} className="text-sm font-medium text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        className={`w-full px-4 py-2 rounded-lg border text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${
            disabled
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-white"
          }
          ${error ? "border-red-400" : "border-gray-300"}`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Improved TextInput Component
export const TextInput = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  className = "",
  required = false,
  disabled = false,
  textarea = false,
}) => {
  const baseClasses = `w-full px-4 py-2 rounded-lg border text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}
    ${error ? "border-red-400" : "border-gray-300"}`;

  return (
    <div className={`flex flex-col gap-1 w-full ${className} mb-4`}>
      <label htmlFor={name} className="text-sm font-medium text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseClasses} resize-y min-h-[120px]`}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={baseClasses}
        />
      )}
      {error && (
        <p className="text-sm text-red-600 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export const YesNoRadioGroup = ({
  label,
  yesName,
  noName,
  formData,
  onChange,
  error,
}) => {
  return (
    <tr className="!border-b !text-center !border-gray-200">
      <td className="!px-4 !py-2 !text-left !align-middle !w-[60%] !text-sm !text-gray-800">
        {label}
      </td>
      <td className="!px-4 !py-2 !align-middle">
        <input
          type="radio"
          name={yesName}
          checked={formData[yesName] === true}
          onChange={onChange}
          error={error}
          className="!form-radio !text-blue-600 !h-4 !w-4"
        />
      </td>
      <td className="!px-4 !py-2 !align-middle">
        <input
          type="radio"
          name={noName}
          checked={formData[noName] === true}
          onChange={onChange}
          className="!form-radio !text-red-600 !h-4 !w-4"
        />
      </td>
    </tr>
  );
};
