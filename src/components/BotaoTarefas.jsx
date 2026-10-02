export function BotaoTarefas({ onClick, children, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      className={`p-2 font-bold mt-2 rounded cursor-pointer transition-colors flex items-center justify-center rounded  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}