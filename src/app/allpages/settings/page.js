"use client"

import Footer from "@/app/components/footer/page"
import Navi from "@/app/components/nav/page"
import React, { useState } from 'react';
import { db } from "../../../../config";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { ref, update } from 'firebase/database';

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useUserEmail, useUserID, useUserName, useUserPhone } from "@/app/components/zustand/profile";

const Settings = () => {

    const auth = getAuth();

    const id = useUserID((state) => state.userID)
    const adminName = useUserName((state) => state.userName)
    const adminPhone = useUserPhone((state) => state.userPhone)
    const adminEmail = useUserEmail((state) => state.userEmail)


    //change name
    const [nameModal, setNameModal] = useState('')
    const [isNameModalOpen, setNameModalOpen] = useState(false);
    const openNameModal = () => setNameModalOpen(true);
    const closeNameModal = () => setNameModalOpen(false);

    const updateName = () => {
        try {
            const dbRef = ref(db, `user/accounts/${id}`);

            const newbranchRef = update(dbRef, {

                Name: nameModal,

            });
            const newCreditKey = newbranchRef.key;
            setNameModal('')
        }
        catch {
            setNameModal('')
        }
    }


    //change email
    const [emailModal, setEmailModal] = useState('')
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);
    const openEmailModal = () => setEmailModalOpen(true);
    const closeEmailModal = () => setEmailModalOpen(false);

    const updateEmail = () => {
        try {
            const dbRef = ref(db, `user/accounts/${id}`);

            const newbranchRef = update(dbRef, {

                Email: emailModal,

            });
            const newCreditKey = newbranchRef.key;
            setEmailModal('')
        }
        catch {
            setEmailModal('')
        }
    }


    //change phone
    const [phoneModal, setPhoneModal] = useState('')
    const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
    const openphoneModal = () => {
        setPhoneModalOpen(true);
    };
    const closePhoneModal = () => {
        setPhoneModalOpen(false);
    };

    const updatephone = () => {
        try {
            const dbRef = ref(db, `user/accounts/${id}`);

            const newbranchRef = update(dbRef, {

                phone: phoneModal,

            });
            const newCreditKey = newbranchRef.key;
            setPhoneModal('')
        }
        catch {
            setPhoneModal('')
        }
    }


    /////change password 
    const [forgotemail, setForgetemail] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const handleForgotPassword = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };


    const changepassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            setForgetemail('');

        } catch (error) {
            console.log("error on reset", error);
            setForgetemail('');
        }
    };

    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth)
                .then(() => {
                    router.push('/');
                    useUserID.setState({ userID: "" });
                    useUserName.setState({ userName: "" });
                    useUserEmail.setState({ userEmail: "" });
                    useUserPhone.setState({ userPhone: "" });
                })

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <>
            <Navi />

            <div className="flex items-center justify-center bg-gray-100 py-10">
                <div className="bg-white shadow-lg p-8 max-w-md w-full my-auto" style={{ borderRadius: 20 }}>
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Client Profile</h2>

                    {/* Admin Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Name:</label>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-900">{adminName}</span>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={openNameModal}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    {/* Admin Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Email:</label>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-900">{adminEmail}</span>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={openEmailModal}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    {/* Admin Phone */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Phone:</label>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-900">{adminPhone}</span>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={openphoneModal}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Password:</label>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-900">********</span>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={handleForgotPassword}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>

                    <div className="pt-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button
                            onClick={handleLogout}
                            className="bg-blue-500 px-4 py-2 text-white "
                            style={{ borderRadius: 5, backgroundColor: '#303133' }}>
                            Log Out
                        </button>
                    </div>


                </div>

                {/* name Change Modal */}
                {isNameModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96" style={{ borderRadius: 25 }}>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900" style={{ fontSize: 18 }}>Edit Username</h3>
                            <input
                                type="text"
                                placeholder="Edit your name"
                                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#303133] shadow-md"
                                style={{ borderRadius: 13, color: "#000000" }}
                                value={nameModal}
                                onChange={(e) => setNameModal(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={closeNameModal}
                                    className="bg-red-700 px-4 py-2 hover:bg-red-300"
                                    style={{ borderRadius: 20 }}
                                >
                                    Cancel
                                </button>
                                <button className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600"
                                    style={{ borderRadius: 20, backgroundColor: '#303133' }}
                                    onClick={updateName}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* email Change Modal */}
                {isEmailModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96" style={{ borderRadius: 25 }}>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900" style={{ fontSize: 18 }}>Edit Email</h3>
                            <input
                                type="email"
                                placeholder="Edit your email"
                                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#303133] shadow-md"
                                style={{ borderRadius: 13, color: "#000000" }}
                                value={emailModal}
                                onChange={(e) => setEmailModal(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={closeEmailModal}
                                    className="bg-red-700 px-4 py-2 hover:bg-red-300"
                                    style={{ borderRadius: 20 }}
                                >
                                    Cancel
                                </button>
                                <button className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600"
                                    style={{ borderRadius: 20, backgroundColor: '#303133' }}
                                    onClick={updateEmail}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* phone Change Modal */}
                {isPhoneModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96" style={{ borderRadius: 25 }}>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900" style={{ fontSize: 18 }}>Edit Phone Number</h3>
                            <input
                                type="numeric"
                                placeholder="Edit your phone number"
                                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#303133] shadow-md"
                                style={{ borderRadius: 13, color: "#000000" }}
                                value={phoneModal}
                                onChange={(e) => setPhoneModal(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={closePhoneModal}
                                    className="bg-red-700 px-4 py-2 hover:bg-red-300"
                                    style={{ borderRadius: 20 }}
                                >
                                    Cancel
                                </button>
                                <button className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600"
                                    style={{ borderRadius: 20, backgroundColor: '#303133' }}
                                    onClick={updatephone}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* change password */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96" style={{ borderRadius: 25 }}>
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Reset Password</h2>
                            <p className="mb-4 text-gray-700">Enter your email to receive a password reset link:</p>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#303133]"
                                style={{ borderRadius: 13, color: "#000000" }}
                                value={forgotemail}
                                onChange={(e) => setForgetemail(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={closeModal}
                                    className="bg-red-700 px-4 py-2 hover:bg-red-300"
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
            <Footer />
        </>
    )
}


export default Settings