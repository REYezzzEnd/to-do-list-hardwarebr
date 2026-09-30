import { X } from 'lucide-react';
import { FormularioTarefas } from './FormularioTarefas';
import { DadosTarefa } from './DadosTarefa';

export function ModalTarefa({ setIsClose, isOpen, tarefa, setTarefas, tarefas }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-2 rounded-lg text-center flex flex-col gap-2 w-full max-w-md">
                <button
                    onClick={setIsClose}
                    className="mt-4 text-black flex place-self-end hover:cursor-pointer m-0 p-0"
                >
                    <X size={16} />
                </button>
                <DadosTarefa tarefa={tarefa} setTarefas={setTarefas} tarefas={tarefas}  />

            </div>
        </div>
    );
}