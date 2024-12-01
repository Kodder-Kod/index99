"use client"

import React, { useState } from 'react';
import { db, auth } from "../../../../../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { ref, get } from 'firebase/database';
import { MdEmail } from "react-icons/md"
import { GiPadlock } from "react-icons/gi";
import { useUserEmail, useUserID, useUserName, useUserPhone } from '@/app/components/zustand/profile';




const LogIn = () => {


    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isModalOpen, setModalOpen] = useState(false);

    const [forgotemail, setForgetemail] = useState(false);

    const auth = getAuth();


    const handleForgotPassword = () => {
        setModalOpen(true); // Show modal when the link is clicked
    };

    const closeModal = () => {
        setModalOpen(false); // Hide modal
    };


    const LoginUser = async () => {

        if (!name || !password) {

        } else {

            try {
                const userCredential = await signInWithEmailAndPassword(auth, name, password);
                const user = userCredential.user;

                setName('')
                setPassword('')

                const Role = await fetchRole(name)

            }
            catch (error) {
                console.log(error.message)

                setName('')
                setPassword('')

            }

        }
    }

    const changepassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            setForgetemail('');



        } catch (error) {
            console.log("error on reset", error);
            setForgetemail('');


        }
    };


    const fetchRole = async (email) => {

        const snapshot = await get(ref(db, `user/accounts/`));
        const data = snapshot.val();

        if (data) {

            let name = null;
            let emailUser = null;
            let id = null;
            let phone = null;


            Object.entries(data).forEach(([key, value]) => {
                if (value.Email === email) {

                    name = value.Name;
                    emailUser = value.Email;
                    phone = value.Phone;
                    id = key

                    console.log(id, "id.....id1")

                    return;
                }
            }
            );

            useUserID.setState({ userID: id });
            useUserName.setState({ userName: name });
            useUserEmail.setState({ userEmail: emailUser });
            useUserPhone.setState({ userPhone: phone });
        }
    }

    return (


        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg p-8 max-w-md w-full" style={{ borderRadius: 20 }}>

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/btc.png" alt="Logo" className="h-12 shadow-md" style={{ borderRadius: 15 }} />
                </div>

                {/* App Title */}
                <div className="flex justify-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Benchmark Indices</h1>
                </div>

                <h2 className="text-1xl font-semibold mb-6 text-gray-800 px-2">Log In</h2>

                <div className="space-y-4">
                    {/* Email Input */}
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#303133] pl-12 shadow-md"
                            style={{ borderRadius: 13, color: "#000000" }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
                    </div>


                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#303133] pl-12 shadow-md"
                            style={{ borderRadius: 13, color: "#000000" }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <GiPadlock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />

                    </div>

                    {/* Log In Button */}
                    <div className="flex justify-center items-center">
                        <button
                            onClick={LoginUser}
                            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-[#303133]"
                            style={{ borderRadius: 13, backgroundColor: '#303133' }}
                        >
                            Log In
                        </button>
                    </div>
                </div>

                {/* Links */}


                <div className="flex justify-between items-center mt-6">
                    <p className="text-sm text-gray-600 mb-4">Join us today. <a href="/allpages/user/register" className="text-blue-500 hover:underline">Create your account</a></p>
                    <button onClick={handleForgotPassword} className="text-blue-500 hover:underline text-sm ml-auto mt-6">
                        Forgot Password?
                    </button>  </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96" style={{ borderRadius: 25 }}>
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Reset Password</h2>
                        <p className="mb-4 text-gray-700">Enter your email to receive a password reset link:</p>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#303133]"
                            value={forgotemail}
                            style={{ borderRadius: 13, color: "#000000" }}
                            onChange={(e) => setForgetemail(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="bg-red-700 px-4 py-2 rounded hover:bg-red-400"
                                style={{ borderRadius: 20 }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={changepassword}
                                className="bg-blue-500 px-4 py-2 text-white "
                                style={{ borderRadius: 20, backgroundColor: '#303133' }}>
                                Send Reset Link
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}


export default LogIn 