export function LabelFormulario({ htmlFor,titulo = ""}) {
    return (
        <label htmlFor={htmlFor} className="block text-md font-medium text-gray-700 mb-1 text-center w-full">
            {titulo || htmlFor}
        </label>
    );
}