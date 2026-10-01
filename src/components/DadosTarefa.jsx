import { useState } from "react";
import { salvarTarefas } from "../../assets/functions/tarefas";
import { InputFormulario } from "./InputFormulario";
import { LabelFormulario } from "./LabelFormulario";

export function DadosTarefa({ tarefa, tarefas, setTarefas }) {
    const [titulo, setTitulo] = useState(tarefa.titulo);
    const [descricao, setDescricao] = useState(tarefa.descricao || "");
    const [prioridade, setPrioridade] = useState(tarefa.prioridade || "0");
    const [dia, setDia] = useState(tarefa.dia || "");

    const salvarEdicao = (e) => {
        e.preventDefault();

        if (!titulo.trim()) return;

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
                    Number(a.prioridade) - Number(b.prioridade)
            );

        salvarTarefas(tarefasAtualizadas, setTarefas);
    };

    return (
        <form
            onSubmit={salvarEdicao}
            className="flex flex-col gap-3 text-left"
        >
            <h2 className="text-lg font-bold text-center text-gray-800 underline">
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
                    className="border border-gray-300 p-2 rounded w-full bg-white text-black focus:outline-blue-500"
                />
            </div>

            <div>
                <LabelFormulario
                    htmlFor="editar-prioridade"
                    titulo="Prioridade"
                />

                <InputFormulario
                    type="number"
                    name="prioridade"
                    id="editar-prioridade"
                    value={prioridade}
                    onChange={(e) => setPrioridade(e.target.value)}
                />
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
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer font-bold transition-colors"
            >
                Salvar Alterações
            </button>
        </form>
    );
}
