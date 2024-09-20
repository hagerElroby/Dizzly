"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../style.css'
const page = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showpass, setshowpass] = useState<boolean>(false);
  // Error messages
  const [phoneErrMSG, setphoneErrMSG] = useState<string>('');
  const [passErrMSG, setpassErrMSG] = useState<string>('');

  const phoneVal = /^[0-9]*$/;



  /* phone number validation */
  const phoneNumberVal = (value: string, data: number, e: React.ChangeEvent<HTMLInputElement>, formattedValue: string) => {
    if (e.target.value === '') {
      setphoneErrMSG('Phone number is required');
    }
    // else if (!phoneVal.test(e.target.value) || e.target.value.length > 9) {
    //   setphoneErrMSG('Phone number must be 9 numbers');
    // }
     else {
      setphoneErrMSG('');
      setPhoneNumber(e.target.value);
    }
  };



  /* password validation */
  const valPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8 || value.length > 20) {
      setpassErrMSG('Password length must be between 8 and 20 characters');
    } else {
      setpassErrMSG('');
    }
    if (value === '') {
      setpassErrMSG('');
    }
  };


  /* submit validate */
  const submitVal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber) {
      setphoneErrMSG('Phone number is required');
      return;
    }

    if (!password) {
      setpassErrMSG('Password is required');
      return;
    }

    // All validation passed, navigate to the home 
    router.push('/');

  };

  return (
    <div className='my-3 mx-14 max-h-screen'>
      <div className='flex items-center gap-2'>
        <div className='w-10  flex items-center'>
          <img src="/images/Group 47602.png" alt="" className='block w-full' />
        </div>
        <h1 className='text-3xl font-bold'>DIZZLY</h1>
      </div>
      <div className='flex justify-between items-center w-full gap-28 h-[85vh]'>
        <div className='flex-1 flex items-start flex-col mx-4'>
          <h1 className='text-4xl font-semibold text-center text-gray-800 mb-4'>Login</h1>
          <p className='font-normal text-sm leading-6 text-gray opacity-75 mb-7'>Login to access your travelwise  account</p>
          <form onSubmit={submitVal} className='space-y-4 text-gray-900 w-full rounded font-poppins'>
            <div>
              <div>
                <div className='w-full my-4 relative z-10'>
                  <label className="block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-12 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-10">Phone Number</label>
                  <PhoneInput
                    country={'iq'}
                    value={phoneNumber}
                    onChange={phoneNumberVal}
                    buttonClass="bg-white rounded-l-lg px-3 z-20"
                    containerClass="w-full"
                    inputClass="w-full p-8"

                  />
                </div>

                {phoneErrMSG && <p className='text-red-500 text-sm mb-3'>{phoneErrMSG}</p>}
              </div>

              <div>
                <div className='flex items-center justify-center bg-gray-100 relative'>
                  <label className='block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-3 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-[2]'>Password</label>

                  <input
                    type={showpass ? 'text' : 'password'}
                    value={password}
                    onChange={valPass}
                    className='w-full h-12 appearance-none border rounded p-4 text-dark leading-6 font-medium text-sm focus:outline-none focus:shadow-outline peer relative'
                  />
                  <i
                    className={`fa ${showpass ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer`}
                    onClick={() => setshowpass(!showpass)}
                  ></i>
                </div>
                {passErrMSG && <p className='text-red-500 text-sm mb-3 mt-3'>{passErrMSG}</p>}
              </div>
              <div className='my-4 flex items-center justify-between'>
                <div className='flex items-center'>
                  <input type="checkbox" id='remember' className='w-5 h-5' />
                  <label htmlFor="remember" className='text-sm leading-5 font-medium ml-4'>Remember me</label>
                </div>
                <div>
                  <button className='text-success font-medium leading-5 text-sm hover:text-red-700' onClick={() => router.push('/forget-password')}>Forgot Password</button>
                </div>
              </div>

              <button type="submit" className='bg-main text-light p-3 w-full rounded-md font-semibold text-sm leading-5 my-2 h-11'>Login</button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm leading-5">
                Don’t have an account?{' '}
                <button className="font-bold text-success hover:text-red-700 mx-1" onClick={() => router.push('/signup')}>
                  Sign up
                </button>
              </p>
            </div>

          </form>
        </div>
        <div className='flex-1 h-full mx-10'>
          <img src="../images/login.png" alt="" className='block w-full h-full ' />
        </div>
      </div>
    </div>
  );
}
export default page