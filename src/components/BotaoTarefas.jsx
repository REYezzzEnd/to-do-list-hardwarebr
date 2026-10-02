export function BotaoTarefas({
  onClick,
  children,
  className = '',
  type = 'button'
}) {
  return (
    <button
      type={type}
      className={`p-3 font-bold rounded-lg cursor-pointer transition-colors flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}