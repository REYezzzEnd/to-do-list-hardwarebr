import { toast } from 'sonner';
import { salvarTarefas } from "../../assets/functions/tarefas";
import { DivPrincipal } from "./DivPrincipal";
import { InputFormulario } from "./InputFormulario";
import { LabelFormulario } from "./LabelFormulario";
import { SelectFormulario } from "./SelectFormulario";

export function FormularioTarefas({
    tarefas,
    setTarefas,
    setIsOpen
}) {
    const adicionarTarefa = (e) => {
        e.preventDefault();

        const formulario = e.currentTarget;

        const titulo = formulario.tarefa.value.trim();
        const descricao = formulario.descricao.value.trim();
        const prioridade = formulario.prioridade.value;
        const dia = formulario.dia.value;

        if (!titulo) {
            toast.error('O título da tarefa é obrigatório.');
            return;
        }

        if (!dia) {
            toast.error('Selecione uma data para a tarefa.');
            return;
        }

        const novaTarefa = {
            id: Date.now(),
            titulo,
            descricao,
            prioridade,
            dia,
            dataLimite: null,
            concluido: false,
        };

        const ordemPrioridade = {
            ALTA: 1,
            MEDIA: 2,
            BAIXA: 3
        };

        const novasTarefas = [...tarefas, novaTarefa].sort(
            (a, b) =>
                ordemPrioridade[a.prioridade] -
                ordemPrioridade[b.prioridade]
        );

        salvarTarefas(novasTarefas, setTarefas);

        toast.success('Tarefa adicionada!', {
            description: `"${titulo}" foi adicionada à sua lista.`
        });

        formulario.reset();
        setIsOpen(false);
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
                        maxLength={8}
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

                    <SelectFormulario
                        name="prioridade"
                        id="prioridade"
                        defaultValue="MEDIA"
                    >
                        <option value="ALTA">Alta</option>
                        <option value="MEDIA">Média</option>
                        <option value="BAIXA">Baixa</option>
                    </SelectFormulario>
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