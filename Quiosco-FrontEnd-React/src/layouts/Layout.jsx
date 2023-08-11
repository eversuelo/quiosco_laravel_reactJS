
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Resumen from '../components/Resumen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useQuiosco from '../hooks/useQuiosco';
import Modal from 'react-modal';
import ModalProducto from '../components/ModalProducto';
import { useAuth } from '../hooks/useAuth';
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};
Modal.setAppElement("#root");
export default function Layout() {
    const { user, error } = useAuth({ middleware: 'auth' })
    const { modal } = useQuiosco();

    return (
        <>
            <div className='md:flex'>
                <Sidebar />
                <div className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-4'>
                    <Outlet />
                </div>
                <Resumen />
            </div>

            <Modal
                isOpen={modal}
                style={customStyles}
            >
                <ModalProducto />
            </Modal>

            <ToastContainer />
        </>
    )
}
