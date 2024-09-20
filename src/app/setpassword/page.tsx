"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../style.css'
const page = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [showpass, setshowpass] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  // Error messages

  const [passErrMSG, setpassErrMSG] = useState<string>('');
  const [confirmPassErrMSG, setconfirmPassErrMSG] = useState<string>('');


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

    /* confirm password validation */
  const confirmPassVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setconfirmPassErrMSG('Passwords do not match');
    } else {
      setconfirmPassErrMSG('');
    }
  };

  /* submit validate */
  const submitVal = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!password || !confirmPassword) {
      setpassErrMSG('Password is required');
      return;
    } else if (password !== confirmPassword) {
      setconfirmPassErrMSG('Passwords do not match');
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
        <div className='flex-1 flex items-start flex-col mx-4 '>
          <h1 className='text-3xl font-semibold text-center text-gray-800 mb-4'>Set a password</h1>
          <p className='font-normal text-sm leading-6 text-gray opacity-75 mb-7'>Your previous password has been reseted. Please set a new password for your account.</p>
          <form onSubmit={submitVal} className='space-y-4 text-gray-900 w-full rounded font-poppins'>
            <div>
              <div>
                <div className='flex items-center justify-center bg-gray-100 relative mb-8'>
                  <label className='block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-3 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-[2]'>Create Password</label>

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
              <div>
                <div className='flex items-center justify-center bg-gray-100 relative mb-5'>
                  <label className='block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-3 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-[2]'>Re-enter Password</label>

                  <input
                    type={showpass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={confirmPassVal}
                    className='w-full h-12 appearance-none border rounded p-4 text-dark leading-6 font-medium text-sm focus:outline-none focus:shadow-outline peer relative'
                  />
                  <i
                    className={`fa ${showpass ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer`}
                    onClick={() => setshowpass(!showpass)}
                  ></i>
                </div>
                {confirmPassErrMSG && <p className='text-red-500 text-sm mb-3 mt-3'>{confirmPassErrMSG}</p>}
              </div>

              <button type="submit" className='bg-main text-light p-3 w-full rounded-md font-semibold text-sm leading-5 my-3 h-12'>Set password</button>
            </div>

          </form>
        </div>
        <div className='flex-1 h-full mx-10'>
          <img src="../images/setpass.png" alt="" className='block w-full h-full ' />
        </div>
      </div>
    </div>
  );
}
export default page