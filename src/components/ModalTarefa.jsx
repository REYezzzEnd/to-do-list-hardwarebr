import { X } from 'lucide-react';
import { DadosTarefa } from './DadosTarefa';
import { Modal } from './Modal';

export function ModalTarefa({
    setIsClose,
    tarefa,
    setTarefas,
    tarefas
}) {
    if (!tarefa) return null;

    return (
        <Modal>
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
        </Modal>
    );
}