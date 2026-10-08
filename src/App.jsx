import { useState } from 'react';
import { toast } from 'sonner';

import { BotaoTarefas } from './components/BotaoTarefas';

import {
  salvarTarefas,
  removerTarefa,
  exibirTarefas
} from '../assets/functions/tarefas';

import { Toast } from './components/Toast';
import { DivStatusTarefa } from './components/DivStatusTarefa';
import { ModalTarefa } from './components/ModalTarefa';
import { ModalFormulario } from './components/ModalFormulario';
import { ModalConfirmacao } from './components/ModalConfirmacao';
import { ListaTarefas } from './components/ListaTarefas';
import { FiltrosTarefas } from './components/FiltrosTarefas';

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');

    return tarefasSalvas
      ? JSON.parse(tarefasSalvas)
      : [];
  });

  const [filtroDia, setFiltroDia] = useState('');
  const [filtroConcluido, setFiltroConcluido] = useState('');
  const [filtroPrioridade, setFiltroPrioridade] = useState('');

  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [exclusao, setExclusao] = useState(null);

  const alternarConcluido = (id) => {
    const tarefa = tarefas.find(
      (tarefa) => tarefa.id === id
    );

    const atualizadas = tarefas.map((tarefa) =>
      tarefa.id === id
        ? {
          ...tarefa,
          concluido: !tarefa.concluido
        }
        : tarefa
    );

    salvarTarefas(atualizadas, setTarefas);

    if (tarefa.concluido) {
      toast.info('Tarefa reaberta!', {
        description: `"${tarefa.titulo}" voltou para as tarefas pendentes.`
      });
    } else {
      toast.success('Tarefa concluída!', {
        description: `"${tarefa.titulo}" foi marcada como concluída.`
      });
    }
  };

  const limparFiltros = () => {
    setFiltroDia('');
    setFiltroConcluido('');
    setFiltroPrioridade('');

    toast.info('Filtros limpos!', {
      description: 'Todos os filtros foram removidos.'
    });
  };

  const excluirTodas = () => {
    if (tarefas.length === 0) {
      toast.warning('Não existem tarefas para excluir.');
      return;
    }

    setExclusao('todas');
  };

  const confirmarExclusaoTodas = () => {
    salvarTarefas([], setTarefas);

    setTarefaSelecionada(null);
    setExclusao(null);

    toast.success('Tarefas excluídas!', {
      description: 'Todas as tarefas foram removidas com sucesso.'
    });
  };

  const confirmarExclusaoTarefa = () => {
    const tarefaExcluida = exclusao;

    removerTarefa(
      tarefaExcluida.id,
      tarefas,
      setTarefas
    );

    if (tarefaSelecionada?.id === tarefaExcluida.id) {
      setTarefaSelecionada(null);
    }

    setExclusao(null);

    toast.success('Tarefa excluída!', {
      description: `"${tarefaExcluida.titulo}" foi removida da sua lista.`
    });
  };

  const tarefasExibidas = exibirTarefas(
    tarefas,
    filtroDia,
    filtroConcluido,
    filtroPrioridade
  );

  return (
    <div className="flex flex-col items-center justify-center  gap-6 p-6 bg-gray-50 min-h-screen">

      <Toast />

      <BotaoTarefas
        onClick={() => setIsOpenForm(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Clique Para Adicionar Alguma Tarefa
      </BotaoTarefas>

      {isOpenForm && (
        <ModalFormulario
          tarefas={tarefas}
          setTarefas={setTarefas}
          setIsOpen={setIsOpenForm}
        />
      )}

      <DivStatusTarefa tarefas={tarefas} />

      <FiltrosTarefas
        filtroDia={filtroDia}
        setFiltroDia={setFiltroDia}
        filtroConcluido={filtroConcluido}
        setFiltroConcluido={setFiltroConcluido}
        filtroPrioridade={filtroPrioridade}
        setFiltroPrioridade={setFiltroPrioridade}
        limparFiltros={limparFiltros}
        excluirTodas={excluirTodas}
      />


      <ListaTarefas
        tarefas={tarefasExibidas}
        setTarefaSelecionada={setTarefaSelecionada}
        alternarConcluido={alternarConcluido}
        setExclusao={setExclusao}
      />


      {tarefaSelecionada && (
        <ModalTarefa
          tarefa={tarefaSelecionada}
          tarefas={tarefas}
          setTarefas={setTarefas}
          setIsClose={() =>
            setTarefaSelecionada(null)
          }
        />
      )}

      {exclusao && (
        <ModalConfirmacao
          titulo={
            exclusao === 'todas'
              ? 'Excluir todas as tarefas?'
              : 'Excluir tarefa?'
          }

          mensagem={
            exclusao === 'todas'
              ? 'Todas as tarefas serão excluídas permanentemente.'
              : `A tarefa "${exclusao.titulo}" será excluída permanentemente.`
          }

          onConfirmar={
            exclusao === 'todas'
              ? confirmarExclusaoTodas
              : confirmarExclusaoTarefa
          }

          onCancelar={() => setExclusao(null)}
        />
      )}

    </div>
  );
}

export default App;