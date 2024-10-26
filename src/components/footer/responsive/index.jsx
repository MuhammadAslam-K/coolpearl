import React, { useState } from "react";
import logo from '../../../assets/logo.png'
import phone from '../../../assets/icons/phone.png'
import location from '../../../assets/icons/location.png'
import email from '../../../assets/icons/email.png'


function Index() {
    const [navDropdown, setNavDropdown] = useState(false);
    const [licenseDropdown, setLicenseDropdown] = useState(false);
    const [contactDropdown, setContactDropdown] = useState(false);


    return (
        <div className="flex justify-start w-full">
            <div className="w-full">
                <footer className="flex flex-col items-start p-10 text-white footer">
                    <img src={logo} alt="Logo" className="w-auto h-20 mb-2" />

                    <div className="flex flex-col items-start w-full text-white">
                        <div className="mb-2">
                            <button onClick={() => setNavDropdown(!navDropdown)} className="flex items-center justify-between w-full text-lg font-semibold text-white">
                                Navigation
                                <svg
                                    className={`fill-current h-5 w-5 ms-3 transform ${navDropdown ? 'rotate-180' : 'rotate-0'}`}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                            {navDropdown && (
                                <div className="flex flex-col mt-3 space-y-5">
                                    <div className="text-sm link link-hover">Home</div>
                                    <div className="text-sm link link-hover">About Us</div>
                                    <div className="text-sm link link-hover">Datrimony™</div>
                                    <div className="text-sm link link-hover">Events</div>
                                    <div className="text-sm link link-hover">Host With Us</div>
                                </div>
                            )}
                        </div>

                        <div className="mb-2">
                            <button onClick={() => setLicenseDropdown(!licenseDropdown)} className="flex items-center justify-between w-full text-lg font-semibold text-white">
                                Licence
                                <svg
                                    className={`fill-current h-5 w-5 ms-3 transform ${licenseDropdown ? 'rotate-180' : 'rotate-0'}`}
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                            {licenseDropdown && (
                                <div className="flex flex-col mt-3 space-y-5">
                                    <div className="text-sm link link-hover">Privacy Policy</div>
                                    <div className="text-sm link link-hover">Terms & Conditions</div>
                                </div>
                            )}
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center w-full text-white">
                                <button onClick={() => setContactDropdown(!contactDropdown)} className="flex items-center justify-start w-full text-lg font-semibold">
                                    Contact
                                    <svg
                                        className={`fill-current h-5 w-5 ms-3 transform ${contactDropdown ? 'rotate-180' : 'rotate-0'}`}
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </button>
                            </div>


                            {contactDropdown && (
                                <div className="flex flex-col mt-3 space-y-5 text-start">
                                    <button className="flex items-center text-sm">
                                        <img src={phone} alt="" className='me-2' />
                                        Toll-Free: 1800 203 9717
                                    </button>
                                    <button className="flex items-center text-sm">
                                        <img src={email} alt="" className='me-2' />
                                        hello@couplesquad.com</button>
                                    <button className="flex text-sm text-start w-52">
                                        <img src={location} alt="" className='me-2' />
                                        No B28, Centre Space Co-working, Kottayam, Kerala 686601</button>
                                </div>
                            )}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default React.memo(Index);
