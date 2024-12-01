"use client"

import React, { useState } from 'react';
import { db, } from "../../../../../config";
import { ref, push } from 'firebase/database';
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from 'firebase/auth';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md"
import { GiPadlock } from "react-icons/gi";
import { GiDialPadlock } from "react-icons/gi";
import { FaPhoneAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useUserEmail, useUserID, useUserName, useUserPhone } from '@/app/components/zustand/profile';

const Register = () => {

  //firebase 
  //auth

  const auth = getAuth();
  const user = auth.currentUser;

  const router = useRouter();

  //admin
  const [adminName, setAdminName] = useState('')
  const [adminPhone, setAdminPhone] = useState('')
  const [adminEmail, setAdminEmail] = useState('')


  const [adminPassword, setAdminPassword] = useState('')
  const [confirmpass, setConfirmpass] = useState('')



  const registerUser = async () => {

    console.log("jina", adminName)
    if (adminPassword.length < 6) {

      console.log("passpassword for 6", adminName)

    } else {
      if (adminPassword === confirmpass) {

        console.log("password is same ", adminName)
        if (!adminName || !adminPhone || !adminEmail || !adminPassword) {

        } else {
          try {
            // Create the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
            console.log("create ime tii")
            try {    // Send email verification
              await sendEmailVerification(user, {
                handleCodeInApp: true,
                url: "https://indicies-1b2ca.firebaseapp.com",
              });
              console.log("send verification imetii ")

            }
            catch {

              console.log("haiku work ")
            }

            // Save user details to the database
            const dbRef = ref(db, `user/accounts/`);
            const newAdminRef = await push(dbRef, {

              Name: adminName,
              Phone: adminPhone,
              Email: adminEmail,

            })

            useUserID.setState({ userID: newAdminKey })
            useUserPhone.setState({ userRole: adminPhone })
            useUserName.setState({ userName: adminName })
            useUserEmail.setState({ userEmail: adminEmail })

              .then(() => {
                router.push('/');
              })
            const newAdminKey = newAdminRef.key;

            // Reset form fields
            setAdminName('');
            setAdminEmail('');
            setAdminPassword('');
            setAdminPhone('');
            setConfirmpass('')


          } catch (error) {
            setAdminName('');
            setAdminEmail('');
            setAdminPassword('');
            setAdminPhone('');
            setConfirmpass('')

            console.log("Error during registration:", error.message);
          }
        }
      } else {
        setAdminName('');
        setAdminEmail('');
        setAdminPassword('');
        setAdminPhone('');
        setConfirmpass('')


      }
    }
  };

  return (

    <>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full" style={{ borderRadius: 20 }}>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/btc.png" alt="Logo" className="h-12 shadow-md" style={{ borderRadius: 15 }} />
          </div>


          {/* App Title */}
          <div className="flex justify-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Benchmark Indices</h1>
          </div>

          <h2 className="text-1xl font-semibold mb-6 text-gray-900 px-2">Create an Account </h2>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-2 focus:ring-[#303133]  pl-12 shadow-md"
                style={{ borderRadius: 13, color: "#000000" }}
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-2 focus:ring-[#303133]  pl-12 shadow-md"
                style={{ borderRadius: 13, color: "#000000" }}
                value={adminPhone}
                onChange={(e) => setAdminPhone(e.target.value)}
              />
              <FaPhoneAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-2 focus:ring-[#303133]  pl-12 shadow-md"
                style={{ borderRadius: 13, color: "#000000" }}
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-2 focus:ring-[#303133]  pl-12 shadow-md"
                style={{ borderRadius: 13, color: "#000000" }}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <GiPadlock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-2 focus:ring-[#303133]  pl-12 shadow-md"
                style={{ borderRadius: 13, color: "#000000" }}
                value={confirmpass}
                onChange={(e) => setConfirmpass(e.target.value)}
              />
              <GiDialPadlock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-xl" />
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={registerUser}
                className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3  mt-4 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-[#303133] shadow-md"
                style={{ borderRadius: 13, backgroundColor: '#303133' }}
              >
                Register
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600 mb-4">Already have an account ? <a href="/" className="text-blue-500 hover:underline">Log In</a></p>
          </div>
        </div>
      </div>

    </>
  )
}


export default Register 