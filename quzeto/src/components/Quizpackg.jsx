import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import number from '../assets/number.png'
import number2 from '../assets/number2.png'
import group from '../assets/group.png'
import Dasboard from '../Pages/Dasboard';
import { server } from '../server';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    type: Yup.string().required('Question Type is required').oneOf(["MCQ'S", 'FillInBlanks'], 'Invalid Question Type'),
    category: Yup.string().required('Category is required'),
    registrationFee: Yup.number()
        .required('Registration Fee is required')
        .min(0, 'Registration Fee must be greater than or equal to 0'),
    date: Yup.string().required('Date is required'),
    startTime: Yup.string().required('Start time is required'),
    endTime: Yup.string().required('End time is required'),
    duration: Yup.string().required('Duration is required'),
    quantity: Yup.number()
        .required('No. of questions is required')
        .min(1, 'No. of questions must be greater than 0'),
});


const Quizpackg = () => {
    const userId = useSelector(state => state.user.user);
    const initialValues = {
        title: '',
        type: '',
        category: '',
        registrationFee: '',
        date: '',
        startTime: '',
        endTime: '',
        duration: '',
        quantity: ''
    }

    const handleSubmit = async (values) => {
        console.log(values)
        try {
            values.userId = userId;
            // Assuming `${server}` is the correct base URL
            const response = await axios.post(`${server}quizpkg/quizpackages`, values);
            console.log(response.data);
            toast.success("Quiz package created successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error creating quiz package");
        }
    };



    return (
        <>

            <Dasboard
                child={
                    <div className="bg-white rounded py-4 mt-4">
                        <div className=""> <h1 className='text-[#00459E] px-4 text-[1rem] font-medium'>Create new Package</h1></div>
                        <div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (

                                    <Form>
                                        {/* Content for selected category and type */}
                                        <div className="flex gap-1 pt-8 px-2">
                                            <img src={number} alt="" className='md:w-[2%] w-[6%] h-[6%] md:h-[1%] py-1' />
                                            <h1 className='font-medium'>Basic Details</h1>
                                        </div>

                                        <div className="py-3 px-3">
                                            <h1 className='py-1 font-medium'>Title</h1>
                                            <Field
                                                type='text'
                                                name='title'
                                                className='text-[.94rem] border rounded-md px-2 w-full bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                                placeholder='Enter quiz title here'
                                            />
                                            <ErrorMessage name='title' component='div' className='text-red-500' />
                                        </div>

                                        <div className="grid md:grid-cols-3  md:mr-8">

                                            <div className="px-3">
                                                <h1 className='py-2 font-medium'>Type</h1>
                                                <Field
                                                    as="select"
                                                    name="type"
                                                    className='border w-full py-2 text-[#C1C1C1] bg-[#FBFBFB] border-[#C0C0C0] pr-3 rounded-sm gap-1 items-center'
                                                >
                                                    <option value="">Select option</option>
                                                    <option value="MCQ'S">MCQ'S</option>
                                                    <option value="FillInBlanks">Fill in Blanks</option>
                                                </Field>
                                                <ErrorMessage name='type' component='div' className='text-red-500' />
                                            </div>

                                            <div className="px-2">
                                                <h1 className='py-2 font-medium'>Category</h1>
                                                <Field
                                                    as="select"
                                                    name="category"
                                                    className='border w-full py-2 text-[#C1C1C1] bg-[#FBFBFB] border-[#C0C0C0] pr-3 rounded-sm gap-1 items-center'
                                                >
                                                    <option value="">Select option</option>
                                                    <option value="Science">Science</option>
                                                    <option value="History">History</option>
                                                </Field>
                                                <ErrorMessage name='category' component='div' className='text-red-500' />
                                            </div>

                                            <div className="px-2">
                                                <h1 className='py-2 font-medium'>Registration Fee</h1>
                                                <Field
                                                    type='text'
                                                    name='registrationFee'
                                                    className='text-[.94rem] border rounded-sm px-2 w-full bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                                    placeholder='Enter registration fee'
                                                />
                                                <ErrorMessage name='registrationFee' component='div' className='text-red-500' />
                                            </div>
                                        </div>


                                        <div className="flex gap-1 pt-8 px-2">
                                            <img src={number2} alt="" className='md:w-[2%] w-[6%] h-[6%] md:h-[1%] py-1' />
                                            <h1 className='font-medium'>Timing and Audience</h1>
                                        </div>


                                        <div className="grid md:grid-cols-3 px-4 gap-x-4">

                                            <div className="">
                                                <h1 className='py-2 font-medium'>Date</h1>
                                                <div className="flex">
                                                    <Field
                                                        type='date'
                                                        name='date'
                                                        placeholder='Select date'
                                                        className='px-2 w-full border bg-[#FBFBFB] border-[#C0C0C0] py-2 rounded-sm'
                                                    />
                                                </div>
                                                <ErrorMessage name='date' component='div' className='text-red-500' />
                                            </div>

                                            <div className="">
                                                <h1 className='py-2 font-medium'>Start time</h1>
                                                <div className="flex">
                                                    < Field
                                                        type='date'
                                                        name='startTime'
                                                        className='text-[.94rem] border rounded-sm px-2 w-full bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                                        placeholderText='Select time'
                                                    />
                                                </div>
                                                <ErrorMessage name='startTime' component='div' className='text-red-500' />
                                            </div>

                                            <div className="">
                                                <h1 className='py-2 font-medium'>End time</h1>
                                                <div className="flex">
                                                    <Field
                                                        type='date'
                                                        name='endTime'
                                                        className='text-[.94rem] border rounded-sm px-2 w-full bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                                        placeholderText='Select time'
                                                    />
                                                </div>
                                                <ErrorMessage name='endTime' component='div' className='text-red-500' />
                                            </div>

                                            <div className="">
                                                <h1 className='py-2 font-medium'>Duration</h1>
                                                <div className="flex relative w-full justify-between">
                                                    <Field
                                                        type='time'
                                                        name='duration'
                                                        className='text-[.94rem] border rounded-sm px-2 w-full bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                                        placeholder='Set duration'

                                                    />
                                                    {/* <img src={clock2} alt="" className='relative right-[2rem] py-2' /> */}
                                                </div>
                                                <ErrorMessage name='duration' component='div' className='text-red-500' />
                                            </div>

                                            <div className="">
                                                <h1 className='py-2 font-medium'>No. of questions</h1>
                                                <Field
                                                    type="number"
                                                    name="quantity"
                                                    className='text-[.94rem] border w-full rounded-sm px-2 bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                                />
                                                <ErrorMessage name='quantity' component='div' className='text-red-500' />
                                            </div>

                                        </div>
                                        <div className="flex justify-end gap-2 px-4 py-8">
                                            <button
                                                type='submit'
                                                disabled={isSubmitting}
                                                className='text-white rounded-full px-2 items-center py-1 bg-[#00459E]'
                                            >
                                                Save & Close
                                            </button>
                                            <button
                                                type='submit'
                                                disabled={isSubmitting}
                                                className='text-white rounded-full px-3 items-center py-2 bg-[#00459E]'
                                            >
                                                Save & Add Next
                                            </button>
                                        </div>

                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                }

            />
        </>
    )
}

export default Quizpackg