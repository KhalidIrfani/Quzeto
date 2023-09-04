import React, { useEffect, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io'
import { AiTwotoneEye } from 'react-icons/ai'
import { TfiPencil } from 'react-icons/tfi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom'
import AddQuestions from './AddQuestions';
import AddFillinBlanks from './AddFillinBlanks';
import axios from 'axios';
import { server } from '../../server';
import { useSelector } from 'react-redux';


const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return ` ${month} /${day}/ ${year}`;
};

const QuestionType = () => {
    const user = useSelector(state => state.user.user);
    const [showSelectOptions, setShowSelectOptions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [scheduleData, setScheduleData] = useState([]);
    const id = user._id
    const handleAddQuestionClick = () => {
        setShowSelectOptions(true);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

console.log(id)
    useEffect(() => {

        const fetchScheduleData = async () => {
            try {
                let response;
                if (user.role === 'user') {
                    console.log('Fetching user schedule...');
                    response = await axios.get(`${server}schedule/getSchedules/${id}`);
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


    const handleDeleteSchedule = async (scheduleId) => {
        try {
           
            const response = await axios.delete(`${server}schedule/delete/${scheduleId}`); 
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    return (
        <>
            <div className="py-5 rounded-md  md:mt-[3rem] mt-[1.5rem] w-full bottom-5 bg-white">
                <div className="flex justify-between px-1 items-center ">
                    <div className="">
                        <button className='text-[#00459E] text-xl px-1 md:px-3 font-medium'>Add Question</button>
                    </div>

                    <div className="flex gap-2 items-center">
                        {!showSelectOptions && (
                            <div className="md:px-3">
                                <button
                                    onClick={handleAddQuestionClick}
                                    className='bg-[#32CD32] hover:bg-green-700 rounded-full px-3 py-2 text-white text-[.9rem] font-medium'
                                >
                                    <Link to='/questiontype' className='flex items-center gap-1'>
                                        <IoMdAddCircle className='text-[1.4rem]' /> Add Question
                                    </Link>
                                </button>
                            </div>
                        )}
                        {showSelectOptions && (
                            <div className="flex items-center py-2 gap-2 md:px-3">
                                <div className="gap-1 flex">
                                    <h1>Subject</h1>
                                    <select
                                        name="category"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        className='border text-[#777575] border-[#9C9C9C] pr-3 rounded-sm gap-1 items-center'
                                    >
                                        <option value="">Select category</option>
                                        <option value="Science">Science</option>
                                        <option value="History">Mathematics</option>
                                        <option value="History">SEE</option>
                                        <option value="History">AI</option>
                                    </select>

                                </div>
                                <div className="gap-1 flex">
                                    <h1>Type</h1>
                                    <select
                                        name="type"
                                        value={selectedType}
                                        onChange={handleTypeChange}
                                        className='border text-[#777575] border-[#9C9C9C] pr-3 rounded-sm gap-1 items-center'
                                    >
                                        <option value="">Select Type</option>
                                        <option value="MCQ'S">MCQ'S</option>
                                        <option value="FillInBlanks">Fill in blanks</option>
                                        <option value="True False">True False</option>
                                        <option value="Drag and Drop">Drag and Drop</option>
                                    </select>
                                </div>

                            </div>
                        )}
                    </div>
                </div>


                {selectedCategory && selectedType && (
                    <div className="">
                        {selectedType === "MCQ'S" && <AddQuestions subject={selectedCategory} type={selectedType} />}
                        {selectedType === "FillInBlanks" && <AddFillinBlanks subject={selectedCategory} type={selectedType} />}
                    </div>
                )}

                {!selectedCategory && !selectedType && (

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
                                    {scheduleData.map((scheduleItem, index) => (
                                        <tr className='border-b-2 border-b-[#ACA5A5] text-center items-center text-xs md:text-lg' key={scheduleItem._id}>
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
                )}
            </div>
        </>
    );
}

export default QuestionType;
