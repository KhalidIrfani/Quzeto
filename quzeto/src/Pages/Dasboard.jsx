import React, { useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { AiOutlineMenu } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'

const Dasboard = (props) => {
    const [SideBar, setMenusideBar] = useState(false);

    const toggleSidebar = () => {
        setMenusideBar(!SideBar)
    }
    return (
        <>
            <div className="bg-[#D9D7D7] h-full ">
                <div className="md:py-2 py-1 flex w-full">
                    <div className="lg:w-[23%] ">
                        <Sidebar SideBar={SideBar} />
                    </div>
                    <div className="w-full px-2">
                        <div className="w-full">
                            <Nav
                                btn={

                                    <div>

                                        <button onClick={toggleSidebar} className=" lg:hidden block z-20  absolute md:px-3 py-4 md:py-6 px-1">
                                            {SideBar ?
                                                <RxCross2 className="text-white bg-gray700 text-2xl" />
                                                :

                                                <AiOutlineMenu className="text-2xl text-black" />

                                            }
                                        </button>
                                    </div>
                                }
                            />
                        </div>

                        <div className="">
                            {props.child}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dasboard