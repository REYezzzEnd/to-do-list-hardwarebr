import { Trash2, Check, Undo, ExternalLink } from 'lucide-react';
import { BotaoTarefas } from './BotaoTarefas';
import { ClassificacaoTarefa } from './ClassificacaoTarefa';
import { DivPrincipal } from './DivPrincipal';

export function ListaTarefas({
  tarefas,
  setTarefaSelecionada,
  alternarConcluido,
  setExclusao
}) {
  return (
    <DivPrincipal>
      <h2 className="text-xl font-bold mb-5 text-center underline">
        Lista de Tarefas
      </h2>

      <ul className="space-y-3 flex flex-col w-full">

        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className="flex items-center w-full justify-between border border-gray-200 hover:bg-gray-50 transition-colors p-4 rounded-lg"
          >

            <div className="flex flex-row gap-7 items-center">

              <span className="text-md text-yellow-500 font-bold">
                {tarefa.prioridade}
              </span>

              <span
                className={`font-medium text-md  ${
                  tarefa.concluido
                    ? 'line-through text-gray-400'
                    : 'text-gray-800'
                }`}
              >
                {tarefa.titulo}
              </span>

              <ClassificacaoTarefa tarefa={tarefa} />

              <span className="text-sm text-black   font-bold ">
                Data: {tarefa.dia}
              </span>

            </div>

            <div className="flex items-center gap-2">

              <BotaoTarefas
                className="bg-gray-300 hover:bg-gray-400 text-black"
                onClick={() => setTarefaSelecionada(tarefa)}
              >
                <ExternalLink size={18} />
              </BotaoTarefas>

              <BotaoTarefas
                className={
                  tarefa.concluido
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }
                onClick={() => alternarConcluido(tarefa.id)}
              >
                {tarefa.concluido ? (
                  <Undo size={18} />
                ) : (
                  <Check size={18} />
                )}
              </BotaoTarefas>

              <BotaoTarefas
                className="bg-red-500 text-white hover:bg-red-800"
                onClick={() => setExclusao(tarefa)}
              >
                <Trash2 size={18} />
              </BotaoTarefas>

            </div>

          </li>
        ))}

      </ul>

      {tarefas.length === 0 && (
        <p className="text-gray-400 text-sm text-center my-5">
          Nenhuma tarefa encontrada!
        </p>
      )}
    </DivPrincipal>
  );
}