import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "./ResumenProducto";
import { useAuth } from "../hooks/useAuth";
export default function Resumen() {
  const { pedido, total ,hadleSubmitNuevaOrden } = useQuiosco()
  const comprobarPedido = () => pedido.length === 0;
  const { logout } = useAuth({});
  const handleSubmit = e => {
    e.preventDefault();
    hadleSubmitNuevaOrden(logout);
}
  return (
    <aside className="w-72 h-screen overflow-y-auto p-5">
      <h1 className="text-4xl font-black">
        Mi Pedido
      </h1>
      <p className="text-lg my-5">Aquí podrás ver el resumen y totales de tu pedido</p>
      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">No hay elementos en tu pedido aún.</p>
        ) : (
          pedido.map((producto) => (
            <ResumenProducto key={producto.id} producto={producto} />
          ))
        )}
      </div>
      <p className="text-xl mt-10">
        Total:{''}
        {formatearDinero(total)}
      </p>
      <form className="mt-5"  onSubmit={handleSubmit}>
        <input type="submit" disabled={comprobarPedido()} className={`${comprobarPedido()?'bg-indigo-200': 'bg-indigo-600 hover:bg-indigo-800'}  px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`} value="Confirmar Pedido" />
      </form>
    </aside>
  )
}
