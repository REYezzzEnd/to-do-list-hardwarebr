export function DivPrincipal({ children, className = "" }) {
    return (
        <div className={`bg-white p-4 rounded shadow-md w-full max-w-md border border-gray-300 ${className}`}>
            {children}
        </div>
    );
}