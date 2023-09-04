import React from 'react'
import logo from '../assets/logo.png'
import headphone from '../assets/headphone.png'
import upperarrow from '../assets/upperarrow.png'
import clock from '../assets/clock.png'
import { IoIosArrowDropupCircle } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className="container bg-[#FAFAFA] border-t-2 border-gray-200">
                <div className="grid md:grid-cols-4 py-10">

                    <div className="py-5 md:py-0">
                        <div className="lg:px-10 px-10 md:px-5">
                            <img src={logo} alt="" className='px-10 w-[80%]' />
                            <div className="flex items-center text-center py-4">
                                <img src={headphone} alt="" className='w-[30%]' />
                                <div className="">
                                    <h1 className='text-[#CACACA]'>Got Question</h1>
                                    <h1 className='font-medium'>1900 0012 333</h1>
                                </div>
                            </div>
                            <div className="">
                                <h1>Calista Wise 7292 Dictum Av.</h1>
                                <h1>Antonio, Italy</h1>
                            </div>
                        </div>

                    </div>

                    <div className="md:px-5 md:py-0 py-3 px-10">
                        <div className="">
                            <h1 className='font-bold text-[1.4rem] py-3'>Support</h1>
                            <div className="py-1"><Link to='/privacy'><button className=''>Privacy & Cookies</button></Link></div>
                            <div className="py-1"><button>Store Directory</button></div>
                            <div className="py-1"><button>About Us</button></div>
                            <div className="py-1"><button>Contact</button></div>
                        </div>
                    </div>

                    <div className="md:px-0 py-5 md:py-0 px-10">
                        <div className="">
                            <h1 className='font-bold text-[1.4rem] py-2'>Social</h1>
                            <div className="py-1"><button className=''>Facebook</button></div>
                            <div className="py-1"><button>Twitter</button></div>
                            <div className="py-1"><button>Pinterset</button></div>
                            <div className="py-1"><button>Instagram</button></div>
                        </div>
                    </div>

                    <div className="relative top-3 md:top-0 md:right-14">
                        <div className="md:px-0 px-10">
                            <h1 className='font-bold text-[1.4rem] py-2'>News Letter</h1>
                            <div className="py-4"><button className='text-[#CACACA] md:text-sm lg:text-lg'>Get the latest news & updates from us</button></div>
                            <div className="py-1 border-b lg:text-lg md:flex md:text-sm border-[#D9D9D9]">
                                <input type="text" placeholder='Enter your email here ' className='bg-transparent ' />
                                <button className='lg:px-6'>Suscribe</button>
                            </div>
                            <div className="flex justify-end relative left-10"><button><img src={upperarrow} alt="" className='w-[80%]' /></button></div>
                            <div className="flex justify-end relative left-10"><button><img src={clock} alt="" className='w-[80%]' /></button></div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer