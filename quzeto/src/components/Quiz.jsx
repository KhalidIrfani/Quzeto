import React from 'react'
import commas from '../assets/commas.png'
import assingmentw from '../assets/assingmentw.png'
import assingmentb from '../assets/assingmentb.png'
import brain from '../assets/brain.png'
import '../App.css'

const Quiz = () => {
    return (
        <>
            <div className="container">
                <div className="grid  h-[60%]  md:grid-cols-3">

                    <div className="bg-[#BBBBBB] py-12 ">
                        <h1 className='text-white py-2 text-center font-bold text-[2rem]'>1</h1>
                        <h1 className='text-white   text-center font-normal text-[2rem]'>Create Quiz</h1>
                    </div>

                    <div className="image bg-[#363953] py-12">
                        <h1 className='text-white py-2 text-center font-bold text-[2rem]'>2</h1>
                        <h1 className='text-white   text-center font-normal text-[2rem]'>PLAY QUIZ</h1>
                    </div>

                    <div className="image bg-[#363953] py-12 border-l-2 border-black">
                        <h1 className='text-white py-2 text-center font-bold text-[2rem]'>3</h1>
                        <h1 className='text-white   text-center font-normal text-[2rem]'>Earn Money</h1>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="grid lg:grid-cols-2">
                    <div className="grid grid-cols-1">
                        <div className="bg-[#00459E] px-6 py-14">
                            <img src={commas} alt="" className='px-6 lg:w-[16%]' />
                            <h1 className='lg:w-[77%] text-[1.3rem] px-20 text-[white]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</h1>
                        </div>
                        <div className="flex">
                            <div className="bg-[#282C46] text-center py-10 items-center">
                                <img src={assingmentw} alt="" className='text-center pt-7 relative left-[40%] items-center w-[20%]' />
                                <h1 className='text-white py-5 font-normal text-[1.7rem]'>Start Test</h1>
                                <p className='text-white px-3  text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt uat labore et dolore magna aliqua</p>
                            </div>
                            <div className="bg-white text-center py-10 items-center">
                                <img src={assingmentb} alt="" className='text-center pt-7 relative left-[40%] items-center w-[18%]' />
                                <h1 className='py-5 font-normal text-[1.7rem]'>Start Test</h1>
                                <p className=' px-3 text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt uat labore et dolore magna aliqua</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black px-2 py-6">
                        <img src={brain} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quiz