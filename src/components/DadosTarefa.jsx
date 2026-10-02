import { useState } from "react";
import { salvarTarefas } from "../../assets/functions/tarefas";
import { InputFormulario } from "./InputFormulario";
import { LabelFormulario } from "./LabelFormulario";
import { SelectFormulario } from "./SelectFormulario";

export function DadosTarefa({ tarefa, tarefas, setTarefas }) {
    const [titulo, setTitulo] = useState(tarefa.titulo);
    const [descricao, setDescricao] = useState(tarefa.descricao || "");
    const [prioridade, setPrioridade] = useState(
        tarefa.prioridade || "MEDIA"
    );
    const [dia, setDia] = useState(tarefa.dia || "");

    const salvarEdicao = (e) => {
        e.preventDefault();

        if (!titulo.trim()) return;

        const ordemPrioridade = {
            ALTA: 1,
            MEDIA: 2,
            BAIXA: 3
        };

        const tarefasAtualizadas = tarefas
            .map((item) =>
                item.id === tarefa.id
                    ? {
                        ...item,
                        titulo: titulo.trim(),
                        descricao,
                        prioridade,
                        dia
                    }
                    : item
            )
            .sort(
                (a, b) =>
                    ordemPrioridade[a.prioridade] -
                    ordemPrioridade[b.prioridade]
            );

        salvarTarefas(tarefasAtualizadas, setTarefas);
    };

    return (
        <form
            onSubmit={salvarEdicao}
            className="flex flex-col gap-4 text-left"
        >
            <h2 className="text-xl font-bold text-center text-gray-800 underline">
                EDITAR TAREFA
            </h2>

            <div>
                <LabelFormulario
                    htmlFor="editar-tarefa"
                    titulo="Título"
                />

                <InputFormulario
                    type="text"
                    name="tarefa"
                    id="editar-tarefa"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required={true}
                />
            </div>

            <div>
                <LabelFormulario
                    htmlFor="editar-descricao"
                    titulo="Descrição"
                />

                <textarea
                    name="descricao"
                    id="editar-descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Digite a descrição da tarefa"
                    className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black focus:outline-blue-500 resize-none"
                    rows="3"
                />
            </div>

            <div>
                <LabelFormulario
                    htmlFor="editar-prioridade"
                    titulo="Prioridade"
                />

                <SelectFormulario
                    name="prioridade"
                    id="editar-prioridade"
                    value={prioridade}
                    onChange={(e) => setPrioridade(e.target.value)}
                >
                    <option value="ALTA">Alta</option>
                    <option value="MEDIA">Média</option>
                    <option value="BAIXA">Baixa</option>
                </SelectFormulario>
            </div>

            <div>
                <LabelFormulario
                    htmlFor="editar-dia"
                    titulo="Dia da tarefa"
                />

                <InputFormulario
                    type="date"
                    name="dia"
                    id="editar-dia"
                    value={dia}
                    onChange={(e) => setDia(e.target.value)}
                    required={true}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 cursor-pointer font-bold transition-colors"
            >
                Salvar Alterações
            </button>
        </form>
    );
}