import React, { useEffect, useState } from 'react'
import laptop from '../assets/laptop.png'
import Pkgcard from './Pkgcard'
import axios from 'axios'
import { server } from '../server'

const Ourquiz = () => {
    const [PackageData, setPackageData] = useState([]); // Initialize PackageData as an empty array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${server}quizpkg/getAllpkg`);
                setPackageData(response.data);
            } catch (error) {
                console.error('Error fetching package data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <div className="container">

                <div className="">
                    <div className="py-12 flex justify-center ">
                        <h1 className='font-bold text-[2rem] border-b-2 lg:w-[14%]  border-black text-center '>Our Quizez</h1>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5 px-5 lg:px-24">
                    {PackageData.map((pkgData) => (
                        <Pkgcard key={pkgData}
                            title={pkgData.title}
                            category={pkgData.category}
                            startTime={pkgData.startTime}
                            registrationfee={pkgData.registrationFee}

                        />

                    ))}

                </div>


                <div className="grid lg:grid-cols-2">
                    <div className="">
                        <div className="bg-[#282C46] md:px-6 py-10 px-2">
                            <h1 className='text-white font-medium md:px-10 pt-6 text-[1.5rem]'>Any Queries?</h1>
                            <h1 className='lg:w-[77%] text-[1rem] md:px-10 py-3 text-[white]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</h1>

                            <div className="">
                                <form className='text-center'>
                                    <div className="pt-7">
                                        <input type="text" name="" id="" placeholder='First Name' className='rounded-md py-2 my-4 px-4 md:mx-9 md:w-auto w-[75%]' />
                                        <input type="text" name="" id="" placeholder='Last Name' className='rounded-md py-2 px-4 md:w-auto w-[75%]' />
                                    </div>
                                    <div className="">
                                        <textarea
                                            name=""
                                            id=""
                                            class="my-10 lg:w-[78%] md:h-[34.5vh] md:w-[62%] w-[75%] h-[15vh] rounded-md px-3 md:ml-8 py-2"
                                            placeholder="Address"
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-center">
                                        <button type='submit' className='bg-[#00459E] text-center flex justify-center text-white rounded-md py-2 font-medium px-4'>Submit Details</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <img src={laptop} alt="" />
                    </div>

                </div>
            </div>






        </>
    )
}

export default Ourquiz