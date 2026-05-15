import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";
import appIcon from "../../assets/app-icon.png";

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
    const avatarImage = "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png";

    // Função para navegação
    const handleNavigate = (path: string) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
            command: () => handleNavigate("/")
        },
        ...(isAuthenticated ? [
            {
                label: 'Alunos',
                icon: 'pi pi-users',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                command: () => handleNavigate("/lista/alunos")
            },
            {
                label: 'Livros',
                icon: 'pi pi-book',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                command: () => handleNavigate("/lista/livros")
            },
            {
                label: 'Empréstimos',
                icon: 'pi pi-exchange',
                className: 'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                command: () => handleNavigate("/lista/emprestimos")
            }
        ] : [])
    ];

    const start = (
        <img
            alt="logo"
            src={appIcon}
            className="h-10 md:h-12 lg:h-14 w-auto ml-2 md:ml-4 lg:ml-6 cursor-pointer"
            onClick={() => handleNavigate("/")}
        />
    );

    const userActions = isAuthenticated ? (
        <div className="flex items-center justify-end mr-4 md:mr-6 lg:mr-10 gap-2 md:gap-4">
            <div className="flex flex-col pr-2 md:pr-3 hidden sm:flex">
                <p className="text-white font-semibold m-0 text-sm md:text-base">{nome}</p>
                <p className="text-white text-xs md:text-sm m-0">{email}</p>
            </div>
            <Avatar
                image={avatarImage}
                shape="circle"
                className="!w-8 !h-8 md:!w-10 md:!h-10"
            />
            <button
                className="bg-white ml-2 md:ml-4 text-slate-700 px-3 py-1.5 md:px-5 md:py-2 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs md:text-sm"
                onClick={() => {
                    AuthRequests.removeToken();
                    handleNavigate("/login");
                }}
            >
                <i className="pi pi-sign-out"></i>
                <span>Sair</span>
            </button>
        </div>
    ) : (
        <button
            className="bg-white font-bold text-slate-700 px-3 py-1.5 md:px-5 md:py-2 mr-4 md:mr-6 lg:mr-10 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs md:text-sm"
            onClick={() => handleNavigate('/login')}
        >
            <i className="pi pi-sign-in"></i>
            <span>Login</span>
        </button>
    );

    return (
        <header className="bg-slate-700 flex items-center justify-between px-2 sm:px-3 md:px-4 py-2 sm:py-3 min-h-[56px] sm:min-h-[64px] relative">
            {/* Logo - Desktop e Mobile */}
            <div className="flex items-center">
                {start}
            </div>

            {/* Menu Desktop - Menubar */}
            <div className="hidden md:block flex-1 ml-2 md:ml-4">
                <Menubar model={items} className="!bg-transparent !border-none" />
            </div>

            {/* Botão Hambúrguer - Mobile */}
            <button 
                className="text-white p-2 rounded-md hover:bg-slate-600 transition-colors md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
            >
                <i className={`pi ${mobileMenuOpen ? 'pi-times' : 'pi-bars'} text-xl sm:text-2xl`}></i>
            </button>

            {/* Ações do usuário */}
            {userActions}

            {/* Menu Mobile Dropdown */}
            {mobileMenuOpen && (
                <>
                    {/* Overlay */}
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    {/* Menu */}
                    <div className="absolute top-full left-0 right-0 bg-slate-700 z-50 md:hidden shadow-lg border-t border-slate-600">
                        <button
                            onClick={() => handleNavigate("/")}
                            className="w-full flex items-center gap-3 px-4 py-3 text-white text-left hover:bg-slate-600 transition-colors border-b border-slate-600"
                        >
                            <i className="pi pi-home text-base"></i>
                            <span className="text-sm sm:text-base">Home</span>
                        </button>
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => handleNavigate("/lista/alunos")}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-white text-left hover:bg-slate-600 transition-colors border-b border-slate-600"
                                >
                                    <i className="pi pi-users text-base"></i>
                                    <span className="text-sm sm:text-base">Alunos</span>
                                </button>
                                <button
                                    onClick={() => handleNavigate("/lista/livros")}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-white text-left hover:bg-slate-600 transition-colors border-b border-slate-600"
                                >
                                    <i className="pi pi-book text-base"></i>
                                    <span className="text-sm sm:text-base">Livros</span>
                                </button>
                                <button
                                    onClick={() => handleNavigate("/lista/emprestimos")}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-white text-left hover:bg-slate-600 transition-colors border-b border-slate-600"
                                >
                                    <i className="pi pi-exchange text-base"></i>
                                    <span className="text-sm sm:text-base">Empréstimos</span>
                                </button>
                                <button
                                    onClick={() => {
                                        AuthRequests.removeToken();
                                        handleNavigate("/login");
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-white text-left hover:bg-slate-600 transition-colors"
                                >
                                    <i className="pi pi-sign-out text-base"></i>
                                    <span className="text-sm sm:text-base">Sair</span>
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => handleNavigate("/login")}
                                className="w-full flex items-center gap-3 px-4 py-3 text-white text-left hover:bg-slate-600 transition-colors"
                            >
                                <i className="pi pi-sign-in text-base"></i>
                                <span className="text-sm sm:text-base">Login</span>
                            </button>
                        )}
                    </div>
                </>
            )}
        </header>
    );
}

export default Navegacao;