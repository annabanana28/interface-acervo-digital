import { useState, useEffect, type JSX } from "react";
import AlunoRequests from "../../../fetch/AlunoRequests"; 

function ListagemAlunos(): JSX.Element {
    const [alunos, setAlunos] = useState<any[]>([]);

    useEffect(() => {
        const carregar = async () => {
            const data = await AlunoRequests.obterListaDeAlunos();
            setAlunos(data || []);
        };
        carregar();
    }, []);

    return (
        <main className="bg-gray-100 flex-1 flex flex-col px-4 py-8 md:py-12">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">Alunos</h1>
                    <button className="w-full sm:w-auto bg-slate-700 text-white px-6 py-3 rounded-lg font-bold shadow-md">
                        <i className="pi pi-user-plus mr-2"></i> Novo Aluno
                    </button>
                </div>

                {/* VIEW MOBILE (Cards) */}
                <div className="grid grid-cols-1 gap-4 sm:hidden">
                    {alunos.map((aluno) => (
                        <div key={aluno.id_aluno} className="bg-white p-5 rounded-2xl shadow-md border border-slate-200">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-slate-100 p-3 rounded-full text-slate-600">
                                    <i className="pi pi-user text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{aluno.nome} {aluno.sobrenome}</h3>
                                    <p className="text-xs text-slate-500">RA: {aluno.ra || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="space-y-1 mb-4 text-sm text-slate-600">
                                <p><i className="pi pi-envelope mr-2 text-xs"></i>{aluno.email}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-sky-100 text-sky-700 py-2 rounded-md font-bold text-sm">Editar</button>
                                <button className="flex-1 bg-red-100 text-red-700 py-2 rounded-md font-bold text-sm">Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* VIEW DESKTOP (Tabela) */}
                <div className="hidden sm:block bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-700 text-white">
                            <tr>
                                <th className="p-4">RA</th>
                                <th className="p-4">Nome</th>
                                <th className="p-4">E-mail</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {alunos.map((aluno) => (
                                <tr key={aluno.id_aluno} className="hover:bg-slate-50">
                                    <td className="p-4 text-slate-500">{aluno.ra}</td>
                                    <td className="p-4 font-semibold text-slate-900">{aluno.nome} {aluno.sobrenome}</td>
                                    <td className="p-4 text-slate-600">{aluno.email}</td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-3">
                                            <button className="text-sky-600 hover:scale-110 transition-transform"><i className="pi pi-pencil"></i></button>
                                            <button className="text-red-600 hover:scale-110 transition-transform"><i className="pi pi-trash"></i></button>
                                        </div>
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

export default ListagemAlunos;