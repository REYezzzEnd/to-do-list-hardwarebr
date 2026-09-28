export function TarefasStatus({ className, tipoTarefa, numeroTotalTarefas }) {
  return (
    <div className={`flex flex-col text-center font-bold p-1 ${className}`}>
      <p className="text-2xl">{numeroTotalTarefas}</p>
      <p className="text-sm">{tipoTarefa}</p>
    </div>
  );
}