import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import quiz from '../assets/quiz.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../server';

const validationSchema = Yup.object({
    email: Yup.string().required('UserName or email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
})

const Login = () => {
    const initialValues = {
        email: '',
        password: '',
    };
    const navigate = useNavigate();
    const [backgroundIsWhite, setBackgroundIsWhite] = useState(false);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Make a POST request to your backend API to log in
            const response = await axios.post(`${server}auth/login`, values, {
                // withCredentials: true,
            });
            console.log(response.data)
            toast.success('Login Success!');
            navigate('/dashboard');
            window.location.reload();

        } catch (error) {
            // Handle other errors if needed
            toast.error(error.response.data.message);
            console.log(error)
        }
        setSubmitting(false);
    };

    return (
        <>
            <div className="container bg-[#0D4EA3] absolute h-full w-full">
                <div className="items-center flex justify-center  pt-[2rem]">
                    <Link to="/">
                        <img src={quiz} alt="" className="w-[20rem] text-center items-center " />
                    </Link>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (

                        < Form >
                            {/* {JSON.stringify(errors)} */}
                            <div className="container lg:w-[35%] w-[90%] md:left-[2.2rem] left-[1.1rem] lg:left-[32%] relative items-center py-5 hover:text-black hover:rounded-[2rem] hover:px-[2rem] hover:bg-white mt-[3rem]">
                                <div className="font-bold md:text-[1.4rem] text-[2rem] flex justify-center">
                                    <h1 className="">Log in</h1>
                                </div>
                                <div className="grid grid-cols-1  gap-2 ">
                                    <div className="flex flex-col">
                                        <label className="py-1 font-medium">Username or email</label>
                                        <Field type="text" name="email" className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center  text-[1.2rem]" placeholder="Username or email" />
                                        <ErrorMessage name="email" component="div" className="text-red-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="py-1 font-medium">Password</label>
                                        <Field type="password" name="password" className="py-2 px-3 bg-transparent border border-[#ACA5A5]-2 rounded-md items-center text-[1.2rem]" placeholder="Password" />
                                        <ErrorMessage name="password" component="div" className="text-red-500" />
                                    </div>
                                </div>

                                <div className="flex items-center py-3">
                                    <label htmlFor="acceptPolicy" className="ml-2 text-[#ACA5A5]">
                                        Forget Password?{' '}
                                        <button className="text-[#003881]">
                                            <Link to="/reset">Reset your password</Link>
                                        </button>
                                    </label>
                                </div>

                                <div className="grid grid-col-1 border border-[#ACA5A5] rounded-md">
                                    <button
                                        type="submit"
                                        className={`py-2 px-2 rounded-md text-white ${backgroundIsWhite ? 'bg-[#003881]' : 'bg-[#0D4EA3]'} ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                            }`}
                                        disabled={isSubmitting}
                                    >
                                        Login
                                    </button>
                                </div>

                                <div className="text-center py-2">
                                    <h1 className="text-[#ACA5A5]">
                                        Don't have an account?{' '}
                                        <button className="text-[#003881]">
                                            <Link to="/signup">Sign Up</Link>
                                        </button>
                                    </h1>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div >
        </>
    );
};

export default Login;