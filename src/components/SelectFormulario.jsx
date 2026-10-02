export function SelectFormulario({
    name,
    id,
    value,
    defaultValue,
    onChange,
    children
}) {
    return (
        <select
            name={name}
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
        >
            {children}
        </select>
    );
}
