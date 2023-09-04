import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../server';
import number from '../../assets/number.png'
import number2 from '../../assets/number2.png'
import number3 from '../../assets/number3.png'
import group from '../../assets/group.png'
import { useNavigate, useParams } from 'react-router-dom';
import Dasboard from '../../Pages/Dasboard';



const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
};

const UpdateSchedule = () => {
    const [schedule, setSchedule] = useState(null);
    const { scheduleId } = useParams()
    const Navigate = useNavigate()
    useEffect(() => {
        // Fetch schedule data using an API call
        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`${server}schedule/${scheduleId}`);
                const { scheduleDetails } = response.data;
                setSchedule(scheduleDetails)
            } catch (error) {
                console.error('Error fetching schedule data:', error);
            }
        };

        fetchSchedule();
    }, [scheduleId]);


    if (!schedule) {
        return <div>Loading...</div>;
    }



    const initialValues = {
        title: schedule.title,
        type: schedule.type,
        category: schedule.category,
        registrationFee: schedule.registrationFee,
        date: schedule.date,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        minParticipants: schedule.minParticipants,
        duration: schedule.duration,
        firstPrice: schedule.firstPrice,
        secondPrice: schedule.secondPrice,
        thirdPrice: schedule.thirdPrice,
        quantity: schedule.quantity,

    };


    const handleSubmit = async (values) => {
        try {
            // Perform the update API call here using values object

            await axios.put(`${server}schedule/update/${scheduleId}`, values);
            console.log('Updated data:', values);
            toast.success('Quiz updated successfully');
            Navigate('/dashboard')
        } catch (error) {
            console.error('Error updating schedule:', error);
            toast.error('Failed to update quiz');
        }
    };
    return (
        <>

            <Dasboard
                child={

                    <div className="px-4  py-4 rounded-md mt-4 bottom-5 bg-white">
                        <div className=""> <h1 className='text-[#00459E] text-[1rem] font-medium'>Update Schedule</h1></div>
                        <div>
                            <Formik
                                enableReinitialize={true}
                                initialValues={initialValues}
                                // validationSchema={validationSchema}
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

                                        <div className="grid md:grid-cols-3 md:mr-8">

                                            <div className="px-3">
                                                <h1 className='py-2 font-medium'>Type</h1>
                                                <Field
                                                    as="select"
                                                    name="type"
                                                    className='border w-full py-2 text-[black] bg-[#FBFBFB] border-[#C0C0C0] pr-3 rounded-sm gap-1 items-center'
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
                                                    className='border w-full py-2 text-[black] bg-[#FBFBFB] border-[#C0C0C0] pr-3 rounded-sm gap-1 items-center'
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
                                                        // type='date'
                                                        name='date'
                                                        // Make sure this format is compatible
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
                                                        // type='date'
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
                                                        // type='date'
                                                        name='endTime'
                                                        className='text-[.94rem] border rounded-sm px-2 w-full bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                                        placeholderText='Select time'
                                                    />
                                                </div>
                                                <ErrorMessage name='endTime' component='div' className='text-red-500' />
                                            </div>

                                            <div className="">
                                                <h1 className='py-2 font-medium'>Min. Participants</h1>
                                                <div className="flex   justify-between">
                                                    <Field
                                                        type='text'
                                                        name='minParticipants'
                                                        className='text-[.94rem] border rounded-sm px-2 w-full bg-[#FBFBFB] border-[#C0C0C0] py-2'
                                                        placeholder='Enter value'

                                                    />
                                                    <img src={group} alt="" className='md:relative  md:right-[2rem] py-2' />
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

                                        <div className="flex justify-end gap-2 py-8">
                                            <button
                                                type='submit'
                                                disabled={isSubmitting}
                                                className='text-white rounded-full px-2 items-center py-1 bg-[#00459E]'
                                            >
                                                update & Save
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

export default UpdateSchedule