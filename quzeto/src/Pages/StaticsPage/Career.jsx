import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import clock1 from '../../assets/clock1.png'

const Career = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="py-12">
                    <h1 className='py-3 text-center font-bold text-[2.4rem]'>Careers</h1>
                </div>
                <div className="lg:px-20 px-4 md:px-8 py-2">
                    <h1 className='text-[1.5rem] py-3 font-bold '>Lorem ipsum dolor sit amet.</h1>
                    <h2 className='flex items-center gap-1'><img src={clock1} alt="" className='w-[1.2%]' />2022 Jan 3</h2>
                    <p className='py-7 border-b-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="lg:px-20 px-4 md:px-8 py-2">
                    <h1 className='text-[1.5rem] py-3 font-bold '>Lorem ipsum dolor sit amet.</h1>
                    <h2 className='flex items-center gap-1'><img src={clock1} alt="" className='w-[1.2%]' />2022 Jan 3</h2>
                    <p className='py-7 border-b-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="lg:px-20 px-4 md:px-8 py-7">
                    <h1 className='text-[1.5rem] py-3 font-bold '>Lorem ipsum dolor sit amet.</h1>
                    <h2 className='flex items-center gap-1'><img src={clock1} alt="" className='w-[1.2%]' />2022 Jan 3</h2>
                    <p className='py-7 border-b-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Career