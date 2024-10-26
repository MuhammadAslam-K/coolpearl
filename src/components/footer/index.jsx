import React from 'react'
import logo from '../../assets/logo.png'
import phone from '../../assets/icons/phone.png'
import email from '../../assets/icons/email.png'
import location from '../../assets/icons/location.png'

function Index() {

    const services = ['Air Conditioning', 'Duct Cleaning Works', 'Electrical Works', 'Plumbing Works', 'Painting Works', 'Water Tank Cleaning']
    const quickLinks = ['About Us', 'Contact Us', 'Our Services', 'Terms & Conditions', 'Contract']

    return (
        <div className="flex justify-center w-full bg-black">
            <div className="w-[88%]">
                <footer className="flex p-10 text-white footer">
                    <aside>
                        <img src={logo} alt="CoupleSquadLogo" className="w-auto max-h-18" />
                    </aside>

                    <div className="flex flex-wrap justify-around w-full text-white">
                        <nav className="flex flex-col space-y-5">
                            <h6 className="text-2xl font-bold text-white">Services</h6>
                            {services?.map((item, index) => (
                                <div key={index} className="text-base link link-hover">{item}</div>
                            ))}
                        </nav>

                        <nav className="flex flex-col space-y-5">
                            <h6 className="text-2xl font-bold text-white">Quick Links</h6>
                            {quickLinks?.map((item, index) => (
                                <div key={index} className="text-base link link-hover">{item}</div>
                            ))}
                        </nav>

                        <nav className="flex flex-col items-start justify-start space-y-5 text-start">
                            <h6 className="text-lg font-semibold text-white">Our Office</h6>
                            <button className="flex items-center text-sm">
                                <img loading='lazy' src={phone} alt="coupleSquad" className='me-2' />
                                +971-56 163 3007
                            </button>
                            <button className="flex items-center text-sm">
                                <img loading='lazy' src={email} alt="coupleSquad" className='me-2' />
                                sales@coolpearluae.com</button>
                            <button className="flex text-sm text-start">
                                <img loading='lazy' src={location} alt="coupleSquad" className='me-2' />
                                Al Qusais Ind. area 1, Dubai <br /> United Arab Emirates.
                            </button>
                        </nav>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default React.memo(Index)
