import React, { useEffect, useState } from 'react'
import card from '../assets/card.png'
import { AiFillClockCircle } from 'react-icons/ai'
import { IoMdStar, IoMdStarHalf } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Pkgcard = (props) => {
    const userId = useSelector(state => state.user.user);
    const [timeLeft, setTimeLeft] = useState(null);
    const id = userId?._id

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


    const handlePurchasepkg = () => {
        try {
            if (id) {
                // User is logged in
                const now = new Date().getTime();
                if (userId.freequzeto >= props.registrationfee && props.startTime <= now) {
                    // User has sufficient balance to join the package
                    toast.success("Package joined successfully");
                } else {
                    toast.error("Join time has been eneded");
                }
            } else {
                // User is not logged in
                toast.error("You need to log in to join the package");
            }
        } catch (error) {
            toast.error("Error joining the package");
        }
    };
    return (
        <>
            <div className="container  py-5">

                <div className="border b-[##C1C1C1]">
                    <div className="">
                        <div className="">
                            <img src={card} alt="" />
                        </div>

                        <div className="flex  justify-end px-1  mt-[-2.8rem] ">
                            <div className="flex  items-center   bg-[#282C46] rounded text-center text-white py-2 px-3 w-[46%] gap-2">
                                <AiFillClockCircle />
                                <div className="flex gap-1">
                                    {timeLeft ? (
                                        <>
                                            <h1 className=''>{timeLeft.days}d</h1>
                                            <h1 className=''>{timeLeft.hours}hr</h1>
                                            <h1 className=''>{timeLeft.minutes}m</h1>
                                            <h1 className=''>{timeLeft.seconds}s</h1>
                                        </>
                                    ) : (
                                        <>
                                            <h1 className=''>0d</h1>
                                            <h1 className=''>0hr</h1>
                                            <h1 className=''>0m</h1>
                                            <h1 className=''>0s</h1>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="">
                        <div className="  px-8">
                            <div className="py-3">
                                <h1 className='text-white font-medium bg-[#7e2bdb] px-3 py-1   w-fit'>{props.category}</h1>
                            </div>
                            <div className="">
                                <h1 className='font-semibold'>{props.title}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 py-2 px-7">
                        <div className="flex">
                            <IoMdStar className='text-yellow-400' />
                            <IoMdStar className='text-yellow-400' />
                            <IoMdStar className='text-yellow-400' />
                            <IoMdStar className='text-yellow-400' />
                            <IoMdStarHalf className='text-yellow-400' />
                        </div>
                        <div className="flex items-center gap-1">
                            <h1 className='text-sm'>4.5</h1>
                            <h1 className='text-sm text-[#c3c1c1]'>(2 reviews)</h1>
                        </div>
                    </div>
                    <div className="flex justify-between border border-[##C1C1C1] py-2 px-3">
                        <h1 className=''>{props.registrationfee}$</h1>
                        <button onClick={handlePurchasepkg} className='bg-[#7e2bdb] px-2 py-1 rounded text-white'>Purchase</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Pkgcard