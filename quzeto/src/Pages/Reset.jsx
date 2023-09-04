import React from 'react'
import quiz from '../assets/quiz.png'
import { Link } from 'react-router-dom'

const Reset = () => {
    return (
        <>
            <div className="container bg-[#0D4EA3] absolute h-full w-full">
                <div className="items-center flex justify-center relative top-[2rem]">
                    <img src={quiz} alt="" className="w-[20rem] text-center items-center " />
                </div>

                <div className="container lg:w-[35%] w-[90%] md:left-[2.2rem] left-[1.1rem] lg:left-[32%] relative items-center py-5 hover:text-black hover:rounded-[2rem] hover:px-[2rem] hover:bg-white mt-[3rem]">
                    <div className="font-bold md:text-[1.4rem] text-[2rem] flex justify-center"><h1 className="">Reset Password</h1></div>
                    <div class="grid grid-cols-1 py-5">
                        <div class="flex flex-col">
                            <label className="py-1 font-medium ">Emial</label>
                            <input type="text" placeholder='Emial' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center  text-[1.2rem]" />
                        </div>

                    </div>

                    <div className="grid grid-col-1 hover:bg-[#003881]  border border-[#ACA5A5]-2 rounded-lg ">
                        <button className="py-2 text-white">Submit</button>
                    </div>

                    <div className="text-center py-2">
                        <h1 className="text-[#ACA5A5]">Don't have an account? <button className="text-[#003881]"><Link to='/signup'>Sign Up</Link></button></h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset