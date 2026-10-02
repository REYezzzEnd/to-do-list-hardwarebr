import { useState } from 'react';
import { Trash2, Check, Undo, ExternalLink } from 'lucide-react';
import { BotaoTarefas } from './components/BotaoTarefas';
import { ClassificacaoTarefa } from './components/ClassificacaoTarefa';
import {
  salvarTarefas,
  removerTarefa,
  exibirTarefas
} from '../assets/functions/tarefas';
import { DivStatusTarefa } from './components/DivStatusTarefa';
import { ModalTarefa } from './components/ModalTarefa';
import { ModalFormulario } from './components/ModalFormulario';

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

  const alternarConcluido = (id) => {
    const atualizadas = tarefas.map((tarefa) =>
      tarefa.id === id
        ? {
          ...tarefa,
          concluido: !tarefa.concluido
        }
        : tarefa
    );

    salvarTarefas(atualizadas, setTarefas);
  };

  const limparFiltros = () => {
    setFiltroDia('');
    setFiltroConcluido('');
    setFiltroPrioridade('');
  };

  const excluirTodas = () => {
    if (!confirm('Tem certeza que deseja apagar todas as tarefas?')) {
      return;
    }

    salvarTarefas([], setTarefas);
    setTarefaSelecionada(null);
  };

  const tarefasExibidas = exibirTarefas(
    tarefas,
    filtroDia,
    filtroConcluido,
    filtroPrioridade
  );

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10 bg-gray-50 min-h-screen">


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

      <div className="bg-white p-4 rounded shadow-md w-full max-w-md border border-gray-200">

        <div className="flex flex-col gap-3 mb-4">

          <div>
            <label
              htmlFor="filtro-dia"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filtrar por Dia
            </label>

            <input
              type="date"
              id="filtro-dia"
              value={filtroDia}
              className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
              onChange={(e) => setFiltroDia(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="filtro-concluido"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filtrar por Status
            </label>

            <select
              id="filtro-concluido"
              value={filtroConcluido}
              className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
              onChange={(e) => setFiltroConcluido(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="true">Concluídas</option>
              <option value="false">Não Concluídas</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filtro-prioridade"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filtrar por Prioridade
            </label>

            <input
              type="number"
              id="filtro-prioridade"
              value={filtroPrioridade}
              placeholder="Digite a prioridade"
              className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
              onChange={(e) => setFiltroPrioridade(e.target.value)}
            />
          </div>

          <div className="flex gap-2 mt-2">

            <button
              type="button"
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 cursor-pointer font-bold transition-colors w-1/2 text-sm"
              onClick={limparFiltros}
            >
              Limpar Filtros
            </button>

            <button
              type="button"
              className="bg-red-500 text-white p-2 rounded hover:bg-red-800 cursor-pointer font-bold transition-colors w-1/2 text-sm"
              onClick={excluirTodas}
            >
              Excluir Todas
            </button>

          </div>

        </div>

        <div>

          <h2 className="text-lg font-bold mb-4 text-center underline">
            Lista de Tarefas
          </h2>

          <ul className="space-y-2 flex flex-col w-full">

            {tarefasExibidas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="flex items-center w-full justify-between border-b hover:bg-gray-50 transition-colors p-2 rounded"
              >

                <div className="flex flex-row gap-5 items-center">

                  <span className="text-md text-yellow-500 font-bold">
                    #{tarefa.prioridade}
                  </span>

                  <span
                    className={`font-medium text-md ${tarefa.concluido
                      ? 'line-through text-gray-400'
                      : 'text-gray-800'
                      }`}
                  >
                    {tarefa.titulo}
                  </span>

                  <ClassificacaoTarefa
                    tarefa={tarefa}
                  />

                  <span className="text-sm text-black font-bold">
                    Data: {tarefa.dia}
                  </span>

                </div>

                <div className="flex items-center gap-1">

                  <BotaoTarefas
                    className="bg-gray-300 hover:bg-gray-400 text-black"
                    onClick={() =>
                      setTarefaSelecionada(tarefa)
                    }
                  >
                    <ExternalLink size={16} />
                  </BotaoTarefas>

                  <BotaoTarefas
                    className={
                      tarefa.concluido
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }
                    onClick={() =>
                      alternarConcluido(tarefa.id)
                    }
                  >
                    {tarefa.concluido ? (
                      <Undo size={16} />
                    ) : (
                      <Check size={16} />
                    )}
                  </BotaoTarefas>

                  <BotaoTarefas
                    className="bg-red-500 text-white hover:bg-red-800"
                    onClick={() =>
                      removerTarefa(
                        tarefa.id,
                        tarefas,
                        setTarefas
                      )
                    }
                  >
                    <Trash2 size={16} />
                  </BotaoTarefas>

                </div>

              </li>
            ))}

          </ul>

          {tarefasExibidas.length === 0 && (
            <p className="text-gray-400 text-sm text-center my-4">
              Nenhuma tarefa encontrada!
            </p>
          )}

        </div>

      </div>

      {tarefaSelecionada && (
        <ModalTarefa
          tarefa={tarefaSelecionada}
          tarefas={tarefas}
          setTarefas={setTarefas}
          isOpen={true}
          setIsClose={() =>
            setTarefaSelecionada(null)
          }
        />
      )}

    </div>
  );
}

export default App;