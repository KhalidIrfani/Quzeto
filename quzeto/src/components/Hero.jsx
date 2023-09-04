import React from 'react'
import lamp from '../assets/lamp.png'
import girl from '../assets/girl.png'


const Hero = () => {
    return (
        <>

            <div className="container flex bg-[#FEF4E6] items-center md:px-[7.5rem] py-10">
                <div className="grid md:grid-cols-2 items-center md:px-14 px-4 gap-x-8">
                    <div className="order-2 md:order-1">
                        <h1 className='font-bold text-[2.7rem] leading-[3.5rem] py-2 text-[#324161]'>Easy and intuitive <br /> online testing</h1>
                        <h1>Evaluo is a cloud-testing platform that supports <br /> online creation and delivery of feature-rich tests.</h1>
                        <div className="flex gap-4 py-3">
                            <button className='hover:bg-[#F89820]  hover:text-white bg-[white] text-black font-medium py-2 px-3 rounded-sm'>Get Started</button>
                            <button className='bg-[white] text-black font-medium px-3 rounded-sm hover:bg-[#F89820] hover:text-white'>Request a demo</button>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 ">
                        <img src={girl} alt="" className='w-[90%]' />
                    </div>
                </div>


            </div>
            <div className="container my-2 py-10 flex items-center md:px-10 bg-[#FAFAFA]">
                <div className="grid md:grid-cols-2 gap-x-20">
                    <div className="order-2 md:order-1 lg:px-16 px-7 ">
                        <h1 className='text-[2rem] font-medium'>About QuizBoz</h1>
                        <h1 className='  py-4 text-[#8D8D8D]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</h1>
                        <h1 className='text-[#8D8D8D]'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h1>
                    </div>
                    <div className="md:pl-[4rem] pl-[2rem] order-1 md:order-2">
                        <img src={lamp} alt="" className='pl-4 md:pl-0 md:py-0 py-3 w-[300px] h-[300px]' />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Hero