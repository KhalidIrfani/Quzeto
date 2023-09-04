import React, { useEffect, useState } from 'react'
import Dasboard from '../Pages/Dasboard'
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { server } from '../server';
import { AiTwotoneEye } from 'react-icons/ai';
import { TfiPencil } from 'react-icons/tfi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



const UserManagement = () => {
    const user = useSelector(state => state.user.user);
    const [userData, setUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const navigate = useNavigate()
    const { id } = useParams()


    const fetchUserData = async () => {
        try {
            if (user.role === 'admin') {
                const response = await axios.get(`${server}auth/getalluser`)
                const filteredData = response.data.user.filter(userItem => userItem.role !== 'admin');
                setUserData(filteredData); // Assuming the users are stored in response.data.user
            }
        } catch (error) {
            toast.error('Error fetching user data:', error);
        }
    };
    const handleEdituser = async (eid) => {
        navigate(`/updateUserdata/${eid}`)
    }

    const handleDeleteuser = async (uId) => {
        try {
            await axios.delete(`${server}auth/deleteUser/${uId}`);
            fetchUserData();
            toast.success('Deleted successfully');
        } catch (error) {
            toast.error(`Error deleting user: ${error.message}`);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, [user]);


    const totalPages = Math.ceil(userData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const generateDigitButtons = () => {
        const digitButtons = [];
        for (let i = 1; i <= totalPages; i++) {
            digitButtons.push(
                <button
                    key={i}
                    className={`px-3 py-1 mx-1 border-2 text-xlg rounded ${i === currentPage ? 'text-[#4200FF] border-[#4200FF]' : 'bg-white text-blue-500'
                        }`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return digitButtons;
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, userData.length);
    const displayeUser = userData.slice(startIndex, endIndex);
    return (
        <>
            <Dasboard
                child={
                    <div className="py-4 rounded-md mt-4 bottom-5 bg-white">
                        <div className=""> <h1 className='text-[#00459E] px-4 text-[1rem] font-medium'>Played Quiz</h1></div>

                        <div className="overflow-x-scroll">
                            <div className="w-full py-5">
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr className='bg-[#E4E4E4]  text-[#777575]'>
                                            <th className="py-2 px-2 font-semibold">UserId</th>
                                            <th className="py-2 px-2 font-semibold">Username</th>
                                            <th className="py-2 px-2 font-semibold">First Name</th>
                                            <th className="py-2 px-2 font-semibold">Email Address</th>
                                            <th className="py-2 px-2 font-semibold">Account Type</th>
                                            <th className="py-2 px-2 font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayeUser.map((userItem, index) => (
                                            <tr className='border-b-2 border-b-[#ACA5A5] text-center items-center' key={userItem._id}>
                                                <td className="py-2">{(userItem._id)}</td>
                                                <td className="py-2">{userItem.userName}</td>
                                                <td className="py-2">{userItem.firstName}</td>
                                                <td className="py-2">{userItem.email}</td>
                                                <td className="py-2">{userItem.role}</td>
                                                <td className="flex mx-2 gap-1 justify-center items-center mt-2">
                                                    <button onClick={() => handleEdituser(userItem._id)} className="bg-[#00439A] hover:bg-blue-800 text-white font-bold text-center rounded-full h-[20px] w-[20px]"><AiTwotoneEye className='ml-[.17rem] text-[.9rem]' /></button>
                                                    <button onClick={() => handleEdituser(userItem._id)} className="bg-[#FFB125] hover:bg-orange-400 text-white font-bold text-center rounded-full h-[20px] w-[20px]"><TfiPencil className='ml-[.16rem] text-[.9rem]' /></button>
                                                    <button onClick={() => handleDeleteuser(userItem._id)} className="bg-[#E32828] hover:bg-red-700 text-white font-bold text-center rounded-full h-[20px] w-[20px]"><RiDeleteBin6Line className='ml-[.18rem] text-[.9rem]' /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div className="flex justify-center mt-4">
                            <button
                                className="px-3 rounded py-2 bg-blue-500 text-white disabled:bg-gray-300"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <FaChevronLeft />
                            </button>

                            {generateDigitButtons()}

                            <button
                                className="px-3 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default UserManagement