import { salvarTarefas } from "../../assets/functions/tarefas";
import { DivPrincipal } from "./DivPrincipal";
import { InputFormulario } from "./InputFormulario";
import { LabelFormulario } from "./LabelFormulario";

export function FormularioTarefas({ tarefas, setTarefas }) {
    const adicionarTarefa = (e) => {
        e.preventDefault();

        const formulario = e.currentTarget;

        const titulo = formulario.tarefa.value.trim();
        const descricao = formulario.descricao.value.trim();
        const prioridade = formulario.prioridade.value || "0";
        const dia = formulario.dia.value;

        if (!titulo || !dia) return;

        const novaTarefa = {
            id: Date.now(),
            titulo,
            descricao,
            prioridade,
            dia,
            dataLimite: null,
            concluido: false,
        };

        const novasTarefas = [...tarefas, novaTarefa].sort(
            (a, b) => Number(a.prioridade) - Number(b.prioridade)
        );

        salvarTarefas(novasTarefas, setTarefas);

        formulario.reset();
    };

    return (
        <DivPrincipal>
            <h2 className="text-lg font-bold mb-2 text-gray-800 text-center underline">
                Adicionar Tarefa
            </h2>

            <form
                onSubmit={adicionarTarefa}
                className="flex flex-col gap-3"
            >
                <div>
                    <LabelFormulario
                        htmlFor="tarefa"
                        titulo="Tarefa"
                    />

                    <InputFormulario
                        type="text"
                        name="tarefa"
                        id="tarefa"
                        placeholder="Digite a sua tarefa"
                        required
                    />
                </div>

                <div>
                    <LabelFormulario
                        htmlFor="descricao"
                        titulo="Descrição"
                    />

                    <textarea
                        name="descricao"
                        id="descricao"
                        placeholder="Digite a descrição da tarefa"
                        className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500 resize-none"
                        rows="3"
                    />
                </div>

                <div>
                    <LabelFormulario
                        htmlFor="prioridade"
                        titulo="Prioridade"
                    />

                    <InputFormulario
                        type="number"
                        name="prioridade"
                        id="prioridade"
                        placeholder="Digite a prioridade"
                        defaultValue="0"
                        min="0"
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
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer font-bold mt-2 transition-colors"
                >
                    Adicionar
                </button>
            </form>
        </DivPrincipal>
    );
}