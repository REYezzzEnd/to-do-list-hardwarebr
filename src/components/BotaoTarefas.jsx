export function BotaoTarefas({ onClick, children, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      className={`p-1.5 text-sm rounded cursor-pointer transition-colors flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}