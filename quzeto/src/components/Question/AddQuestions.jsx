import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../server';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const AddQuestions = ({ subject, type }) => {

    const userId = useSelector(state => state.user.user._id);
    const navigate = useNavigate()
    const initialValues = {
        question: '',
        answer: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
    };

    const validationSchema = Yup.object({
        question: Yup.string().required('Question is required'),
        answer: Yup.string().required('Answer is required'),
        optionA: Yup.string().required('Option A is required'),
        optionB: Yup.string().required('Option B is required'),
        optionC: Yup.string().required('Option C is required'),
        optionD: Yup.string().required('Option D is required'),
    });


    const handleSubmit = async (values) => {
        try {
            // Restructure options data to match backend schema
            const options = [
                values.optionA,
                values.optionB,
                values.optionC,
                values.optionD,
            ];

            // Create a new data object with the restructured options
            const newData = {
                question: values.question,
                correctAnswer: values.answer,
                options: options,
                type: type,
                subject: subject,
                createdBy: userId,
            };

            // const response= await axios
            // Make a POST request to your backend API
            const response = await axios.post(`${server}question/question`, newData, {
                withCredentials: true,
            });

            // console.log(response.data);
            toast.success('Question Added Successfully!');
            navigate('/dashboard')
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error) {
                toast.error('Question with the same content already exists');
            } else {
                // Handle other errors if needed
                toast.error('An error occurred while adding the question.');
            }
        }
    };

    return (
        <>

            <div className="">

                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >

                        <Form>
                            {/* Content for selected category and type */}
                            <div className="py-3 px-3 ">
                                <h1 className='text-[#00459E] py-1 font-medium'>Question</h1>
                                <Field
                                    type='text'
                                    name='question'
                                    className='text-[.94rem] border rounded-md px-2 w-full bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                    placeholder='Which of the following procedures can be used to compare the means of the included groups in a dummy-variable regression model?'
                                />
                                <ErrorMessage name='question' component='div' className='text-red-500' />
                            </div>
                            <div className="px-3 ">
                                <h1 className='text-[#00459E] py-1 font-medium'>Answer</h1>
                                <Field
                                    type='text'
                                    name='answer'
                                    className='text-[.94rem] border w-full rounded-md px-2 bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                    placeholder='T'
                                />
                                <ErrorMessage name='answer' component='div' className='text-red-500' />
                            </div>

                            <div className="pt-8 px-3 ">
                                <p className='text-white items-center rounded-md px-2 bg-[#00459E] py-1 text-[1rem]'>Options</p>
                            </div>

                            <div className="grid md:grid-cols-2 px-3 pt-7 gap-x-[5rem]">
                                <div className="py-3 ">
                                    <div className="flex gap-1 items-center border border-[#C0C0C0] bg-[#FBFBFB]">
                                        <h1 className='bg-[#EEC907] w-10 h-10 flex items-center justify-center text-white font-medium text-[1.2rem]'>A</h1>
                                        <Field
                                            type='text'
                                            name='optionA'
                                            className='flex-1 py-2 bg-transparent border-none  text-black'
                                            placeholder='Changing the reference group'
                                        />
                                        <ErrorMessage name='optionA' component='div' className='text-red-500' />
                                    </div>
                                </div>
                                <div className="py-3">
                                    <div className="flex gap-1 items-center border border-[#C0C0C0] bg-[#FBFBFB]">
                                        <h1 className='bg-[#42BA96] w-10 h-10 flex items-center justify-center text-white font-medium text-[1.2rem]'>C</h1>
                                        <Field
                                            type='text'
                                            name='optionC'
                                            className='flex-1 py-2 bg-transparent text-black'
                                            placeholder='Standardization'
                                        />
                                        <ErrorMessage name='optionC' component='div' className='text-red-500' />
                                    </div>
                                </div>
                                <div className="py-5">
                                    <div className="flex gap-1 items-center border border-[#C0C0C0] bg-[#FBFBFB]">
                                        <h1 className='bg-[#32CD32] w-10 h-10 flex items-center justify-center text-white font-medium text-[1.2rem]'>B</h1>
                                        <Field
                                            type='text'
                                            name='optionB'
                                            className='flex-1 py-2 bg-transparent text-black'
                                            placeholder='Linear combination'
                                        />
                                        <ErrorMessage name='optionB' component='div' className='text-red-500' />
                                    </div>
                                </div>
                                <div className="py-5">
                                    <div className="flex gap-1 items-center border border-[#C0C0C0] bg-[#FBFBFB]">
                                        <h1 className='bg-[#F18507] w-10 h-10 flex items-center justify-center text-white font-medium text-[1.2rem]'>D</h1>
                                        <Field
                                            type='text'
                                            name='optionD'
                                            className='flex-1 py-2 bg-transparent text-black'
                                            placeholder='Not possible'
                                        />
                                        <ErrorMessage name='optionD' component='div' className='text-red-500' />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 py-8 px-3">
                                <button
                                    type='submit'
                                    className='text-white rounded-full px-2 items-center py-1 bg-[#00459E]'
                                >
                                    Save & Close
                                </button>
                                <button
                                    type='submit'
                                    className='text-white rounded-full px-3 items-center py-2 bg-[#00459E]'
                                >
                                    Save & Add Next
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>



        </>
    )
}

export default AddQuestions