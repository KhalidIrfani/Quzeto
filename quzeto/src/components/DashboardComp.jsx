import React, { useEffect, useState } from 'react'

import { AiFillDollarCircle, AiFillQuestionCircle } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'

import axios from 'axios';
import { server } from '../server';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { resolvePath, useNavigate } from 'react-router-dom'
import Dasboard from '../Pages/Dasboard'
import dashes from '../assets/dashes.png'
import sharef from '../assets/sahref.png'
import down from '../assets/down.png'
import tick from '../assets/tick.png'
import crass from '../assets/crass.png'

import Quizcard from './Quizcard'




const DashboardComp = () => {
    const userId = useSelector(state => state.user.user);
    const [scheduleData, setScheduleData] = useState([]);
    const [schedulesData, setSchedulesData] = useState([]);
    const [resultData, setResultData] = useState([]);
    const id = userId._id
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${server}schedule/getSchedule`)
            .then(response => {
                setScheduleData(response.data);
            })

            .catch(error => {
                console.error('Error fetching schedule data:', error);
            });

        fetchResultData();
        fetchScheduleData();

    }, [userId]);


    const fetchScheduleData = async () => {
        try {
            let response;
            if (userId.role === 'user') {
                response = await axios.get(`${server}schedule/getSchedules/${id}`);

            } else if (userId.role === 'admin') {
                response = await axios.get(`${server}schedule/getSchedule`);
            }
            setSchedulesData(response.data);
        } catch (error) {
            console.error('Error fetching schedule data:', error);
        }
    };



    const fetchResultData = async () => {
        try {
            let response;
            if (userId.role === 'user') {
                // Fetch schedule data for the logged-in user
                response = await axios.get(`${server}result/result/${userId._id}`);
            } else if (userId.role === 'admin') {
                // Fetch all schedule data for admin
                response = await axios.get(`${server}result/getResults`);
            }
            setResultData(response.data);
        } catch (error) {
            console.error('Error fetching schedule data:', error);
        }
    };


    return (
        <>
            <Dasboard
                child={
                    <div>
                        <div className="px-3 mx-2 rounded-md top-8 relative bottom-5 bg-white">
                            <div className="items-center">
                                <div className="">
                                    <button className='text-[#00459E] text-[1rem] py-3 font-medium'>Satatistics</button>
                                </div>

                                <div className='py-4 md:flex lg:gap-12  lg:px-12'>

                                    <div className="flex md:py-0 py-2 lg:gap-12 md:gap-0 gap-8">
                                        <div className="flex gap-2 items-center">
                                            <img src={dashes} alt="" className='w-[45px] h-[45px]' />
                                            <div className="">
                                                <p className='text-base font-medium text-[#00459E]'>{schedulesData.length}</p>
                                                <p className='text-xs  text-[#A9A9A9]'>Shedule Quizez</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <div className="w-[45px] h-[45px] rounded-full bg-[#EEC907]">
                                                <img src={sharef} alt="" className='px-3 py-3' />
                                            </div>
                                            <div className="">
                                                <p className='text-base font-medium text-[#EEC907]'>{resultData.length}</p>
                                                <p className='text-xs text-[#A9A9A9]'>Played Quizez</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex   md:py-0 py-2 lg:gap-3 md:gap-0 gap-3">

                                        <div className="flex gap-2 items-center">
                                            <div className="w-[48px] h-[48px] rounded-full bg-[#42BA96]">
                                                <img src={down} alt="" className='px-3 py-3' />
                                            </div>
                                            <div className="">
                                                <p className='text-base font-medium text-[#42BA96]'>10</p>
                                                <p className='text-xs text-[#A9A9A9]'>Questions Submited</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <div className="w-[47px] h-[47px] rounded-full bg-[#32CD32]">
                                                <img src={tick} alt="" className='py-1 px-1' />
                                            </div>
                                            <div className="">
                                                <p className='text-base font-medium text-[#32CD32]'>8</p>
                                                <p className='text-xs text-[#A9A9A9]'>Questions Approved</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 md:py-0 py-2 items-center">
                                        <div className="w-[47px] h-[47px] rounded-full bg-[#E32828]">
                                            <img src={crass} alt="" className='px-3 py-3' />
                                        </div>
                                        <div className="">
                                            <p className='text-base font-medium text-[#E32828]'>2</p>
                                            <p className='text-xs text-[#A9A9A9]'>Questions Rejected</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="grid md:grid-cols-3 pt-20 px-3 gap-5">
                            {
                                scheduleData.map((schedule) => (
                                    <Quizcard key={schedule._id}
                                        _id={schedule._id}
                                        title={schedule.title}
                                        registrationFee={schedule.registrationFee}
                                        startTime={schedule.startTime}
                                        endTime={schedule.endTime}
                                        quantity={schedule.quantity}
                                        minParticipants={schedule.minParticipants}
                                        firstPrice={schedule.firstPrice}
                                        secondPrice={schedule.secondPrice}
                                        thirdPrice={schedule.thirdPrice}

                                    />
                                ))
                            }
                        </div>

                    </div>



                }
            />

        </>
    )
}

export default DashboardComp



