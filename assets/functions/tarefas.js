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
        if (!tarefa.dia || tarefa.concluido) return ac;

        const dataTarefa = new Date(`${tarefa.dia}T00:00:00`);

        if (dataTarefa < hoje) {
            return ++ac;
        }

        return ac;
    }, 0);
}

export function apagarTarefasAtrasadas(tarefas) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return tarefas.filter((tarefa) => {
        if (!tarefa.dataLimite) {
            return true;
        }

        const dataLimite = new Date(tarefa.dataLimite);

        return dataLimite > hoje || tarefa.concluido;
    });
}

export function salvarTarefas(novasTarefas, setTarefas) {
    setTarefas(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
}

export function removerTarefa(id, tarefas, setTarefas) {
    const filtradas = tarefas.filter((tarefa) => tarefa.id !== id);

    salvarTarefas(filtradas, setTarefas);
}

export function exibirTarefas(
    tarefas,
    filtroDia,
    filtroConcluido,
    filtroPrioridade
) {
    return tarefas.filter((tarefa) => {
        if (filtroDia && tarefa.dia !== filtroDia) {
            return false;
        }

        if (filtroConcluido !== '') {
            const eConcluido = filtroConcluido === 'true';

            if (tarefa.concluido !== eConcluido) {
                return false;
            }
        }

        if (
            filtroPrioridade !== '' &&
            String(tarefa.prioridade) !== String(filtroPrioridade)
        ) {
            return false;
        }

        return true;
    });
}
