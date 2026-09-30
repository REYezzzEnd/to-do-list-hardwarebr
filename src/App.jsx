import { useState } from 'react';
import { Trash2, Check, Undo, ExternalLink } from 'lucide-react';
import { BotaoTarefas } from './components/BotaoTarefas';
import { ClassificacaoTarefa } from './components/ClassificacaoTarefa';
import { TarefasStatus } from './components/TarefasStatus';
import {
  procurarNumeroTarefas,
  procurarNumeroTarefasAtrasadas,
  salvarTarefas,
  removerTarefa
} from '../assets/functions/tarefas';
import { FormularioTarefas } from './components/FormularioTarefas';
import { ModalTarefa } from './components/ModalTarefa';

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  const [filtroDia, setFiltroDia] = useState('');
  const [filtroConcluido, setFiltroConcluido] = useState('');
  const [filtroPrioridade, setFiltroPrioridade] = useState('');
  const [isOpen, setIsClose] = useState(false);

  const alternarConcluido = (id) => {
    const atualizadas = tarefas.map((t) =>
      t.id === id ? { ...t, concluido: !t.concluido } : t
    );
    salvarTarefas(atualizadas, setTarefas);
  };

  const limparFiltros = () => {
    setFiltroDia('');
    setFiltroConcluido('');
    setFiltroPrioridade('');
  };

  const tarefasExibidas = tarefas.filter((tarefa) => {
    if (filtroDia && tarefa.dia !== filtroDia) return false;
    if (filtroConcluido !== '') {
      const eConcluido = filtroConcluido === 'true';
      if (tarefa.concluido !== eConcluido) return false;
    }
    if (filtroPrioridade !== '' && String(tarefa.prioridade) !== String(filtroPrioridade)) return false;
    return true;
  });

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10 bg-gray-50 min-h-screen">

      <div className="bg-white p-4 rounded shadow-md w-full max-w-md border border-gray-300">
        <h2 className="text-lg font-bold mb-2 text-gray-800 text-center underline">Adicionar Tarefa</h2>
        <FormularioTarefas tarefas={tarefas} setTarefas={setTarefas} />
      </div>

      <div className="bg-white p-4 shadow-md rounded w-full max-w-md border border-gray-200 flex flex-row justify-between gap-2 text-center">
        <TarefasStatus className="text-black" tipoTarefa="TOTAL" numeroTotalTarefas={tarefas.length} />
        <TarefasStatus className="text-yellow-500" tipoTarefa="PENDENTES" numeroTotalTarefas={procurarNumeroTarefas(tarefas, false)} />
        <TarefasStatus className="text-green-500" tipoTarefa="CONCLUÍDAS" numeroTotalTarefas={procurarNumeroTarefas(tarefas, true)} />
        <TarefasStatus className="text-red-500" tipoTarefa="ATRASADAS" numeroTotalTarefas={procurarNumeroTarefasAtrasadas(tarefas)} />
      </div>

      <div className="bg-white p-4 rounded shadow-md w-full max-w-md border border-gray-200">
        <div className="flex flex-col gap-3 mb-4">

          <div>
            <label htmlFor="filtro-dia" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="filtro-concluido" className="block text-sm font-medium text-gray-700 mb-1">
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
            <label htmlFor="filtro-prioridade" className="block text-sm font-medium text-gray-700 mb-1">
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
              onClick={() => {
                if (confirm('Tem certeza que deseja apagar todas as tarefas?')) {
                  salvarTarefas([], setTarefas);
                  localStorage.removeItem('tarefas');
                }
              }}
            >
              Excluir Todas
            </button>


          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-center underline">Lista de Tarefas</h2>

          <ul className="space-y-2 flex flex-col w-full">
            {tarefasExibidas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="flex items-center w-full justify-between border-b hover:bg-gray-50 transition-colors p-2 rounded"
              >
                <div className="flex flex-row gap-5 items-center">
                  <span className="text-md text-yellow-500 font-bold">#{tarefa.prioridade}</span>
                  <span className={`font-medium text-md ${tarefa.concluido ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {tarefa.titulo}
                  </span>
                   {isOpen && <ModalTarefa tarefa={tarefa} tarefas={tarefas} isOpen={isOpen} setIsClose={() => setIsClose(false)}/>}
                  <ClassificacaoTarefa tarefa={tarefa} />
                  <span className="text-sm text-black font-bold">Data: {tarefa.dia} </span>
                </div>

                <div className="flex items-center gap-1">
                  <BotaoTarefas
                    className='bg-gray-300 hover:bg-gray-400 text-black'
                    onClick={() => setIsClose(true)}>

                    <ExternalLink size={16} />
                  </BotaoTarefas>

                  <BotaoTarefas
                    className={tarefa.concluido ? "bg-amber-500 hover:bg-amber-600 text-white " : "  bg-green-500 hover:bg-green-600 text-white"}
                    onClick={() => alternarConcluido(tarefa.id)}
                  >
                    {tarefa.concluido ? <Undo size={16} /> : <Check size={16} />}
                  </BotaoTarefas>

                  <BotaoTarefas
                    className="bg-red-500 text-white hover:bg-red-800 "
                    onClick={() => removerTarefa(tarefa.id, tarefas, setTarefas)}
                  >
                    <Trash2 size={16} />
                  </BotaoTarefas>
                </div>
              </li>
            ))}
          </ul>
          
          {tarefasExibidas.length === 0 && (
            <p className="text-gray-400 text-sm text-center my-4">Nenhuma tarefa encontrada!</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;