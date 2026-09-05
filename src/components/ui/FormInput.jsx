export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  disabled = false,
  options,
  ...props
}) {
  const baseClasses =
    "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary-purple/50 focus:ring-1 focus:ring-primary-purple/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-300"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {type === "select" ? (

<select
  id={name}
  name={name}
  value={value}
  onChange={onChange}
  required={required}
  disabled={disabled}
  className={`${baseClasses} appearance-none cursor-pointer`}
  {...props}
>
  <option value="" className="text-gray-400 bg-[#0f0f1a]">
    Select an option
  </option>

  {options?.map((option) => (
    <option
      key={option.value}
      value={option.value}
      className="bg-[#0f0f1a] text-white"
    >
      {option.label}
    </option>
  ))}
</select>

 
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={4}
          className={`${baseClasses} resize-none`}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={baseClasses}
          {...props}
        />
      )}

      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
