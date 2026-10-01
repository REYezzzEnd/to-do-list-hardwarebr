export function InputFormulario({
    type,
    name,
    id,
    required = false,
    placeholder = "",
    ...props
}) {
    return (
        <input
            type={type}
            name={name}
            id={id}
            className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
            placeholder={placeholder}
            required={required}
            {...props}
        />
    );
}