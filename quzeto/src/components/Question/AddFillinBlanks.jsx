import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../server';
import { useSelector } from 'react-redux';


const AddFillinBlanks = ({ subject, type }) => {
    const userId = useSelector(state => state.user.user._id);
    const initialValues = {
        question: '',
        correctAnswer: '',
    };

    const validationSchema = Yup.object({
        question: Yup.string().required('Question is required'),
        correctAnswer: Yup.string().required('Answer is required'),
    })

    const handleSubmit = async (values) => {
        try {
            // Create a new data object
            const newData = {
                question: values.question,
                correctAnswer: values.correctAnswer,
                type: type,
                subject: subject,
                createdBy: userId,
            };
            console.log(newData)
            // Make a POST request to your backend API
            const response = await axios.post(`${server}question/blanks`, newData, {
                withCredentials: true,
            });
            console.log(response.data);
            toast.success('Fill in the blanks Added Successfully!');
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error) {
                toast.error('Fill in blanks with the same content already exists');
            } else {
                // Handle other errors if needed
                toast.error('An error occurred while adding the question.');
            }
        }
    };


    return (
        <div className="">
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}

                >

                    <Form >
                        <div className="py-3 px-3">
                            <h1 className='text-[#00459E] py-1 font-medium'>Question</h1>
                            <Field
                                type='text'
                                name='question'
                                className='text-[.94rem] border rounded-md px-2 w-full bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                placeholder='Four independent ________ testified to seeing him at the scene of the crime'
                            />
                            <ErrorMessage name='question' component='div' className='text-red-500' />
                        </div>

                        <div className="px-3">
                            <h1 className='text-[#00459E] py-1 font-medium'>Answer</h1>
                            <Field
                                type='text'
                                name='correctAnswer'
                                className='text-[.94rem] border w-full rounded-md px-2 bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                placeholder='T'
                            />
                            <ErrorMessage name='correctAnswer' component='div' className='text-red-500' />
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
    );
};

export default AddFillinBlanks;
