import { FormularioTarefas } from "./FormularioTarefas";
import { Modal } from "./Modal";

export function ModalFormulario({ tarefas, setTarefas, setIsOpen }) {
    return (
        <Modal>
            <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="self-end text-gray-500 hover:text-red-500 font-bold"
            >
                X
            </button>

            <FormularioTarefas
                tarefas={tarefas}
                setTarefas={setTarefas}
                setIsOpen={setIsOpen}
            />
        </Modal>
    );
}