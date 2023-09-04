import React, { useEffect, useState } from 'react'
import quiz from '../assets/quiz.png'
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { server } from "../server";
import { toast } from "react-toastify";
import Dasboard from '../Pages/Dasboard';

const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    middleName: yup.string().required('Middle Name is required'),
    lastName: yup.string().required('Last Name is required'),
    userName: yup.string().required('User Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
    newPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    address: yup.string(),
    city: yup.string(),
    state: yup.string(),
    acceptPolicy: yup.boolean().oneOf([true], 'You must accept the policy'),
});

const Admincontrol = () => {
    const [User, setUser] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${server}auth/getSingleuser/${id}`);
                setUser(response.data.user);
            } catch (error) {
                toast.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [id]);

    const initialValues = {
        firstName: User.firstName || '',
        middleName: User.middleName,
        lastName: User.lastName,
        userName: User.userName,
        email: User.email,
        password: '',
        newPassword: '',
        address: User.address,
        city: User.city,
        state: User.state,
    };

    const handleSubmit = async (values) => {
        try {
            // Send updated user data to the server
            const response = await axios.put(`${server}auth/updateUser`, values);
            toast.success("Profile Update Successfully")
            navigate('/dashboard')

        } catch (error) {
            // Handle error
            toast.error(error.response.data.error); // You can show an error message to the user here
        }
    };

    return (
        <>

            <Dasboard
                child={
                    <div className="py-2">
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, values }) => (
                                <Form>
                                    {/* {JSON.stringify(errors)} */}
                                    <div className="container bg-white px-4 py-8 rounded">

                                        <div className=""> <h1 className='text-[#00459E] text-xl py-4 font-medium'>Update User Info</h1></div>

                                        <div className="container">
                                            <div class="grid md:grid-cols-3 md:gap-7 gap-2">
                                                <div class="flex flex-col">
                                                    <label className="py-1 font-medium ">First Name</label>
                                                    <Field type="text"  name='firstName' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center  text-[1.2rem]" placeholder="First Name" />
                                                    <ErrorMessage name="firstName" component="div" className="text-red-600" />
                                                </div>
                                                <div class="flex flex-col">
                                                    <label className="py-1 font-medium ">Middle Name</label>
                                                    <Field type="text" name='middleName'   className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center  text-[1.2rem]" placeholder="Middle Name" />
                                                </div>
                                                <div class="flex flex-col">
                                                    <label className="py-1 font-medium ">Last Name</label>
                                                    <Field type="text" name='lastName'  className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="Last Name" />
                                                    <ErrorMessage name="lastName" component="div" className="text-red-600" />
                                                </div>
                                            </div>
                                            <div class="grid md:grid-cols-2 md:gap-7 gap-2 py-3">
                                                <div class="flex flex-col">
                                                    <label className="py-1 font-medium ">User Name</label>
                                                    <Field type="text" name='userName'   className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center   text-[1.2rem]" placeholder="User Name" />
                                                    <ErrorMessage name="userName" component="div" className="text-red-600" />
                                                </div>
                                                <div class="flex flex-col">
                                                    <label className="py-1 font-medium ">Email Number</label>
                                                    <Field type="text" name='email'  className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="Email Number" />
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
                                                    <Field type="password" name='newPassword' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="Confirm Password" />
                                                    <ErrorMessage name="newPassword" component="div" className="text-red-600" />
                                                </div>
                                            </div>
                                            <div class="grid md:grid-cols-3 md:gap-7 gap-2 py-3">
                                                <div class="flex flex-col">
                                                    <label className="py-1 font-medium ">Address</label>
                                                    <Field type="text" name='address'   className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="Address" />
                                                </div>
                                                <div class="flex flex-col">
                                                    <label className="py-1 font-medium ">City</label>
                                                    <Field type="text" name='city'   className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="City" />
                                                </div>
                                                <div class="flex flex-col">
                                                    <label className="py-1 font-medium ">State</label>
                                                    <Field type="text" name='state' className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="State" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-5 flex justify-end">
                                            <button type="submit" className="py-2 px-3 rounded text-center  bg-[#003881] text-white" disabled={isSubmitting}>Update User Info</button>
                                        </div>

                                    </div>
                                </Form>
                            )}
                        </Formik >
                    </div>
                } />
        </>
    )
}

export default Admincontrol