import React from 'react'
import Navbar from '../../components/Navbar'
import bullet from '../../assets/bullet.png'
import Footer from '../../components/Footer'
const Privacy = () => {
    return (
        <>
            <Navbar />
            <div className="containers">
                <div className="py-12">
                    <h1 className='py-5 text-center font-bold text-[2rem]'>Privacy Policy</h1>
                    <p className='text-[1rem] px-3 font-normal  relative md:left-[32%] text-center md:w-[35%]'>When you’re ready to go beyond prototyping in Figma, Webflow’s ready to help you bring your</p>
                </div>

                <div className="">
                    <div className="lg:px-28 px-4 md:px-8">
                        <h1 className='text-[1.5rem] py-3 font-bold '>Lorem ipsum dolor.</h1>
                        <p className='py-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="">
                            <h1 className='py-7 text-[1.3rem] md:text-[1.7rem] font-bold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                            <ul className="py-4 leading-10">
                                <li className='flex items-center gap-2 '><img src={bullet} alt="" /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                <li className='flex items-center gap-2 '><img src={bullet} alt="" /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                <li className='flex items-center gap-2 '><img src={bullet} alt="" /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>

                            </ul>
                            <p className='pb-16'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Privacy