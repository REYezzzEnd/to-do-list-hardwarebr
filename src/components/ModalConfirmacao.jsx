import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { BotaoTarefas } from './BotaoTarefas';

export function ModalConfirmacao({
    titulo = 'Confirmar exclusão',
    mensagem,
    onConfirmar,
    onCancelar
}) {
    return (
        <Modal>
            <div className="flex flex-col items-center gap-4 text-center">

                <div className="text-red-500">
                    <AlertTriangle size={42} />
                </div>

                <h2 className="text-xl font-bold text-gray-800">
                    {titulo}
                </h2>

                <p className="text-gray-600">
                    {mensagem}
                </p>

                <div className="flex gap-3 w-full mt-2">

                    <BotaoTarefas
                        onClick={onCancelar}
                        className="bg-gray-400 hover:bg-gray-500 text-white w-1/2"
                    >
                        Cancelar
                    </BotaoTarefas>

                    <BotaoTarefas
                        onClick={onConfirmar}
                        className="bg-red-500 hover:bg-red-700 text-white w-1/2"
                    >
                        Excluir
                    </BotaoTarefas>

                </div>

            </div>
        </Modal>
    );
}