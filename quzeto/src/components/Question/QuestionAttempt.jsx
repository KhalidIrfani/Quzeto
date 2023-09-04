import React, { useEffect, useState } from 'react';
import prize from '../../assets/prize.png';
import participant from '../../assets/participant.png';
import { server } from '../../server';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'; // Import useSelector

const QuestionAttempt = () => {
    const { user } = useSelector((state) => state.user);
    const [selected, setSelected] = useState(0);
    const Navigate = useNavigate()
    const { scheduleId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    // const [countdown, setCountdown] = useState(60);
    const [loading, setLoading] = useState(false);

    // Fetch quiz data based on selected quiz ID
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${server}schedule/${scheduleId}`);
                const { scheduleDetails } = response.data;
                setQuizData(scheduleDetails);
                setQuestions(scheduleDetails.questions)
                setLoading(false);
            } catch (error) {
                toast.error(error.message);
                console.log(error)
            }
        };

        fetchSchedule();
    }, [scheduleId]);




    //countdown function
    // useEffect(() => {
    //     const countdownInterval = setInterval(() => {
    //         setCountdown((prevCountdown) => prevCountdown - 1);
    //     }, 1000);
    //     if (countdown === 0) {
    //         clearInterval(countdownInterval);
    //         handleQuizEnd();
    //     }
    //     return () => {
    //         clearInterval(countdownInterval);
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [countdown]);

    const handleNextQuestion = async () => {
        if (selectedOption !== null) {
            const currentQuestion = questions[currentQuestionIndex];
            const isCorrect = currentQuestion.correctAnswer === selectedOption;


            // Update the selected answer and correctness for the current question
            const updatedQuestions = [...questions];
            updatedQuestions[currentQuestionIndex] = {
                ...currentQuestion,
                selectedAnswer: selectedOption,
                isCorrect: isCorrect,
            };

            if (isCorrect) {
                setScore(score + 1)
            }

            // Update the questions array
            setQuestions(updatedQuestions);

            // Move to the next question or end the quiz
            if (currentQuestionIndex + 1 < questions.length) {
                setSelected(0); // Reset the selected option
                setSelectedOption(null);
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                // No more questions, quiz ended
                await handleQuizEnd();
            }
        }
    };



    // store record of quiz
    const handleQuizEnd = async () => {

        const totalQuestions = questions.length;
        const totalWrongAnswers = totalQuestions - score;
        const gameResultData = {
            userId: user._id, // Replace with the actual user ID
            quizId: scheduleId,
            questions: questions.map((question, index) => {
                if (index === currentQuestionIndex) {
                    return {
                        ...question, // Providethe question statement
                        selectedAnswer: selectedOption,
                        isCorrect: question.correctAnswer === selectedOption,
                    };

                } else {
                    return {
                        question: question.question, // Provide the question statement
                        selectedAnswer: question.selectedAnswer,
                        isCorrect: question.isCorrect,

                    };
                }
            }),

            score: score,
            correctAnswer: score,
            totalQuestions: totalQuestions,
            totalWrongAnswers: totalWrongAnswers,
        }

        try {
            // Send the game result to the server
            const response = await axios.post(`${server}result/submitAnswer`, gameResultData);
            const id = response.data._id; // Access the generated ID from the response
            console.log(id)
            toast.success('Quiz Ended');

            // Use template literal correctly for URL
            Navigate(`/dashboard/result/${id}`);
        } catch (error) {
            toast.error(error.message);
            // Handle the error
        }
    };


    // if (loading === true) {
    //     return <div className='text-4xl text-center text-blue-500 flex justify-center items-center'>Loading.....</div>;
    // }

    // if (!quizData) {
    //     return <div className='text-4xl text-center text-red-500 flex justify-center items-center'>Quiz data not available.</div>;
    // }

    // if (questions.length === 0) {
    //     return <div className='text-4xl text-center text-red-500 flex justify-center items-center'>No questions available.</div>;
    // }

    const currentQuestion = questions[currentQuestionIndex];

    const optionColors = ['#EEC907', '#42BA96', '#32CD32', '#F18507'];


    return (
        <>
            <div className="contanier px-4  py-6 rounded-md mt-[2rem] bg-white">
                {quizData && (
                    <div className="bg-[#00459E] py-4 rounded-md">
                        <div className="flex justify-between items-center px-2">
                            <div className="">
                                <p className='text-white text-xl'>{quizData.title}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className='flex gap-2  bg-white rounded-full md:px-3 px-1  py-1 items-center'>
                                    <img src={prize} alt="" className='md:w-[17%] w-[14%]' />
                                    <p className='text-sm md:text-base'>Prize: 500 INR</p>
                                </div>

                                <div className='flex gap-2 bg-white rounded-full md:px-3 px-1 py-1 items-center'>
                                    <img src={participant} alt="" className='md:w-[17%] w-[14%]' />
                                    <p className='text-sm md:text-base'>Participants: {quizData.totalParticipants}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {questions.length > 0 && currentQuestionIndex < questions.length && (
                    <div>
                        <div className="rounded-md md:mt-[7rem] mt-[5rem] md:mx-[5rem] my-5 bg-[#F1FFFE] border py-6 border-[#77BEC8]">
                            <div className="rounded-full bg-white relative top-[-3rem] lg:left-[22rem] left-[9rem] md:left-[16rem] text-center h-11 w-11 flex border border-[#AF4242]">
                                <h1 className='py-2 px-[.77rem]'>10</h1>
                            </div>
                            <p className='text-center font-medium px-2 text-[1.2rem]'>{questions[currentQuestionIndex].question}</p>
                        </div>

                        {/* <div className="">
                            <p className='text-center py-5 text-[#989898] font-normal text-[1.2rem]'>Select the Options</p>
                        </div> */}

                        <div className="grid md:grid-cols-2 lg:px-[7rem] px-[1rem] md:px-[2.5rem] gap-5 lg:gap-x-[5rem]">
                            {questions[currentQuestionIndex].questionType === "mcqMCQ'S" ? (
                                <div>
                                    <div className="">
                                        <p className='text-center py-5 text-[#989898] font-normal text-[1.2rem]'>Select the Options</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:px-[7rem] px-[1rem] md:px-[2.5rem] gap-5 lg:gap-x-[5rem]">
                                        {questions[currentQuestionIndex].options.map((option, index) => (
                                            <div className="py-3" key={index}>
                                                <button
                                                    className={`flex gap-1 items-center border w-full border-[#C0C0C0] ${selectedOption === option ? `bg-gray-200` : 'bg-[#FBFBFB]'}`}
                                                    onClick={() => setSelectedOption(option)}
                                                >
                                                    <h1 className='bg-white px-3 text-center py-1 text-black font-medium text-lg'
                                                        style={{ backgroundColor: optionColors[index % optionColors.length] }}
                                                    >
                                                        {String.fromCharCode(65 + index)}
                                                    </h1>
                                                    <p className='text-black px-2'>{option}</p>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                // Render the input field for fill-in-the-blank questions
                                <div className="py-5 col-span-2">
                                    <input
                                        type="text"
                                        
                                        value={selectedOption}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        className="border rounded bg-[#F9F9F9]  border-[#B9B7B7] p-2 w-full"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-[4rem] flex justify-between">
                            <button className="bg-[#B92F1D] rounded-full px-3 items-center py-1 text-center text-white">Leave Quiz</button>
                            <button onClick={() => handleNextQuestion('')} className="bg-[#1DB95B] rounded-full px-6 items-center py-1 text-center text-white">Next</button>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default QuestionAttempt