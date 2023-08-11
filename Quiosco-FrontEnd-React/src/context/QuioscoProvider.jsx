import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import { categorias as categoriasDB } from '../data/categorias';
// import axios from 'axios'
import clienteAxios from '../config/axios';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})

    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        // Cada que el pedido cambie, actualizamos el total
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)

    }, [pedido])

    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            // console.log(import.meta.env.VITE_API_URL);
            // const respuesta = await axios('http://localhost:8000/api/categorias')
            const { data } = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log("Respuesta: ", data.data);
            setCategorias(data.data);
            setCategoriaActual(data.data[0]);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        obtenerCategorias();
    }, [])



    const handleClickCategoria = id => {
        // console.log("id=> ", id);
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        // console.log("Categoria filtrada ", categoria)
        setCategoriaActual(categoria)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({ categoria_id, ...producto }) => {
        // console.log(producto)
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)

            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente')

        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado el pedido')
        }
    }

    const handleEditarCantidad = id => {
        // console.log("id producto => ", id)
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleElminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del pedido')
    }

    const hadleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios.post('/api/pedidos', {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad,
                    }
                })


            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message) //Mensaje de respuesta
            setTimeout(() => {
                setPedido([])// setiamos el listado el pedido
            }, 1000);

            //Cerrar la sesión del usuario
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN')
                logout()
            }, 3000)


        } catch (error) {
            console.log(error);
        }

    }

    // const handleAgregarPedido = ({categoria_id, ...producto}) => {
    //     if(pedido.some( pedidoState => pedidoState.id === producto.id )) {
    //         const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
    //         setPedido(pedidoActualizado)
    //         toast.success('Guardado Correctamente')
    //     } else {
    //         setPedido([...pedido, producto])
    //         toast.success('Agregado al Pedido')
    //     }
    // }

    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                setPedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleElminarProductoPedido,
                total,
                hadleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >
            {children}
        </QuioscoContext.Provider>

    )
}

export {
    QuioscoProvider
}

export default QuioscoContext