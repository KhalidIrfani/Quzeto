import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux';
import { AiFillDollarCircle, AiFillQuestionCircle } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'
import userprofile from '../assets/userprofile.png'
import hand from '../assets/hand.png'
import border from '../assets/border.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../server';
import { useNavigate } from 'react-router-dom';

const Quizcard = (props) => {
    const userId = useSelector(state => state.user.user);
    const [popup, setPopup] = useState(false)
    const [timeLeft, setTimeLeft] = useState(null);
    const [userRegistered, setUserRegistered] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {

        checkregisterquiz()
    }, []);


    const checkregisterquiz = async () => {
        try {
            const response = await axios.get(`${server}schedule/checkregisterquiz/${props._id}/${userId._id}`); // Log the response for debugging purposes
            setUserRegistered(response.data.isRegistered);
        } catch (error) {
            // Log the error for debugging purposes
            console.error("API Error:", error);

            // Display an error message to the user using toast or another method
            toast.error("An error occurred while checking registration.");
        }
    };

    useEffect(() => {
        // Set the target date and time for the countdown
        const targetDate = new Date(props.startTime);

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate.getTime() - now;

            if (difference <= 0) {
                // Countdown has ended
                setTimeLeft(null);

                return;
            }

            // Calculate days, hours, minutes, and seconds left
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        // Update the timer every second
        const timer = setInterval(calculateTimeLeft, 1000);

        // Clean up the timer when the component unmounts
        return () => clearInterval(timer);
    }, [props.startTime]);



    const handleRegister = async () => {
        try {
            const now = new Date().getTime();
            if (props.startTime <= now) {
                await axios.post(`${server}schedule/registerQuiz`, {
                    quizId: props._id,
                    userId: userId._id
                })
                setUserRegistered(true);
                toast.success('User registered successfully')
            }
            else {
                toast.error("registeration time has been ended")
            }
        } catch (error) {
            toast.error('Failed to register user');
            console.log(error)
        }
    }


    const handlePaidQuiz = async () => {
        try {
            const now = new Date().getTime();
            if (userId.freequzeto >= props.registrationFee && props.startTime <= now) {
                await axios.post(`${server}schedule/registerQuiz`, {
                    quizId: props._id,
                    userId: userId._id
                })
                setUserRegistered(true);
                toast.success('User registered successfully');
                setPopup(false);
            }
            else {
                toast.error("Registeration time ha been ended  or insufficient Balance")
                setPopup(false);
            }
        } catch (error) {
            toast.error('Failed to register user');
        }
    }

    const closeModal = () => {
        setPopup(false);
    };



    const handlePlayQuiz = () => {
        const now = new Date().getTime();
        const startTime = new Date(props.startTime).getTime();
        const endTime = new Date(props.endTime).getTime();


        if (userRegistered && startTime <= now && endTime >= now) {
            navigate(`/attemptquiz/${props._id}`); // Navigate to the quiz page
        } else {
            if (!userRegistered) {
                toast.error('Please register to play the quiz.');
            }
            else if (startTime > now) {
                toast.error('Quiz has not started yet.');
            } else if (endTime < now) {
                toast.error('Quiz has already ended.');
            }
        }
    };



    return (
        <>
            <div className="">
                <div className="">
                    <div className=" gap-3" >

                        <div className="bg-[#00459E] w-full py-3">
                            <div className=" flex justify-between px-2 items-center gap-2">
                                <h1 className='text-white font-normal'>{props.title}</h1>
                                {props.registrationFee === 0 ? (
                                    <button className="text-white bg-[#46CC5B] mt-[rem] rounded-full px-[.77rem] text-[.9rem] text-center font-normal">Free</button>
                                ) : (
                                    <button className="text-white bg-[#BF2B60] mt-[rem] rounded-full px-[.77rem] text-[.9rem] text-center font-normal">Paid</button>
                                )}
                            </div>
                            {timeLeft ? (
                                <div className="py-2">
                                    <h1 className='pt-4 px-2 text-white py-1'>Ends in</h1>
                                    <div className="flex px-2 gap-1">
                                        <div className="w-[33px]">
                                            <h1 className="text-white text-center px-2 py-1 bg-[#42BA96]">
                                                {timeLeft.days}
                                            </h1>
                                            <h1 className="text-white text-[.8rem] text-center">Days</h1>
                                        </div>
                                        <div className="w-[33px]">
                                            <h1 className="text-white text-center px-2 py-1 bg-[#EEC907]">
                                                {timeLeft.hours}
                                            </h1>
                                            <h1 className="text-white text-[.8rem] text-center">Hours</h1>
                                        </div>
                                        <div className="w-[33px]">
                                            <h1 className="text-white text-center px-1 py-1 bg-[#32CD32]">
                                                {timeLeft.minutes}
                                            </h1>
                                            <h1 className="text-white text-[.8rem] text-center">Min</h1>
                                        </div>
                                        <div className="w-[33px]">
                                            <h1 className="text-white mx-auto text-center px-2 py-1 bg-[#FFA400]">
                                                {timeLeft.seconds}
                                            </h1>
                                            <h1 className="text-white text-[.8rem] text-center">Sec</h1>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-2">
                                    <h1 className='pt-4 px-2 text-white py-1'>Ends in</h1>
                                    <div className="flex px-2 gap-1">

                                        <div className="w-[33px]">
                                            <h1 className="text-white text-center px-2 py-1 bg-[#42BA96]">
                                                0
                                            </h1>
                                            <h1 className="text-white text-[.8rem] text-center">Days</h1>
                                        </div>
                                        <div className="">
                                            <h1 className="text-white text-center px-2 py-1 bg-[#EEC907]">
                                                0
                                            </h1>
                                            <h1 className="text-white text-[.8rem] text-center">Hours</h1>
                                        </div>
                                        <div className="w-[33px]">
                                            <h1 className="text-white text-center px-2 py-1 bg-[#32CD32]">
                                                0
                                            </h1>
                                            <h1 className="text-white text-[.8rem] text-center">Min</h1>
                                        </div>
                                        <div className="w-[33px]">
                                            <h1 className="text-white mx-auto text-center px-2 py-1 bg-[#FFA400]">
                                                0
                                            </h1>
                                            <h1 className="text-white text-[.8rem] text-center">Sec</h1>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="bg-[#F0F0F0] px-2 items-center flex justify-between">
                            <div className="items-center flex gap-2">
                                <div className=" flex gap-1 items-center">
                                    <AiFillQuestionCircle className='text-[#BF2B60] text-[1.4rem] ' />
                                    <h1 className='text-[.9rem]'>{props.quantity}</h1>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <FaUserCircle className='text-[#00459E] text-[1.3rem] ' />
                                    <h1 className='text-[.9rem]'>{props.minParticipants}</h1>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <AiFillDollarCircle className='text-[#FFB125] text-[1.4rem] ' />
                                    <h1 className='text-[.9rem]'>{props.registrationFee}</h1>
                                </div>
                            </div>
                            <div className="h-[7%] w-[12%]">
                                <img src={userprofile} alt="" className='relative top-[-1.2rem] right-2' />
                            </div>
                        </div>

                        <div className="bg-white py-3">
                            <div className="flex justify-between">
                                <div className="px-4 ">
                                    <h1 className='py-1 pt-3 text-[1rem] font-medium'>Prize Pool</h1>
                                    <div className="flex gap-1 items-center">
                                        <h1 className='bg-[#3EC78D] text-white rounded-full px-[.15rem] py-[.09rem] text-center text-[.7rem]'>1st</h1>
                                        <h1>${props.firstPrice}</h1>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <h1 className='bg-[#00459E] text-white rounded-full px-[.15rem] py-[.22rem] text-center text-[.6rem]'>2nd</h1>
                                        <h1>${props.secondPrice}</h1>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <h1 className='bg-[#FFB125] text-white rounded-full px-[.15rem] py-[.12rem] text-center text-[.7rem]'>3rd</h1>
                                        <h1>${props.thirdPrice}</h1>
                                    </div>
                                </div>

                                <div className="px-4 py-2">
                                    <h1 className='py-1 text-[1rem] font-medium'>Quiz Schedule</h1>
                                    <p className='text-[.8rem]'>Start: {moment(props.startTime).format('MMM D, YYYY')}</p>
                                    <p className='text-[.8rem]'>End: {moment(props.endTime).format('MMM D, YYYY')}</p>
                                </div>

                            </div>

                            <div className="px-6 pt-6">
                                {userRegistered ? (
                                    <button
                                        onClick={() => handlePlayQuiz()}
                                        className="rounded-md text-[1.2rem] text-white py-1 text-center w-full bg-[#FFB125]"
                                    >
                                        Play
                                    </button>
                                ) : (
                                    <button
                                        className="rounded-md text-[1.2rem] text-white py-1 text-center w-full bg-[#3EC78D]"
                                        onClick={() => props.registrationFee === 0 ? handleRegister() : setPopup(true)}
                                    >
                                        Registered
                                    </button>
                                )}

                            </div>

                        </div>

                    </div>



                </div >

                {popup && (
                    <div className="fixed inset-0 z-10 bg-black bg-opacity-50  flex justify-center items-center">
                        <div className="bg-white py-6 rounded-xl shadow-md px-12">
                            <div className="text-center">
                                <h2 className="text-lg font-semibold mb-2">Do you want to registered</h2>
                            </div>
                            <div className="flex gap-5 py-4">
                                <div className="flex gap-2">
                                    <img src={border} alt="" className='w-[6px]' />
                                    <div className="">
                                        <h1 className='text-xs font-medium pb-1'>Required Free quzeto</h1>

                                        <div className="flex gap-2 py-1">
                                            <img src={hand} alt="" className='' />
                                            <div className="font-medium text-xs">
                                                <h1 className=' '>{props.registrationFee}$</h1>
                                                <p className=''>Free Qzeto</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <img src={border} alt="" className='w-[6px]' />
                                    <div className="">
                                        <h1 className='text-xs pb-1 font-medium'>Available Free quzeto</h1>

                                        <div className="flex gap-2 py-1">
                                            <img src={hand} alt="" className='' />
                                            <div className="font-medium text-xs">
                                                <h1 className=' '>{userId.freequzeto}$</h1>
                                                <p className=''>Free Qzeto</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="flex justify-center pt-4 gap-2">
                                <button
                                    onClick={closeModal}
                                    className="bg-[#CECECE] hover:bg-gray-600 hover:text-white text-[#515151] text-center font-semibold py-1 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    No
                                </button>
                                <button
                                    onClick={() => handlePaidQuiz()}
                                    className="  bg-[#1DB95B] hover:bg-green-600 text-white font-semibold text-center py-1 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default Quizcard