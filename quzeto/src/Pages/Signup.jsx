import React, { useState } from "react";
import quiz from '../assets/quiz.png'
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { server } from "../server";
import { toast } from "react-toastify";


const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    middleName: yup.string().required('Middle Name is required'),
    lastName: yup.string().required('Last Name is required'),
    userName: yup.string().required('User Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    address: yup.string(),
    city: yup.string(),
    state: yup.string(),
    acceptPolicy: yup.boolean().oneOf([true], 'You must accept the policy'),
});

const Signup = () => {
    const navigate = useNavigate()
    const [backgroundIsWhite, setBackgroundIsWhite] = useState(false); // Add this line to declare the variable


    const initialValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        city: '',
        state: '',
        acceptPolicy: false,
    };

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            // Make a POST request to your backend API to save the form data in MongoDB
            const response = await axios.post(`${server}auth/register`, values);
            toast.success(response.data.message);
            navigate(`/dashboard`);
        } catch (error) {
            // Handle errors if needed
            console.error(error.response.data);
            toast.error(error.response.data.message)

        }
        setSubmitting(false);
    };


    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        {/* {JSON.stringify(errors)} */}
                        <div className="container bg-[#0D4EA3] h-full w-full">
                            <div className="items-center flex justify-center relative top-[2rem]">
                                <Link to='/'><img src={quiz} alt="" className="w-[20rem] text-center items-center " /></Link>
                            </div>

                            <div className="container lg:w-[70%]  w-[90%] md:left-[2.2rem] left-[1.1rem] md:px-0 px-4 lg:left-[15%] relative py-5 hover:text-black hover:rounded-[2rem] hover:px-[2rem] hover:bg-white mt-[3rem]">
                                <div className="font-bold md:text-[1.4rem] text-[2rem] flex justify-center"><h1 className="">Sign up</h1></div>
                                <div class="grid md:grid-cols-3 md:gap-7 gap-2">
                                    <div class="flex flex-col">
                                        <label className="py-1 font-medium ">First Name</label>
                                        <Field type="text" name='firstName' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center  text-[1.2rem]" placeholder="First Name" />
                                        <ErrorMessage name="firstName" component="div" className="text-red-600" />
                                    </div>
                                    <div class="flex flex-col">
                                        <label className="py-1 font-medium ">Middle Name</label>
                                        <Field type="text" name='middleName' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center  text-[1.2rem]" placeholder="Middle Name" />
                                    </div>
                                    <div class="flex flex-col">
                                        <label className="py-1 font-medium ">Last Name</label>
                                        <Field type="text" name='lastName' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="Last Name" />
                                        <ErrorMessage name="lastName" component="div" className="text-red-600" />
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-7 gap-2 py-3">
                                    <div class="flex flex-col">
                                        <label className="py-1 font-medium ">User Name</label>
                                        <Field type="text" name='userName' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center   text-[1.2rem]" placeholder="User Name" />
                                        <ErrorMessage name="userName" component="div" className="text-red-600" />
                                    </div>
                                    <div class="flex flex-col">
                                        <label className="py-1 font-medium ">Email Number</label>
                                        <Field type="text" name='email' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="Email Number" />
                                        <ErrorMessage name="email" component="div" className="text-red-600" />
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-7 gap-2 ">
                                    <div class="flex flex-col">
                                        <label className="py-1 font-medium ">Password</label>
                                        <Field type="password" name='password' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center  text-[1.2rem]" placeholder="Password" />
                                        <ErrorMessage name="password" component="div" className="text-red-600" />
                                    </div>
                                    <div class="flex flex-col">
                                        <label className="py-1 font-medium ">Confirm Password</label>
                                        <Field type="password" name='confirmPassword' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="Confirm Password" />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-3 md:gap-7 gap-2 py-3">
                                    <div class="flex flex-col">
                                        <label className="py-1 font- ">Address</label>
                                        <Field type="text" name='address' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="Address" />
                                    </div>
                                    <div class="flex flex-col">
                                        <label className="py-1 font-medium ">City</label>
                                        <Field type="text" name='city' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="City" />
                                    </div>
                                    <div class="flex flex-col">
                                        <label className="py-1 font-medium ">State</label>
                                        <Field type="text" name='state' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="State" />
                                    </div>
                                </div>
                                <div class="flex items-center py-3">
                                    <Field type="checkbox" name='acceptPolicy' id="acceptPolicy" class="h-4 w-4 md:mb-0 mb-6 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                    <label for="acceptPolicy" class="ml-2 text-[#ACA5A5]">By creating an account you agree to <button className="text-[#003881]">terms of use</button> and our <button className="text-[#003881]">privacy policy</button>.</label>
                                    <ErrorMessage name="acceptPolicy" component="div" className="text-red-600" />
                                </div>

                                <div className="grid grid-col-1 border border-[#ACA5A5] rounded-md">
                                    <button
                                        type="submit"
                                        className={`py-2 px-2 rounded-md text-white ${backgroundIsWhite ? 'bg-[#003881]' : 'bg-[#0D4EA3]'} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                            }`}
                                        disabled={isSubmitting}
                                    >
                                        Create Account
                                    </button>
                                </div>

                                <div className="text-center py-2">
                                    <h1 className="text-[#ACA5A5]">Already have an account? <button className="text-[#003881]"><Link to='/Login'>Log in</Link></button></h1>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik >
        </>
    )
}

export default Signup;