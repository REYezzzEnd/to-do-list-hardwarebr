export function DivPrincipal({ children, className = "" }) {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md w-full max-w-2xl border border-gray-200 ${className}`}>
            {children}
        </div>
    );
}