import useQuiosco from "../hooks/useQuiosco"
import Cateogria from "./Cateogria"
import { useAuth } from "../hooks/useAuth";
export default function Sidebar() {
    const { categorias } = useQuiosco();
    const { logout, user } = useAuth({ middleware: 'auth' });
    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img src="img/logo.svg" alt="Logo" className="w-40" />
            </div>
            <p className="my-10 text-xl text-center">Hola:{user?.name}</p>
            <div className="mt-10">
                {categorias.map((categoria) => (
                    <Cateogria key={categoria.id} categoria={categoria} />
                ))}
            </div>
            <div className="my-5 py-5">
                <button
                    type="button"
                    className="bg-red-500 text-center w-full p-3 font-bold text-white truncate"
                    onClick={logout}
                >
                    Cancelar Orden
                </button>

            </div>
        </aside>
    )
}