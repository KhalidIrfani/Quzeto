import React, { useEffect, useState } from 'react'
import Dasboard from '../Pages/Dasboard'
import axios from 'axios';
import { server } from '../server';
import { useSelector } from 'react-redux';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return ` ${month} /${day}/ ${year}`;
};

const Adminschedule = () => {
    const user = useSelector(state => state.user.user);
    const [scheduleData, setScheduleData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const id = user._id
    useEffect(() => {

        const fetchScheduleData = async () => {
            try {
                let response;
                if (user.role === 'user') {
                    console.log('Fetching user schedule...');
                    response = await axios.get(`${server}schedule/getSchedule/${id}`);
                    console.log(response.data)
                } else if (user.role === 'admin') {
                    console.log('Fetching all schedules...');
                    response = await axios.get(`${server}schedule/getSchedule`);
                }
                console.log('Response:', response.data);
                setScheduleData(response.data);
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };

        fetchScheduleData();
    }, [user]);

    const totalPages = Math.ceil(scheduleData.length / itemsPerPage);

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
    const endIndex = Math.min(startIndex + itemsPerPage, scheduleData.length);
    const displayeSchedule = scheduleData.slice(startIndex, endIndex);
    return (
        <>
            <Dasboard
                child={
                    <div className='py-4 rounded-md mt-4 bottom-5 bg-white'>
                        <div className=""> <h1 className='text-[#00459E] px-4 text-[1rem] font-medium'>Admin Schedule Quiz</h1></div>
                        <div className="py-5">
                            <div className="md:overflow-hidden overflow-x-scroll">
                                <table className="w-full">

                                    <thead className='w-full border'>
                                        <tr className='bg-[#E4E4E4]   text-[#777575]'>
                                            <th className="py-2 px-2 text-base font-semibold ">Quiz Name</th>
                                            <th className="py-2 px-2  text-base font-semibold">Quiz Creater Name</th>
                                            <th className="py-2  px-2  text-base font-semibold">Quiz Creator Earning</th>
                                            <th className="py-2 px-2  text-base font-semibold">Quiz Type</th>
                                            <th className="py-2 px-2  text-base font-semibold">Questons</th>
                                            <th className="py-2 px-2  text-base font-semibold">Registration Fee</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {displayeSchedule.map((scheduleItem, index) => (
                                            <tr className='border-b-2 border-b-[#ACA5A5]   text-xs md:text-lg' key={index}>
                                                <td className="py-2 text-center">{scheduleItem.title}</td>
                                                <td className="py-2 text-center">{scheduleItem.userId}</td>
                                                <td className="  text-center">{scheduleItem.firstPrice}</td>
                                                <td className=" text-center">{scheduleItem.type}</td>
                                                <td className=" text-center">{scheduleItem.questionId.length}</td>
                                                <td className=" text-center ">{scheduleItem.registrationFee}</td>
                                                
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

export default Adminschedule