import React, { useEffect, useState } from 'react'
import Dasboard from '../../Pages/Dasboard'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../../server';
import { AiTwotoneEye } from 'react-icons/ai';
import { TfiPencil } from 'react-icons/tfi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return ` ${month} /${day}/ ${year}`;
};

const UserSchedulequiz = () => {

    const [showSelectOptions, setShowSelectOptions] = useState(false);
    const [scheduleData, setScheduleData] = useState([]);
    const user = useSelector(state => state.user.user);
    const id = user._id

    const handleAddQuestionClick = () => {
        setShowSelectOptions(!showSelectOptions);
    };

    useEffect(() => {
        if (user) {
            const fetchScheduleData = async () => {
                try {
                    let response;
                    if (user.role === 'user') {

                        response = await axios.get(`${server}schedule/getSchedules/${id}`);
                    } else if (user.role === 'admin') {

                        response = await axios.get(`${server}schedule/getSchedule`);
                    }
                    setScheduleData(response.data);
                } catch (error) {
                    console.error('Error fetching schedule data:', error);
                }
            };

            fetchScheduleData();
        }
    }, [user]);

    const handleDeleteSchedule = async (scheduleId) => {
        try {
            console.log('Deleting schedule:', scheduleId); // Add this line
            const response = await axios.delete(`${server}schedule/delete/${scheduleId}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    return (
        <>
            <Dasboard
                child={
                    <div className='py-4 rounded-md mt-4 bottom-5 bg-white'>
                        <div className="px-4">
                            <button className='text-[#00459E]  text-[1rem] font-medium'>Schedule new quiz</button>
                        </div>
                        <div className="py-5">
                            <div className="md:overflow-hidden overflow-scroll">
                                <table className="w-full">

                                    <thead className='w-full border'>
                                        <tr className='bg-[#E4E4E4] text-base text-[#777575]'>
                                            <th className="py-2 px-4">Date</th>
                                            <th className="py-2 px-4">Category</th>
                                            <th className="py-2 px-4">Prize</th>
                                            <th className="py-2 px-4">No. of Questions</th>
                                            <th className="py-2 px-4">Status</th>
                                            <th className="py-2 px-4">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {scheduleData && scheduleData.map((scheduleItem, index) => (
                                            <tr className='border-b-2 border-b-[#ACA5A5]  text-center items-center text-xs md:text-lg' key={index}>
                                                <td className="py-2">{getFormattedDate(scheduleItem.date)}</td>
                                                <td className="py-2">{scheduleItem.category}</td>
                                                <td className=" ">{scheduleItem.firstPrice}</td>
                                                <td className="">{scheduleItem.questionId.length}</td>
                                                <td className=" ">{scheduleItem.type}</td>
                                                <td className="flex gap-1 mx-2 justify-center items-center mt-4">
                                                    <Link to={`/updateschedule/${scheduleItem._id}`}>
                                                        <button className="bg-[#00439A] hover:bg-blue-800 text-white font-bold text-center rounded-full h-[20px] w-[20px]"><AiTwotoneEye className='ml-[.17rem] text-[.9rem]' /></button>
                                                    </Link>
                                                    <Link to={`/updateschedule/${scheduleItem._id}`}>
                                                        <button className="bg-[#FFB125] hover:bg-orange-400 text-white font-bold text-center rounded-full h-[20px] w-[20px]"><TfiPencil className='ml-[.16rem] text-[.9rem]' /></button>
                                                    </Link>
                                                    <button onClick={() => handleDeleteSchedule(scheduleItem._id)} className="bg-[#E32828] hover:bg-red-700 text-white font-bold text-center rounded-full h-[20px] w-[20px]"><RiDeleteBin6Line className='ml-[.18rem] text-[.9rem]' /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>

                } />



        </>
    )
}

export default UserSchedulequiz