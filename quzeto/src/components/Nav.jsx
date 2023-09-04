import React, { useState } from 'react'
import wallet from '../assets/wallet.png'
import dollar from '../assets/dollar.png'
import hand from '../assets/hand.png'
import profile from '../assets/profile.png'
import { backend_url, server } from '../server'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Nav = (prop) => {
    const user = useSelector(state => state.user.user);
    const [menuVisible, setMenuVisible] = useState(false);
    const Navigate = useNavigate()

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };



    const logout = async () => {
        try {
            await axios.get(`${server}auth/logout`, {
                withCredentials: true
            })
            toast.success('Logout Successfully');
            Navigate('/login');
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className="container relative items-center">
                {prop.btn}
                <div className="flex justify-between bg-white  py-2 px-5  rounded-md">
                    <div className="flex md:gap-7 lg:px-0 md:px-6 relative md:left-0 left-[1rem] items-center">
                        <div className="flex items-center gap-2">
                            <img src={wallet} alt="" className='w-[20%] md:w-auto' />
                            <div className="md:text-base text-xs font-medium">
                                <h1 className=''>{user.realquzeto}$</h1>
                                <p className=''>Real Qzeto</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={hand} alt="" className='w-[20%] md:w-auto' />
                            <div className="font-medium   md:text-base text-xs">
                                <h1 className=' '>{user.freequzeto}$</h1>
                                <p className=''>Free Qzeto</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={dollar} alt="" className='w-[20%] md:w-auto' />
                            <div className="font-medium md:text-base text-xs p-0 m-0 items-center">
                                <h1 className=' '>{user.bonusquzeto}$</h1>
                                <p className=' '>Bonus Qzeto</p>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2">
                            <div className="font-medium text-[#003881] md:block hidden items-center">
                                <h1 className='text-[.9rem]  mt-1'>{user.lastName}</h1>
                                <p className='text-[.7rem] text-end'>{user.role}</p>
                            </div>
                            <div className="">
                                <img
                                    src={`${backend_url}${user.avatar}`}
                                    alt=""
                                    className='profile-image h-[35px] relative w-[35px] md:left-0 left-[1rem] rounded-full cursor-pointer'
                                    onClick={toggleMenu}
                                />

                                {menuVisible && (
                                    <div className="profile-image-menu z-10 absolute text-center gap-3 rounded-md md:w-[8%] w-[20%]  py-3 right-6 bg-[#ffff]">
                                        <button className="menu-item">Profile</button>
                                        <button className="menu-item">Home</button>
                                        <button onClick={logout} className="menu-item text-black">Logout</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Nav