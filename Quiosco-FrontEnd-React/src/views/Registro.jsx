import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import Alerta from '../components/Alerta';
export default function Registro() {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const { registro } = useAuth({middleware:'guest',url:'/'});
    const [errores, setErrores] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        registro(datos, setErrores)
    }

    return (
        <>
            <h1 className='text-4xl font-black'>Crea tu cuenta.</h1>
            <p>Crea tu Cuenta llenando el formulario.</p>
            <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
                <form onSubmit={handleSubmit} noValidate>
                    {errores?errores.map((error,i)=><Alerta key={i}>{error}</Alerta>):null}
                    <div className='mb-4'>
                        <label className='text-slate-800' htmlFor='name'>Nombre</label>
                        <input type='text'
                            id='name'
                            name='name'
                            placeholder='Tu Nombre'
                            className='mt-2 w-full p-3 bg-gray-50'
                            ref={nameRef}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-slate-800' htmlFor='email'>Email</label>
                        <input type='email'
                            id='email'
                            name='email'
                            placeholder='Tu Email'
                            className='mt-2 w-full p-3 bg-gray-50'
                            ref={emailRef}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-slate-800' htmlFor='password'>Contraseña</label>
                        <input type='password'
                            id='password'
                            name='password'
                            placeholder='Tu Contraseña'
                            className='mt-2 w-full p-3 bg-gray-50'
                            ref={passwordRef}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='text-slate-800' htmlFor='password_confirmation'>Confirmar Contraseña</label>
                        <input type='password'
                            id='password_confirmation'
                            name='password_confirmation'
                            placeholder='Repite tu Contraseña'
                            className='mt-2 w-full p-3 bg-gray-50'
                            ref={passwordConfirmationRef}
                        />
                    </div>
                    <input
                        type='submit'
                        value='Crear Cuenta'
                        className='bg-indigo-500 hover:bg-indigo-600 w-full p-3 text-white uppercase font-bold mt-5 cursor-pointer'
                    />
                </form>
            </div>
            <nav className='mt-5'>
                <Link to='/auth/login' className='text-indigo-500 hover:text-indigo-600 font-bold'>Iniciar Session</Link>
            </nav >
        </>
    )
}
