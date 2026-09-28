export function procurarNumeroTarefas(tarefas, categoria) {
  return tarefas.reduce((ac, tarefa) => {
    if (tarefa.concluido === categoria) return ++ac;
    return ac;
  }, 0);
}

export function procurarNumeroTarefasAtrasadas(tarefas) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return tarefas.reduce((ac, tarefa) => {
    const dataTarefa = new Date(tarefa.dia + "T00:00:00");

    if (dataTarefa < hoje && !tarefa.concluido) return ++ac;
    return ac;
  }, 0);
}

export function apagarTarefasAtrasadas(tarefas) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return tarefas.filter((tarefa) => {
    if (tarefa.dataLimite == null || (tarefa.dataLimite > hoje && !tarefa.concluido)) {
      return true;
    }
    return false;
  });
}

export function salvarTarefas(novasTarefas, setTarefas) {
  setTarefas(novasTarefas);
  localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
}

export function removerTarefa(id, tarefas, setTarefas) {
  const filtradas = tarefas.filter((t) => t.id !== id);
  salvarTarefas(filtradas, setTarefas);
}