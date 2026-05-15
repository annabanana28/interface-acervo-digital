import { useState, useEffect, type JSX } from "react";
import LivroRequests from "../../../fetch/LivroRequests"; 

function ListagemLivros(): JSX.Element {
    const [livros, setLivros] = useState<any[]>([]);

    useEffect(() => {
        const carregar = async () => {
            const data = await LivroRequests.obterListaDeLivros();
            setLivros(data || []);
        };
        carregar();
    }, []);

    return (
        <main className="bg-gray-100 flex-1 flex flex-col px-4 py-8 md:py-12">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">Livros</h1>
                    <button className="w-full sm:w-auto bg-slate-700 text-white px-6 py-3 rounded-lg font-bold shadow-md">
                        <i className="pi pi-book mr-2"></i> Novo Livro
                    </button>
                </div>

                {/* VIEW MOBILE (Cards) */}
                <div className="grid grid-cols-1 gap-4 sm:hidden">
                    {livros.map((livro) => (
                        <div key={livro.id_livro} className="bg-white p-5 rounded-2xl shadow-md border border-slate-200">
                            <h3 className="font-bold text-slate-900 text-lg mb-1">{livro.titulo}</h3>
                            <p className="text-sm text-slate-500 mb-3 italic">Autor: {livro.autor}</p>
                            <div className="flex justify-between items-center mb-4 bg-slate-50 p-2 rounded">
                                <span className="text-xs font-bold text-slate-400">Editora: {livro.editora}</span>
                                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[10px] font-bold">ANO: {livro.ano_publicacao}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 border border-sky-200 text-sky-700 py-2 rounded-md font-bold text-sm">Editar</button>
                                <button className="flex-1 border border-red-200 text-red-700 py-2 rounded-md font-bold text-sm">Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* VIEW DESKTOP (Tabela) */}
                <div className="hidden sm:block bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-700 text-white">
                            <tr>
                                <th className="p-4">Título</th>
                                <th className="p-4">Autor</th>
                                <th className="p-4">Editora</th>
                                <th className="p-4 text-center">Ano</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {livros.map((livro) => (
                                <tr key={livro.id_livro} className="hover:bg-slate-50">
                                    <td className="p-4 font-semibold text-slate-900">{livro.titulo}</td>
                                    <td className="p-4 text-slate-700">{livro.autor}</td>
                                    <td className="p-4 text-slate-600">{livro.editora}</td>
                                    <td className="p-4 text-center text-slate-500">{livro.ano_publicacao}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <i className="pi pi-pencil text-sky-600 cursor-pointer"></i>
                                            <i className="pi pi-trash text-red-600 cursor-pointer"></i>
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

export default ListagemLivros;