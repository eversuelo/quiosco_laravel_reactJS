import { formatearDinero } from '../helpers';
import { useState, useEffect } from 'react';
import useQuiosco from '../hooks/useQuiosco';
export default function ModalProducto() {
    const { producto, handleClickModal, handleAgregarPedido, pedido } = useQuiosco();
    const [cantidad, setCantidad] = useState(1);
    const [edicion, setEdicion] = useState(false);
    useEffect(() => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const productoEdicion = pedido.filter(pedidoState => pedidoState.id === producto.id)[0]
            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        }
    }, [pedido])

    return (
        <div className='md:flex items-center gap-10'>
            <div className='md:w-1/3'>
                <img src={`img/${producto.imagen}.jpg`} alt={producto.nombre} className='w-full' />
            </div>
            <div className='md:w-2/3'>
                <div onClick={handleClickModal} className='flex justify-end'>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <h1 className='text-3xl font-bold mt-5'>{producto.nombre}</h1>
                <p className='text-5xl text-amber-500 font-black mt-5'>{formatearDinero(producto.precio)}</p>
                <div className='flex mt-5 gap-4'>
                    <button className='' type='button' onClick={() => { if (cantidad >= 10) return; setCantidad(cantidad + 1) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>
                    <p className='text-3xl'>{cantidad}</p>
                    <button className='' onClick={() => {
                        if (cantidad <= 1) return; setCantidad(cantidad - 1)
                    }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold p-3 uppercase mt-5"
                    onClick={() => {
                        handleAgregarPedido({ ...producto, cantidad })
                        handleClickModal()
                    }}
                >
                    {edicion ? 'Guardar Cambios' : 'Agregar al Pedido'}
                </button>
            </div>
        </div>
    )
}
