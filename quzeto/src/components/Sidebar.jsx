import React, { useEffect, useState } from 'react'
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai'
import { FiCodesandbox, FiHome, FiPackage } from 'react-icons/fi'
import { LiaUserCogSolid, LiaWalletSolid } from 'react-icons/lia'
import { RxCalendar } from 'react-icons/rx'
import { LuBarChartHorizontal } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'



const sideBar = [
    {
        icon: <FiHome className='text-[1.5rem]' />,
        head: "Dashboard",
        url: '/dashboard'
    },
    {
        icon: <FiCodesandbox className='text-[1.5rem]' />,
        head: "Question",
        url: '/questiontype'
    },
    {
        icon: <AiOutlineClockCircle className='text-[1.5rem]' />,
        head: "Schedule Quiz",
        url: '/schedule'
    },
    {
        icon: <FiPackage className='text-[1.5rem]' />,
        head: "Packages",
        url: '/Packages'
    },
    {
        icon: <AiOutlineUser className='text-[1.5rem]' />,
        head: "Profile",
        url: '/profile'
    },
    {
        icon: <LiaWalletSolid className='text-[1.5rem]' />,
        head: "My Wallet",
    },
    {
        icon: <LiaUserCogSolid className='text-[1.5rem]' />,
        head: "User Management",
        url: '/manageuser'
    },
    {
        icon: <RxCalendar className='text-[1.5rem]' />,
        head: "Admin Schedule Quiz ",
        url: '/adminschedule'
    },
    {
        icon: <RxCalendar className='text-[1.5rem]' />,
        head: "User Schedule Quiz",
        url: '/userschedule'
    },
    {
        icon: <LuBarChartHorizontal className='text-[1.5rem]' />,
        head: "Play Quiz",
        url: '/playquiz'
    }
]

const Sidebar = ({ SideBar }) => {
    const user = useSelector(state => state.user.user);
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const currentIndex = sideBar.findIndex((item) => item.url === location.pathname);
        setActiveIndex(currentIndex !== -1 ? currentIndex : 0); // Set to 0 if currentIndex is -1
    }, [location.pathname]);

    const filteredSidebar = sideBar.filter((details) => {
        if (details.head === "User Management" && user.role === "user") {
            return false; // Exclude "User Management" for regular users
        } else if (details.head === "Admin Schedule Quiz " && "Packages" && user.role === "user") {
            return false; // Exclude "Admin Schedule Quiz " and "User Schedule Quiz" for regular users
        } else if (details.head === "Packages" && user.role === "user") {
            return false; // Exclude "Admin Schedule Quiz " and "User Schedule Quiz" for regular users
        }
        return true;
    });


    return (
        <>
            <div className='container lg:w-[100%] sm:w-[33%] w-[70%] lg:relative absolute z-10'>
                <div className={`bg-[#00459E]  h-[130vh]   lg:block px-3 rounded-md py-3 ${SideBar ? 'md:block' : 'hidden'}`}>
                    <Link to='/'><h1 className='text-center font-pacifico text-white font-bold text-[2rem] '>iQzeto</h1></Link>
                    <div className="">
                        {filteredSidebar.map((details, index) => (
                            <div key={index} className="text-white">
                                <Link to={details.url}>
                                    <button
                                        onClick={() => setActiveIndex(index)}
                                        className={`flex px-2 font-medium text-[1rem] w-full items-center my-3 py-2 gap-3 hover:bg-white hover:text-[#00459E] rounded-md ${activeIndex === index ? 'bg-white text-[#00459E]' : ''
                                            }`}
                                    >
                                        {details.icon} {details.head}
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar