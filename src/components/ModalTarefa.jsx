import { X } from 'lucide-react';
import { DadosTarefa } from './DadosTarefa';

export function ModalTarefa({
    setIsClose,
    isOpen,
    tarefa,
    setTarefas,
    tarefas
}) {
    if (!isOpen || !tarefa) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white p-4 rounded-lg flex flex-col gap-3 w-full max-w-md shadow-lg">

                <button
                    type="button"
                    onClick={setIsClose}
                    className="text-black flex self-end hover:text-red-500 cursor-pointer"
                >
                    <X size={20} />
                </button>

                <DadosTarefa
                    tarefa={tarefa}
                    tarefas={tarefas}
                    setTarefas={setTarefas}
                />

            </div>
        </div>
    );
}