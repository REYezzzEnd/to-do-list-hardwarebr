import { useState } from 'react'

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
              conteudo: conteudoTexto,
              prioridade: dadosFormulario.get('prioridade') || '0'
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

            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer font-bold mt-2 transition-colors">
              Adicionar
            </button>

            </form>
        </div>

        <div className="lista-tarefas bg-white p-4 rounded shadow-md w-full max-w-md border border-gray-200">
            <h2 className="text-lg font-bold mb-4 text-gray-800 text-center text-decoration-line: underline">Lista de Tarefas</h2>
            <ul className="space-y-2">
                {tarefas.map((tarefa) => (
                    <li key={tarefa.id} className="flex items-center justify-between py-2 border-b">
                        <div className="flex flex-">
                          <span className="font-medium text-gray-800">{tarefa.conteudo}</span>
                          <span className="text-xs text-gray-400">Prioridade: {tarefa.prioridade}</span>
                        </div>
                        <button
                            className="bg-red-500 text-white p-1.5 text-sm rounded hover:bg-red-600 cursor-pointer transition-colors"
                            onClick={() => {
                                const filtradas = tarefas.filter((t) => t.id !== tarefa.id);
                                setTarefas(filtradas);
                                meuStorage.setItem('tarefas', JSON.stringify(filtradas));
                            }}
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
            {tarefas.length === 0 && (
              <p className="text-gray-400 text-sm text-center">Nenhuma tarefa por enquanto!</p>
            )}
        </div>
    </div>
  )
}

export default App