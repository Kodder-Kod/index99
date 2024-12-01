"use client"

import React, { useState } from 'react';
import { db, } from "../../../../config";
import { ref, push } from 'firebase/database';

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md"

const Contact = () => {

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')


    const sendMessage = async () => {

        const dbRef = ref(db, `user/message/`);
        const newAdminRef = await push(dbRef, {

            Name: name,
            Message: message,
            Email: email,

        });
        const newAdminKey = newAdminRef.key;

        setName('');
        setEmail('');
        setMessage('');
    }

    return (

        <>
    
        <div className="bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto px-6 flex flex-wrap md:flex-nowrap gap-12"
            >
                {/* Contact Form */}
                <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-1/2" style={{ borderRadius: 20 }}>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2>
                    <form className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#303133] shadow-md  pl-12"
                                style={{ borderRadius: 13, color: "#000000" }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#303133] shadow-md  pl-12"
                                style={{ borderRadius: 13, color: "#000000" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
                        </div>
                        <textarea
                            placeholder="Your Message"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#303133] shadow-md"
                            rows="4"
                            style={{ borderRadius: 13, color: "#000000" }}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <button
                            onClick={sendMessage}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition focus:ring-[#303133]"
                            style={{ borderRadius: 13, backgroundColor: '#303133' }}>
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Location Details */}
                <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-1/2" style={{ borderRadius: 20 }}>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Location</h2>
                    <p className="text-gray-600 mb-4">
                        Visit us at our headquarters or reach out for more details.
                    </p>
                    <p className="text-gray-800 font-bold mb-2">Address:</p>
                    <p className="text-gray-600 mb-4">1234 Street Name, City, State, 56789</p>
                    <p className="text-gray-800 font-bold mb-2">Phone:</p>
                    <p className="text-gray-600 mb-4">(123) 456-7890</p>
                    <p className="text-gray-800 font-bold mb-2">Email:</p>
                    <p className="text-gray-600">contact@yourcompany.com</p>
                </div>
            </div>
        </div>
        </>

    )
}


export default Contact