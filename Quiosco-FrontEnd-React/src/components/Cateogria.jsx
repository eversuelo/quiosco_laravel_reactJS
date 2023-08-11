import React from 'react'
import useQuiosco from '../hooks/useQuiosco';
export default function Cateogria({ categoria }) {
    const { icono, id, nombre } = categoria;
    const { handleClickCategoria, categoriaActual } = useQuiosco();
    const resaltarCategoriaActual = () => categoriaActual.id === id ? "bg-amber-400" : "bg-white";
    return (
        <button type='button' onClick={() => handleClickCategoria(id)} className={`${resaltarCategoriaActual()} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
            <img
                alt='Imagen Icono'
                src={`img/icono_${icono}.svg`}
                className='w-10'
            />

            <p className='font-black'>{nombre}</p>
        </button>

    )
}
