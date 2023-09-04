import React from 'react'
import alrm from '../assets/alarm.png'
import vector from '../assets/vector.png'
import more from '../assets/more.png'

const Feature = () => {
    return (
        <>
            <div className="conatiner">

                <div className=" flex justify-center py-4">
                    <h1 className='text-[2rem] text-center font-bold py-2 lg:w-[18%] border-b-2 border-black'>Key Features</h1>
                </div>

                <div class="grid lg:grid-cols-3 md:grid-cols-2 px-5 py-14 lg:px-24 gap-6">

                    <div class=" bg-[#00459E]  rounded-md">
                        <div className="p-4 ">
                            <div><img src={alrm} alt="" /></div>
                            <div className="py-4"><h1 className='text-white font-normal'>Image, Audio & Video Answers</h1></div>
                            <div className="py-3 flex">
                                <h1 className='text-white font-normal w-[75%]'>Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</h1>
                                <img src={vector} alt="" className='relative w-[25%] h-[25%] top-[5.8rem] right-[4.5rem]' />
                            </div>
                            <div className="flex gap-7 py-3">
                                <button className='text-white font-medium  flex gap-2'>Read more <img src={more} alt="" className='h-[.8rem] relative top-[.5rem]' /></button>
                            </div>
                        </div>
                    </div>

                    <div class=" bg-[#282C46]  rounded-md">
                        <div className="p-4 ">
                            <div><img src={alrm} alt="" /></div>
                            <div className="py-4"><h1 className='text-white font-normal'>Image, Audio & Video Answers</h1></div>
                            <div className="py-3 flex">
                                <h1 className='text-white font-normal w-[75%]'>Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</h1>
                                <img src={vector} alt="" className='relative w-[25%] h-[25%] top-[5.8rem] right-[4.5rem]' />
                            </div>
                            <div className="flex gap-7 py-3">
                                <button className='text-white font-medium  flex gap-2'>Read more <img src={more} alt="" className='h-[.8rem] relative top-[.5rem]' /></button>
                            </div>
                        </div>
                    </div>

                    <div class=" bg-[#00459E]  rounded-md">
                        <div className="p-4 ">
                            <div><img src={alrm} alt="" /></div>
                            <div className="py-4"><h1 className='text-white font-normal'>Image, Audio & Video Answers</h1></div>
                            <div className="py-3 flex">
                                <h1 className='text-white font-normal w-[75%]'>Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</h1>
                                <img src={vector} alt="" className='relative w-[25%] h-[25%] top-[5.8rem] right-[4.5rem]' />
                            </div>
                            <div className="flex gap-7 py-3">
                                <button className='text-white font-medium  flex gap-2'>Read more <img src={more} alt="" className='h-[.8rem] relative top-[.5rem]' /></button>
                            </div>
                        </div>
                    </div>

                    <div class=" bg-[#282C46]  rounded-md">
                        <div className="p-4 ">
                            <div><img src={alrm} alt="" /></div>
                            <div className="py-4"><h1 className='text-white font-normal'>Image, Audio & Video Answers</h1></div>
                            <div className="py-3 flex">
                                <h1 className='text-white font-normal w-[75%]'>Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</h1>
                                <img src={vector} alt="" className='relative w-[25%] h-[25%] top-[5.8rem] right-[4.5rem]' />
                            </div>
                            <div className="flex gap-7 py-3">
                                <button className='text-white font-medium  flex gap-2'>Read more <img src={more} alt="" className='h-[.8rem] relative top-[.5rem]' /></button>
                            </div>
                        </div>
                    </div>

                    <div class=" bg-[#00459E]  rounded-md">
                        <div className="p-4 ">
                            <div><img src={alrm} alt="" /></div>
                            <div className="py-4"><h1 className='text-white font-normal'>Image, Audio & Video Answers</h1></div>
                            <div className="py-3 flex">
                                <h1 className='text-white font-normal w-[75%]'>Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</h1>
                                <img src={vector} alt="" className='relative w-[25%] h-[25%] top-[5.8rem] right-[4.5rem]' />
                            </div>
                            <div className="flex gap-7 py-3">
                                <button className='text-white font-medium  flex gap-2'>Read more <img src={more} alt="" className='h-[.8rem] relative top-[.5rem]' /></button>
                            </div>
                        </div>
                    </div>

                    <div class=" bg-[#282C46]  rounded-md">
                        <div className="p-4 ">
                            <div><img src={alrm} alt="" /></div>
                            <div className="py-4"><h1 className='text-white font-normal'>Image, Audio & Video Answers</h1></div>
                            <div className="py-3 flex">
                                <h1 className='text-white font-normal w-[75%]'>Mauris purus leo, volutpat dapibus sagitt scelerisque pharetra odio. Sed dictum, nunc sed congue cursus, mauris.</h1>
                                <img src={vector} alt="" className='relative w-[25%] h-[25%] top-[5.8rem] right-[4.5rem]' />
                            </div>
                            <div className="flex gap-7 py-3">
                                <button className='text-white font-medium  flex gap-2'>Read more <img src={more} alt="" className='h-[.8rem] relative top-[.5rem]' /></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Feature