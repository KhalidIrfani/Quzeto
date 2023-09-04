import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className="container bg-[#FEF4E6] md:px-0 px-2  py-5">
                <div className="lg:px-[10.7rem] md:px-10 flex  items-center justify-between">
                    <div className="hover:underline md:w-auto w-[30%]">
                        <button><Link to='/'><img src={logo} alt="" className='md:w-[65%]' /></Link></button>
                    </div>

                    <div className="flex justify-center items-center md:gap-6">
                        <button className='hover:bg-[#F89820] hover:text-white text-[#4a5871] font-medium py-1 px-2 rounded-md'>Contact Us</button>
                        <button className='hover:bg-[#F89820] hover:text-white text-[#4a5871] font-medium py-1 px-2 rounded-md'>Help Center</button>
                        <button className='hover:bg-[#F89820] hover:text-white text-[#4a5871] font-medium py-1 px-2 rounded-md'><Link to='/Login'>Log in</Link></button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar