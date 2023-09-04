import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Nav from '../Nav'
import { useParams } from 'react-router-dom';
import { server } from '../../server';
import axios from 'axios';
import { toast } from 'react-toastify';
import prize from '../../assets/prize.png';
import participant from '../../assets/participant.png';
import correct from '../../assets/correct.png'
import wrong from '../../assets/wrong.png'
import * as math from 'mathjs';
import Dasboard from '../../Pages/Dasboard';

const ShowResult = () => {
    const { id } = useParams();
    const [performanceData, setPerformanceData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultResponse = await axios.get(`${server}result/getResult/${id}`);
                const quizresult = resultResponse.data; // Response data contains the answer details
                setPerformanceData(quizresult);

                // Assuming your response structure has a 'quiz' property

            } catch (error) {
                toast.error(error.message);
                console.log(error);
            }
        };

        fetchData();
    }, [id]);



    return (
        <>
            <Dasboard
                child={
                    <div className="">

                        <div className="contanier px-4 py-6 rounded-md mt-[2rem] bg-white">
                            {performanceData && (
                                <div className="">
                                    <div className="bg-[#00459E] py-4 rounded-md">
                                        <div className="flex justify-between items-center px-3">
                                            <div>
                                                <p className="text-white text-xl">{performanceData.quizId.title}</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-2  bg-white rounded-full md:px-3 px-1  py-1 items-center">
                                                    <img src={prize} alt="" className="md:w-[17%] w-[14%]" />
                                                    <p className='text-sm md:text-base'>Prize: {performanceData.quizId.firstPrice}PKR</p>
                                                </div>

                                                <div className="flex gap-2 bg-white rounded-full px-3 py-1 items-center">
                                                    <img src={participant} alt="" className="md:w-[17%] w-[14%]" />
                                                    <p className='text-sm md:text-base'>Participants: {performanceData.quizId.minParticipants}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="">
                                            <h1 className='text-xl font-normal pt-5 my-3 px-3 '>Performance Report</h1>
                                        </div>
                                        <div className="md:bg-[#304F78] bg-white rounded-md md:px-8 px-4 md:flex py-6 md:mx-3 justify-between">
                                            <div className="gap-5 md:flex md:w-full">
                                                <div className="flex  gap-5">
                                                    <div className='md:flex-col bg-[#304F78]  rounded md:px-0 px-4 md:py-0 py-2 gap-2 flex'>
                                                        <h1 className="text-white font-medium text-2xl text-center md:h-[70px] h-[50px] w-[50px] md:w-[70px] rounded-full border-4 border-[#D1D1D1] flex items-center justify-center">{performanceData.totalQuestions}</h1>
                                                        <h1 className='text-white text-[.8rem] text-center py-2'>Total <br /> Questions</h1>
                                                    </div>
                                                    <div className='md:flex-col bg-[#304F78] rounded md:px-0 px-4 md:py-0 py-2 gap-2  flex'>
                                                        <h1 className="text-white font-medium text-2xl text-center md:h-[70px] h-[50px] w-[50px] md:w-[70px]  rounded-full border-4 border-[#FFD279] flex items-center justify-center">{performanceData.attemptedQuestion}</h1>
                                                        <h1 className='text-white text-[.8rem] text-center py-2'>Attempted <br />  Questions</h1>
                                                    </div>
                                                </div>

                                                <div className="flex gap-5 md:py-0 py-4">
                                                    <div className='md:flex-col bg-[#304F78] rounded md:px-0 px-4 md:py-0 py-2 gap-2  flex'>
                                                        <h1 className="text-[#66ECC4] font-medium text-2xl text-center md:h-[70px] h-[50px] w-[50px] md:w-[70px]  rounded-full border-4 border-[#66ECC4] flex items-center justify-center">{performanceData.score}</h1>
                                                        <h1 className='text-white text-[.8rem] text-center py-2'>Correct<br />Questions</h1>
                                                    </div>
                                                    <div className='md:flex-col bg-[#304F78] rounded md:px-0 px-5 md:py-0 py-2 gap-2  flex'>
                                                        <h1 className="text-[#FFB125] font-medium text-2xl  text-center md:h-[70px] h-[50px] w-[50px] md:w-[70px]  rounded-full border-4 border-[#FFA400] flex items-center justify-center">10</h1>
                                                        <h1 className='text-white text-[.8rem] text-center py-2'>Your <br />Position</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between bg-[#304F78] rounded py-2 px-3">
                                                <div className="flex justify-start items-center">
                                                    <h1 className='text-xl md:hidden block text-white font-medium'>your score</h1>
                                                </div>
                                                <div className="flex justify-end">
                                                    <div className=' bg-[white] md:h-[80px] md:w-[80px] h-[60px] w-[60px] rounded-full items-center  flex md:flex-col justify-center'>
                                                        <h1 className="text-black font-medium text-[1.5rem] ">{math.format(math.fraction(performanceData.score, performanceData.totalQuestions), { fraction: 'ratio' })}<br /></h1>
                                                        <h1 className='text-[.6rem] md:block hidden'>your score</h1>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="">
                                            <h1 className='text-[1.2rem] font-normal  my-3 px-3 '>Submission</h1>
                                        </div>
                                        <div className="bg-gray-100 border border-gray-300 rounded-md py-3">
                                            {performanceData.questions.map((questionData, index) => (
                                                <div className={`border rounded-md py-2 my-2 mx-3 ${questionData.isCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`} key={index}>
                                                    <p className='font-medium px-2 py-1'>{`QNO.${index + 1}: ${questionData.question}`}</p>
                                                    <h1 className={`text-blue-600 flex justify-between items-center font-medium px-2 gap-2`}>
                                                        <span className='font-medium'> Answer: {questionData.selectedAnswer}</span>
                                                        {questionData.isCorrect ? (
                                                            <img src={correct} alt="" className='w-[20px] h-[20px]' />
                                                        ) : (
                                                            <img src={wrong} alt='' className='w-[20px] h-[20px]' />
                                                        )}
                                                    </h1>
                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                } />
        </>
    )
}

export default ShowResult