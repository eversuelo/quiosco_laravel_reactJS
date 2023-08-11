import { Outlet } from "react-router-dom"
export default function AuthLayout() {
    return (

        <main className="max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center">
            <img src="../img/logo.svg" alt="imagen Logotipo" className="max-w-xs"/>
            <div className="mx-10">
                <Outlet />
            </div>
        </main>
    )
}
