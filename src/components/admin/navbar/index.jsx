import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { useEffect } from 'react';


const AdminNavbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("admin")
        navigate("/admin/login")
    }

    useEffect(() => {
        if (!localStorage.getItem("admin")) {
            navigate("/admin/login")
        }
    }, [])


    return (
        <nav className="flex flex-col items-center justify-between p-4 text-white bg-blue-900 shadow-md md:flex-row">
            {/* Logo Section */}
            <Link to="/admin" className="mb-4 md:mb-0">
                <img src={logo} alt="Logo" className="h-16 mx-auto md:mx-0 md:ms-3" />
            </Link>

            {/* Admin Navigation Links */}
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                Welcome Admin
            </div>

            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                <button onClick={handleLogout} className="px-4 py-2 font-semibold text-white transition duration-300 bg-red-600 rounded hover:bg-red-700">
                    Logout
                </button>
            </div>

        </nav>
    );
};

export default AdminNavbar;
