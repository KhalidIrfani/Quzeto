import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import Nav from './Nav'
import pic from '../assets/pic.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { backend_url, server } from '../server';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loaduser } from '../redux/action/user';
import Dasboard from '../Pages/Dasboard';


const validationSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    newPassword: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});


const Profile = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch()
    // State to store user data

    const initialValues = {
        user: user,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        password: user.password,
        confirmPassword: '',
        newPassword: '',
        address: user.address,
        city: user.city,
        state: user.state,
    };

    const handleSubmit = async (values) => {
        console.log(values)
        try {
            // Send updated user data to the server
            const response = await axios.put(`${server}auth/updateUser`, values);
            toast.success("Profile Update Successfully")
        } catch (error) {
            // Handle error
            toast.error(error.response.data.error); // You can show an error message to the user here
        }
    };



    const handleUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);  // Appending the actual file, not file.firstname

        try {
            const response = await axios.put(`${server}auth/profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }).then(() => {
                // window.location.reload()
                dispatch(loaduser());
                toast.success("avatar updated successfully!");
            })
        } catch (error) {
            toast.error(error);
        }
    };;


    return (
        <>
            <Dasboard

                child={
                    <div className=' md:w-[100%] lg:px-28 py-10'>
                        <div className="container bg-[#FFFFFF] rounded-md">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    <div className="grid md:grid-cols-12 grid-cols-1 p-2">

                                        <div className="col-span-4 md:border-r-2">
                                            {/* Content for the first column */}
                                            <div className="py-5">

                                                <div className="text-center py-2 gap-y-3">
                                                    <div className="flex justify-center py-2">
                                                        <img
                                                            src={`${backend_url}${user.avatar}`}
                                                            alt=""
                                                            className="h-[120px] w-[120px] rounded-full"
                                                        />
                                                    </div>
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        name="profilePicture"
                                                        className="hidden"
                                                        onChange={handleUpload}
                                                    />
                                                    <label htmlFor="image" className="bg-[#7393B3] text-[.9rem] text-white px-2 rounded-sm py-1">
                                                        Update your profile
                                                    </label>
                                                </div>


                                                <div className="px-7 grid-cols-1 ">
                                                    <div className="py-2">
                                                        <label className="py-1 font-medium">Password</label>
                                                        <Field
                                                            type="password"
                                                            name="password"
                                                            value={user.password}
                                                            className="py-1 px-2 bg-[#F5F5F5] rounded-md items-center text-[.95rem] w-full"
                                                            placeholder="*****"
                                                        />
                                                        <ErrorMessage name="password" component="div" className="text-red-600" />
                                                    </div>
                                                    <div className="py-2">
                                                        <label className="py-1 font-medium">New Password</label>
                                                        <Field
                                                            type="password"
                                                            name="newPassword"
                                                            className="py-1 px-2 bg-[#F5F5F5] rounded-md items-center text-[.95rem] w-full"
                                                            placeholder="*****"
                                                        />
                                                        <ErrorMessage name="newPassword" component="div" className="text-red-600" />
                                                    </div>
                                                    <div className="py-2">
                                                        <label className="py-1 font-medium">Confirm Password</label>
                                                        <Field
                                                            type="password"
                                                            name="confirmPassword"
                                                            className="py-1 px-2 bg-[#F5F5F5] rounded-md items-center text-[.95rem] w-full"
                                                            placeholder="*****"
                                                        />
                                                        <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="md:col-span-8">

                                            <div className="md:py-10 px-8">
                                                <div className="">
                                                    <h1 className='text-2xl font-bold'>My Profile</h1>
                                                </div>

                                                <div className="grid md:grid-cols-2 grid-cols-1 py-3 gap-4">
                                                    <div className="">
                                                        <label className="py-1 font-medium">First Name</label>
                                                        <Field
                                                            type="text"
                                                            value={user.firstName}
                                                            name="firstName"
                                                            className="py-1 px-3 bg-[#F5F5F5] rounded-md items-center text-[.95rem] w-full"
                                                            placeholder="First Name"
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <label className="py-1 font-medium">Last Name</label>
                                                        <Field
                                                            type="text"
                                                            name="lastName"
                                                            className="py-1 px-3 bg-[#F5F5F5] rounded-md items-center text-[.95rem] w-full"
                                                            placeholder="Last Name"
                                                        />
                                                        <ErrorMessage name="lastName" component="div" className="text-red-600" />
                                                    </div>
                                                </div>


                                                <div className="grid md:grid-cols-2 grid-cols-1 py-3 gap-4">
                                                    <div className="">
                                                        <label className="py-1 font-medium">User Name</label>
                                                        <Field
                                                            type="text"
                                                            name="userName"
                                                            value={user.userName}
                                                            className="py-1 px-3 bg-[#F5F5F5] rounded-md items-center text-[.95rem] w-full"
                                                            placeholder="User Name"
                                                        />
                                                        <ErrorMessage name="userName" component="div" className="text-red-600" />
                                                    </div>
                                                    <div className="">
                                                        <label className="py-1 font-medium">Email Number</label>
                                                        <Field
                                                            type="text"
                                                            name="email"
                                                            value={user.email}
                                                            className="py-1 px-3 bg-[#F5F5F5] rounded-md items-center text-[.95rem] w-full"
                                                            placeholder="Email Number"
                                                        />
                                                        <ErrorMessage name="email" component="div" className="text-red-600" />
                                                    </div>
                                                </div>

                                                <div class="grid md:grid-cols-3 gap-2 ">
                                                    <div class="flex flex-col">
                                                        <label className="py-1 font-medium ">Address</label>
                                                        <Field type="text" name='address' value={user.address} className="py-1 px-3 bg-[#F5F5F5] rounded-md items-center  text-[.95rem]" placeholder="Address" />
                                                    </div>
                                                    <div class="flex flex-col">
                                                        <label className="py-1 font-medium ">City</label>
                                                        <Field type="text" name='city' value={user.city} className="py-1 px-3 bg-[#F5F5F5] rounded-md items-center  text-[.95rem]" placeholder="City" />
                                                    </div>
                                                    <div class="flex flex-col">
                                                        <label className="py-1 font-medium ">State</label>
                                                        <Field type="text" name='state' value={user.state} className="py-1 px-3 bg-[#F5F5F5] rounded-md items-center  text-[.95rem]" placeholder="State" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end px-8 mt-9 py-4"><button type='submit' className='bg-[#1876EF] text-[.8rem] py-1 px-2 rounded-md items-end  text-white'>Update Profile</button>
                                            </div>

                                        </div>

                                    </div>
                                </Form>

                            </Formik >


                        </div>

                    </div>
                }


            />

        </>
    )
}

export default Profile