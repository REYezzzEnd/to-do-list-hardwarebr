import { DivPrincipal } from "./DivPrincipal";
import {TarefasStatus} from "./TarefasStatus"
import {
  procurarNumeroTarefas,
  procurarNumeroTarefasAtrasadas 
} from '../../assets/functions/tarefas';

export function DivStatusTarefa({tarefas}) {
    return (
        <DivPrincipal className="flex flex-row justify-between gap-2 text-center">
            <TarefasStatus
                className="text-black"
                tipoTarefa="TOTAL"
                numeroTotalTarefas={tarefas.length}
            />

            <TarefasStatus
                className="text-yellow-500"
                tipoTarefa="PENDENTES"
                numeroTotalTarefas={
                    procurarNumeroTarefas(tarefas, false)
                }
            />

            <TarefasStatus
                className="text-green-500"
                tipoTarefa="CONCLUÍDAS"
                numeroTotalTarefas={
                    procurarNumeroTarefas(tarefas, true)
                }
            />

            <TarefasStatus
                className="text-red-500"
                tipoTarefa="ATRASADAS"
                numeroTotalTarefas={
                    procurarNumeroTarefasAtrasadas(tarefas)
                }
            />
        </DivPrincipal>
    );
}