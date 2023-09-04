import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { server } from '../server';
import Dasboard from '../Pages/Dasboard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const PlayQuiz = () => {
    const user = useSelector(state => state.user.user);
    const [resultData, setResultData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        const fetchResultData = async () => {
            try {
                let response;
                if (user.role === 'user') {
                    // Fetch schedule data for the logged-in user
                    response = await axios.get(`${server}result/result/${user._id}`);
                } else if (user.role === 'admin') {
                    // Fetch all schedule data for admin
                    response = await axios.get(`${server}result/getResults`);
                }
                console.log(response.data)
                setResultData(response.data);
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };

        fetchResultData();
    }, [user]);

    const totalPages = Math.ceil(resultData.length / itemsPerPage);

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
    const endIndex = Math.min(startIndex + itemsPerPage, resultData.length);
    const displayedResults = resultData.slice(startIndex, endIndex);


    return (
        <>


            <Dasboard
                child={(
                    <div className="py-4 rounded-md mt-4 bottom-5 bg-white">
                        <div className=""> <h1 className='text-[#00459E] px-4 text-[1rem] font-medium'>Played Quiz</h1></div>

                        <div className="overflow-x-scroll">
                            <div className="w-full py-5">
                                <table class="table-auto w-full ">
                                    <thead>
                                        <tr className='bg-[#E4E4E4]  text-[#777575]'>
                                            <th className="py-2 px-2 font-semibold">Quiz Name</th>
                                            <th className="py-2 px-2 font-semibold">Quiz Creator Earning</th>
                                            <th className="py-2 px-2 font-semibold">Quiz Type</th>
                                            <th className="py-2 px-2 font-semibold">Registration Fee</th>
                                            <th className="py-2 px-2 font-semibold">Correct Answer</th>
                                            <th className="py-2 px-2 font-semibold">Score</th>
                                            <th className="py-2 px-2 font-semibold">Total Questions</th>
                                            <th className="py-2 px-2 font-semibold">Attempte Questions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayedResults.map((resultItem, index) => (

                                            <tr className='border-b-2 border-b-[#ACA5A5] text-center items-center' key={index}>
                                                <td class="py-2">{resultItem.quizId?.title}</td>
                                                <td class="py-2">{resultItem.quizId?.firstPrice}</td>
                                                <td class="py-2">{resultItem.quizId?.type}</td>
                                                <td class="py-2">{resultItem.quizId?.registrationFee}</td>
                                                <td class="py-2">{resultItem.correctAnswer}</td>
                                                <td class="py-2">{resultItem.score}</td>
                                                <td class="py-2">{resultItem.totalQuestions}</td>
                                                <td class="py-2">{resultItem.attemptedQuestion}</td>

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
                )}
            />
        </>
    )
}

export default PlayQuiz

