import { toast } from 'sonner';
import { DivPrincipal } from './DivPrincipal';
import { LabelFormulario } from './LabelFormulario';
import { SelectFormulario } from './SelectFormulario';

export function FiltrosTarefas({
    filtroDia,
    setFiltroDia,
    filtroConcluido,
    setFiltroConcluido,
    filtroPrioridade,
    setFiltroPrioridade,
    limparFiltros,
    excluirTodas
}) {
    const handleLimparFiltros = () => {
        limparFiltros();

        toast.info('Filtros limpos!', {
            description: 'Todos os filtros foram removidos.'
        });
    };

    return (
        <DivPrincipal>

            <div className="flex flex-col gap-5 mb-6">

                <div>
                    <label
                        htmlFor="filtro-dia"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Filtrar por Dia
                    </label>

                    <input
                        type="date"
                        id="filtro-dia"
                        value={filtroDia}
                        className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black focus:outline-blue-500"
                        onChange={(e) => setFiltroDia(e.target.value)}
                    />
                </div>

                <div>
                    <label
                        htmlFor="filtro-concluido"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Filtrar por Status
                    </label>

                    <select
                        id="filtro-concluido"
                        value={filtroConcluido}
                        className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black focus:outline-blue-500"
                        onChange={(e) =>
                            setFiltroConcluido(e.target.value)
                        }
                    >
                        <option value="">Todas</option>
                        <option value="true">Concluídas</option>
                        <option value="false">Não Concluídas</option>
                    </select>
                </div>

                <div>
                    <LabelFormulario
                        htmlFor="filtro-prioridade"
                        titulo="Filtrar por Prioridade"
                    />

                    <SelectFormulario
                        name="filtro-prioridade"
                        id="filtro-prioridade"
                        value={filtroPrioridade}
                        onChange={(e) =>
                            setFiltroPrioridade(e.target.value)
                        }
                    >
                        <option value="">Todas</option>
                        <option value="ALTA">Alta</option>
                        <option value="MEDIA">Média</option>
                        <option value="BAIXA">Baixa</option>
                    </SelectFormulario>
                </div>

                <div className="flex gap-3 mt-1">

                    <button
                        type="button"
                        className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 cursor-pointer font-bold transition-colors w-1/2"
                        onClick={handleLimparFiltros}
                    >
                        Limpar Filtros
                    </button>

                    <button
                        type="button"
                        className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-800 cursor-pointer font-bold transition-colors w-1/2"
                        onClick={excluirTodas}
                    >
                        Excluir Todas
                    </button>

                </div>

            </div>

        </DivPrincipal>
    );
}