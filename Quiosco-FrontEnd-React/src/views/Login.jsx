import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';
export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();
    const { login,user } = useAuth({
        middleware: 'guest',
        url:'/'
    })
    const [errores, setErrores] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        login(datos, setErrores);
        console.log(user);
    }
    return (
        <>
            <h1 className='text-4xl font-black'>Inicia Session con tu cuenta.</h1>
            <p>Para crear un pedido, debes de iniciar session.</p>
            <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
                <form onSubmit={handleSubmit}
                    noValidate
                >
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
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
                    <input
                        type='submit'
                        value='Iniciar Session'
                        className='bg-indigo-500 hover:bg-indigo-600 w-full p-3 text-white uppercase font-bold mt-5 cursor-pointer'
                    />
                </form>
            </div>
            <nav className='mt-5'>
                <Link to='/auth/registro' className='text-indigo-500 hover:text-indigo-600 font-bold'>Registrarse</Link>
            </nav >
        </>
    )
}
