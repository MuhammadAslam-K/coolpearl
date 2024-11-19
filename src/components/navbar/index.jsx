import { FaPhoneAlt } from 'react-icons/fa';
import logo from '../../assets/logo1.png'
import { MdEmail } from 'react-icons/md';


const Navbar = () => {
    return (
        <nav className="flex flex-col items-center justify-between p-4 text-black bg-white shadow-md md:flex-row">
            <div className="mb-4 md:mb-0">
                <img src={logo} alt="Logo" className="h-16 mx-auto md:mx-0 md:ms-3" />
            </div>

            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                <a href="mailto:sales@coolpearluae.com" className="flex items-center justify-center hover:text-gray-300">
                    <MdEmail className='w-5 h-5 mr-2' />
                    <span className="text-sm md:text-base">sales@coolpearluae.com</span>
                </a>

                <span className="hidden md:inline">|</span>
                <a href="tel:+1234567890" className="flex items-center justify-center hover:text-gray-300">
                    <FaPhoneAlt className='mr-2"' />
                    <span className="text-sm md:text-base">+1 234 567 890</span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
