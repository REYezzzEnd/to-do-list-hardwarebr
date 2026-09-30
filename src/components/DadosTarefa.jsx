import { InputFormulario } from "./InputFormulario";
import { LabelFormulario } from "./LabelFormulario";

export function DadosTarefa(tarefa) {
    return (
        <div>
            <h2>DADOS DA TAREFA</h2>
            <p>{tarefa.descricao}</p>
        </div>
    );
}