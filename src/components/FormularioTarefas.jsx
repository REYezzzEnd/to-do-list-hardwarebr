import { salvarTarefas } from "../../assets/functions/tarefas";
import { InputFormulario } from "./InputFormulario";
import { LabelFormulario } from "./LabelFormulario";

export function FormularioTarefas({ tarefas, setTarefas }) {
    const adicionarTarefa = (e) => {
        e.preventDefault();

        const dadosFormulario = new FormData(e.currentTarget);

        const titulo = dadosFormulario
            .get("tarefa")
            ?.toString()
            .trim();

        if (!titulo) return;

        const novaTarefa = {
            id: Date.now(),
            titulo,
            prioridade: dadosFormulario.get("prioridade") || "0",
            descricao: dadosFormulario.get("descricao") || "",
            dia: dadosFormulario.get("dia")?.toString().trim() || "",
            dataLimite: null,
            concluido: false,
        };

        const novasTarefas = [...tarefas, novaTarefa].sort(
            (a, b) => Number(a.prioridade) - Number(b.prioridade)
        );

        salvarTarefas(novasTarefas, setTarefas);

        e.currentTarget.reset();
    };

    return (
        <form
            className="p-2 rounded flex flex-col gap-3"
            onSubmit={adicionarTarefa}
        >
            <div>
                <LabelFormulario htmlFor="tarefa" />

                <InputFormulario
                    type="text"
                    name="tarefa"
                    id="tarefa"
                    placeholder="Digite a sua tarefa"
                    required={true}
                />
            </div>

            <div>
                <LabelFormulario htmlFor="descricao" />

                <textarea
                    name="descricao"
                    id="descricao"
                    placeholder="Digite a descrição da tarefa"
                    className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
                />
            </div>

            <div>
                <LabelFormulario
                    htmlFor="prioridade-tarefa"
                    titulo="Prioridade"
                />

                <InputFormulario
                    type="number"
                    name="prioridade"
                    id="prioridade-tarefa"
                    placeholder="Digite a prioridade da tarefa"
                    defaultValue="0"
                />
            </div>

            <div>
                <LabelFormulario
                    htmlFor="dia"
                    titulo="Dia da tarefa"
                />

                <InputFormulario
                    type="date"
                    name="dia"
                    id="dia"
                    required={true}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer font-bold mt-2 transition-colors"
            >
                Adicionar
            </button>
        </form>
    );
}