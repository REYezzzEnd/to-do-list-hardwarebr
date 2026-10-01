export function DadosTarefa({ tarefa }) {
    return (
        <div className="flex flex-col gap-3 text-left">

            <h2 className="text-lg font-bold text-center text-gray-800 underline">
                DADOS DA TAREFA
            </h2>

            <div>
                <span className="font-bold text-gray-700">
                    Título:
                </span>

                <p className="text-gray-800">
                    {tarefa.titulo}
                </p>
            </div>

            <div>
                <span className="font-bold text-gray-700">
                    Descrição:
                </span>

                <p className="text-gray-800">
                    {tarefa.descricao || 'Nenhuma descrição informada.'}
                </p>
            </div>

            <div>
                <span className="font-bold text-gray-700">
                    Prioridade:
                </span>

                <p className="text-gray-800">
                    {tarefa.prioridade}
                </p>
            </div>

            <div>
                <span className="font-bold text-gray-700">
                    Dia:
                </span>

                <p className="text-gray-800">
                    {tarefa.dia || 'Nenhuma data informada.'}
                </p>
            </div>

            <div>
                <span className="font-bold text-gray-700">
                    Status:
                </span>

                <p
                    className={
                        tarefa.concluido
                            ? 'text-green-600 font-bold'
                            : 'text-yellow-600 font-bold'
                    }
                >
                    {tarefa.concluido
                        ? 'Concluída'
                        : 'Pendente'}
                </p>
            </div>

        </div>
    );
}