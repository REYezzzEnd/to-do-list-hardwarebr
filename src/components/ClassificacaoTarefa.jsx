export function ClassificacaoTarefa({ tarefa }) {
  const diaTarefa = new Date(tarefa.dia + "T00:00:00");
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (tarefa.concluido) {
    return <span className="text-green-500 font-bold">Concluída</span>;
  }

  if (diaTarefa < hoje) {
    return <span className="text-red-500 font-bold">Atrasada</span>;
  }

  return <span className="text-blue-500 font-bold">Pendente</span>;
}