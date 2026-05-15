import { useEffect, useState, type JSX } from "react";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";
import { useNavigate } from "react-router-dom";

function ListagemEmprestimo(): JSX.Element {
    const [emprestimos, setEmprestimos] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const carregar = async () => {
            const dados = await EmprestimoRequests.obterListaDeEmprestimos();
            setEmprestimos(dados || []);
        };
        carregar();
    }, []);

    return (
        <main className="flex-1 p-4 md:p-10 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-2xl font-bold text-slate-800">Empréstimos</h1>
                    <button className="w-full sm:w-auto bg-slate-700 text-white px-6 py-2 rounded-lg font-bold shadow-md">
                        Novo Empréstimo
                    </button>
                </div>

                {/* --- VISÃO MOBILE (Cards) --- */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {emprestimos.map((emp) => (
                        <div key={emp.id_emprestimo} className="bg-white p-4 rounded-xl shadow border-l-4 border-slate-700">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-slate-900">{emp.aluno?.nome}</span>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">
                                    {emp.status_emprestimo}
                                </span>
                            </div>
                            <p className="text-sm text-slate-600"><strong>Livro:</strong> {emp.livro?.titulo}</p>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => navigate(`/detalhes/${emp.id_emprestimo}`)} className="flex-1 py-2 bg-slate-100 rounded font-bold text-xs">Detalhes</button>
                                <button className="flex-1 py-2 bg-red-50 text-red-600 rounded font-bold text-xs">Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- VISÃO DESKTOP (Tabela) --- */}
                <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-700 text-white">
                            <tr>
                                <th className="p-4">Aluno</th>
                                <th className="p-4">Livro</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {emprestimos.map((emp) => (
                                <tr key={emp.id_emprestimo} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-medium">{emp.aluno?.nome}</td>
                                    <td className="p-4">{emp.livro?.titulo}</td>
                                    <td className="p-4">
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                                            {emp.status_emprestimo}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button onClick={() => navigate(`/detalhes/${emp.id_emprestimo}`)} className="text-slate-600 hover:text-blue-600 mx-2"><i className="pi pi-eye"></i></button>
                                        <button className="text-red-400 hover:text-red-600 mx-2"><i className="pi pi-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default ListagemEmprestimo;