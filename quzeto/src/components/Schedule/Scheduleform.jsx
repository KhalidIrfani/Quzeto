import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../server';
import number from '../../assets/number.png'
import number2 from '../../assets/number2.png'
import number3 from '../../assets/number3.png'
import group from '../../assets/group.png'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

 
const Scheduleform = () => {
    const navigate = useNavigate()
    const userId = useSelector(state => state.user.user);

    const initialValues = {
        title: '',
        type: '',
        category: '',
        registrationFee: '',
        date: '',
        startTime: '',
        endTime: '',
        minParticipants: '',
        duration: '',
        firstPrice: '',
        secondPrice: '',
        thirdPrice: '',
        quantity: 1,

    };

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
        minParticipants: Yup.number()
            .required('Min Participants is required')
            .min(1, 'Min Participants must be greater than 0'),
        duration: Yup.string().required('Duration is required'),
        firstPrice: Yup.number().required('prize is required'),
        secondPrice: Yup.number().required('prize is required'),
        thirdPrice: Yup.number().required('prize is required'),
        quantity: Yup.number()
            .required('No. of questions is required')
            .min(1, 'No. of questions must be greater than 0'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            values.userId = userId;
            await axios.post(`${server}schedule/createSchedule`, values, {
                withCredentials: true,
            });
            toast.success('Quiz schedule created successfully!');
            navigate('/dashboard')
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.error) {
                toast.error('This quiz schedule already exists or there is an issue with the questions.');
            } else {
                toast.error('An error occurred while creating the quiz schedule.');
            }
        }
        setSubmitting(false);
    };


    return (
        <>

            <div className="relative">
                <div className=""> <h1 className='text-[#00459E] px-4 text-[1rem] font-medium'>Schedule new quiz</h1></div>
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
                                        <h1 className='py-2 font-medium'>Min. Participants</h1>
                                        <div className="flex justify-between">
                                            <Field
                                                type='text'
                                                name='minParticipants'
                                                className='text-[.94rem] border rounded-sm px-2 w-[100%] bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                                placeholder='Enter value'

                                            />
                                            <img src={group} alt="" className='md:relative md:right-[2rem] py-2' />
                                        </div>
                                        <ErrorMessage name='minParticipants' component='div' className='text-red-500' />
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

                                </div>


                                <div className="flex gap-1 pt-8 px-2">
                                    <img src={number3} alt="" className='md:w-[2%] w-[6%] h-[6%] md:h-[1%] py-1' />
                                    <h1 className='font-medium'>Questions rules</h1>
                                </div>

                                <div className="grid md:grid-cols-3 md:mr-8">

                                    <div className="px-3">
                                        <h1 className='py-2 font-medium'>First Price</h1>
                                        <Field
                                            type='text'
                                            name="firstPrice"
                                            className='border w-full py-2 px-2 text-[black] bg-[#FBFBFB] border-[#C0C0C0] pr-3 rounded-sm gap-1 items-center'
                                        />

                                        <ErrorMessage name='firstPrice' component='div' className='text-red-500' />
                                    </div>

                                    <div className="px-2">
                                        <h1 className='py-2 font-medium'>Second Price</h1>
                                        <Field
                                            type='text'
                                            name="secondPrice"
                                            className='border w-full py-2  px-2 text-[black]  bg-[#FBFBFB] border-[#C0C0C0] pr-3 rounded-sm gap-1 items-center'
                                        />
                                        <ErrorMessage name='secondPrice' component='div' className='text-red-500' />
                                    </div>

                                    <div className="px-2">
                                        <h1 className='py-2 font-medium'>Third Price</h1>
                                        <Field
                                            type='text'
                                            name="thirdPrice"
                                            className='border w-full py-2  px-2 text-[black]  bg-[#FBFBFB] border-[#C0C0C0] pr-3 rounded-sm gap-1 items-center'
                                        />
                                        <ErrorMessage name='thirdPrice' component='div' className='text-red-500' />
                                    </div>

                                    <div className="px-2">
                                        <h1 className='py-2 font-medium'>No. of questions</h1>
                                        <Field
                                            type="number"
                                            name="quantity"
                                            className='text-[.94rem] border w-full rounded-sm px-2 bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                        />
                                        <ErrorMessage name='quantity' component='div' className='text-red-500' />
                                    </div>

                                </div>

                                <div className="px-3 py-3">
                                    <button type='button' className='text-[#4172BD] font-medium'>Add more +</button>
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



        </>
    )
}
export default Scheduleform