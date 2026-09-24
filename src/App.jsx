import { useState } from 'react'
import { Trash2 } from 'lucide-react';

function App() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  const meuStorage = localStorage;

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 border-none bg-gray-50 min-h-screen">
      <div className="aba-adicionar bg-white p-4 rounded shadow-md w-full max-w-md border border-gray-300">
        <h2 className="text-lg font-bold mb-2 text-gray-800 text-center text-decoration-line: underline">Adicionar Tarefa</h2>

        <form className='p-4 rounded flex flex-col gap-3' onSubmit={(e) => {
          e.preventDefault();
          const dadosFormulario = new FormData(e.target);
          const conteudoTexto = dadosFormulario.get('tarefa').trim();

          if (conteudoTexto === '') return;

          const tarefa = {
            id: Date.now(),
            titulo: conteudoTexto,
            prioridade: dadosFormulario.get('prioridade') || '0',
            descricao: dadosFormulario.get('descricao') || '',
            dia: dadosFormulario.get('dia').toString().trim(),
            concluido: false
          };

          const novasTarefas = [...tarefas, tarefa];

          novasTarefas.sort((a, b) => a.prioridade - b.prioridade);
          setTarefas(novasTarefas);
          meuStorage.setItem('tarefas', JSON.stringify(novasTarefas));

          e.target.reset();
        }}>

          <div>
            <label htmlFor="tarefa" className="block text-md font-medium text-gray-700 mb-1 text-center">
              Tarefa
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
              name="tarefa"
              id="tarefa"
              placeholder='Digite a sua tarefa'
              required
            />
          </div>

          <div>
            <label htmlFor='descricao' className="block text-md font-medium text-gray-700 mb-1 text-center">
              Descrição da Tarefa
            </label>
            <textarea
              name='descricao'
              id='descricao'
              className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
              placeholder='Digite a descrição da tarefa'
            />
          </div>

          <div>
            <label htmlFor="prioridade-tarefa" className="block text-md font-medium text-gray-700 mb-1 text-center">
              Prioridade da Tarefa
            </label>
            <input
              type='number'
              name="prioridade"
              id="prioridade-tarefa"
              className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
              placeholder='Digite a prioridade da tarefa'
            />
          </div>

          <div>
            <label htmlFor='dia' className="block text-md font-medium text-gray-700 mb-1 text-center">
              Dia da Tarefa
            </label>
            <input
              type='date'
              name='dia'
              id='dia'
              className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer font-bold mt-2 transition-colors">
            Adicionar
          </button>

        </form>
      </div>

      <div className="lista-tarefas bg-white p-4 rounded shadow-md w-full max-w-md border border-gray-200">
        <div className='flex flex-col gap-4 mb-4 text-center'>
          <div>
            <label htmlFor="filtro" className="block text-md font-medium text-gray-700 mb-1 text-center">
              Filtrar por Dia
            </label>
            <input
              type='date'
              name='filtro'
              id='filtro'
              className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
              onChange={(e) => {
                const diaSelecionado = e.target.value;
                if (diaSelecionado === '') {
                  const tarefasSalvas = meuStorage.getItem('tarefas');
                  setTarefas(tarefasSalvas ? JSON.parse(tarefasSalvas) : []);
                } else {
                  const tarefasFiltradas = tarefas.filter((tarefa) => tarefa.dia === diaSelecionado);
                  setTarefas(tarefasFiltradas);
                }
              }}
            />
          </div>

          <div>
            <label htmlFor='concluida' className="block text-md font-medium text-gray-700 mb-1 text-center">
              Filtrar por Concluída
            </label>
            <select
              name='concluida'
              id='concluida'
              className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
              onChange={(e) => {
                const valorSelecionado = e.target.value;
                if (valorSelecionado === '') {
                  const tarefasSalvas = meuStorage.getItem('tarefas');
                  setTarefas(tarefasSalvas ? JSON.parse(tarefasSalvas) : []);
                } else {
                  const tarefasFiltradas = tarefas.filter((tarefa) => {
                    return valorSelecionado === 'true' ? tarefa.concluido : !tarefa.concluido;
                  });
                  setTarefas(tarefasFiltradas);
                }
              }}
            >
              <option value=''>Todas</option>
              <option value='true'>Concluídas</option>
              <option value='false'>Não Concluídas</option>
            </select>
          </div>

          <div>
            <label htmlFor='prioridade' className="block text-md font-medium text-gray-700 mb-1 text-center">
              Filtrar por Prioridade
            </label>
            <input
              type='number'
              name='prioridade'
              id='prioridade'
              className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
              placeholder='Digite a prioridade da tarefa'
              onChange={(e) => {
                const prioridadeSelecionada = e.target.value;
                if (prioridadeSelecionada === '') {
                  const tarefasSalvas = meuStorage.getItem('tarefas');
                  setTarefas(tarefasSalvas ? JSON.parse(tarefasSalvas) : []);
                } else {
                  const tarefasFiltradas = tarefas.filter((tarefa) => tarefa.prioridade === prioridadeSelecionada);
                  setTarefas(tarefasFiltradas);
                }
              }}
            />
          </div>

          <div>
            <button
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 cursor-pointer font-bold mt-2 transition-colors w-full"
              onClick={() => {
                const tarefasSalvas = meuStorage.getItem('tarefas');
                setTarefas(tarefasSalvas ? JSON.parse(tarefasSalvas) : []);
              }}
            >
              Limpar Filtros
            </button>

            <button
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer font-bold mt-2 transition-colors w-full"
              onClick={() => {
                if (!confirm('Tem certeza que deseja limpar todas as tarefas?')) {
                  return;
                }
                setTarefas([]);
                meuStorage.removeItem('tarefas');
              }}
            >
              Limpar Todas as Tarefas
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-800 text-center text-decoration-line: underline">Lista de Tarefas</h2>
          <ul className="space-y-2 flex flex-col w-full">
            {tarefas.map((tarefa) => (
              <li key={tarefa.id} className="flex items-center w-full justify-between py-2 border-b hover:bg-gray-100 transition-colors cursor-pointer px-2 rounded">

                <div className="flex flex-row gap-8 items-center w-full">
                  <span className="text-lg text-yellow-500 font-bold">#{tarefa.prioridade}.</span>
                  <span className="font-medium font-bold text-lg text-black-500">{tarefa.titulo}</span>
                  <span className="font-medium text-gray-100">
                    {(() => {
                      const diaTarefa = new Date(tarefa.dia + "T00:00:00");

                      const hoje = new Date();
                      hoje.setHours(0, 0, 0, 0);

                      return diaTarefa < hoje ? (
                        <span className="text-red-500">Atrasada</span>
                      ) : tarefa.concluido ? (
                        <span className="text-green-500">Concluída</span>
                      ) : (
                        <span className="text-blue-500">Pendente</span>
                      );
                    })()}
                  </span>
                </div>

                <button
                  className="bg-red-500 text-white p-1.5 text-sm rounded hover:bg-red-600 cursor-pointer transition-colors"
                  onClick={() => {
                    const filtradas = tarefas.filter((t) => t.id !== tarefa.id);
                    setTarefas(filtradas);
                    meuStorage.setItem('tarefas', JSON.stringify(filtradas));
                  }}
                >
                  <Trash2/>
                </button>
              </li>
            ))}
          </ul>
          {tarefas.length === 0 && (
            <p className="text-gray-400 text-sm text-center">Nenhuma tarefa por enquanto!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App