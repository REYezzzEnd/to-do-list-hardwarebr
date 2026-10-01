export function Modal({ children }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-4 rounded-lg flex flex-col gap-3 w-full max-w-md shadow-lg">
                {children}
            </div>
        </div>
    );
}