"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../style.css'
const page = () => {
  const router = useRouter();
  const [code, setCode] = useState<string>('');
  const [showpass, setshowpass] = useState<boolean>(false);
  const [errCodeMSG, setErrCodeMSG] = useState<string>('');

  /* submit validate */
  const submitVal = async (e: React.FormEvent) => {
    e.preventDefault();
    // All validation passed, navigate to the home 
    router.push('/setpassword');

  };

  return (
    <div className='my-4 mx-14 max-h-screen'>
      <div className='flex items-center gap-2'>
        <div className='w-10  flex items-center'>
          <img src="/images/Group 47602.png" alt="" className='block w-full' />
        </div>
        <h1 className='text-4xl font-bold'>DIZZLY</h1>
      </div>
      <div className='flex justify-between items-center w-full gap-28 h-[85vh]'>
        <div className='flex-1 flex items-start flex-col mx-4'>
          <p className='mb-4'>
            <i className='fa fa-chevron-left'></i>
            <button className='ml-2 font-medium text-sm' onClick={() => router.push('/login')}>Back to login</button>
          </p>  
          <h1 className='text-3xl font-semibold text-center text-gray-800 mb-3'>Verify code</h1>
          <p className='font-normal text-sm leading-6 text-gray opacity-75 mb-7'>An authentication code has been sent to your email.</p>
          <form onSubmit={submitVal} className='space-y-4 text-gray-900 w-full rounded font-poppins'>
            <div>

                 <div>
                <div className='flex items-center justify-center bg-gray-100 relative'>
                  <label className='block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-3 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-[2]'>Enter Code</label>

                  <input
                    type={showpass ? 'text' : 'password'}
                    value={code}
                    className='w-full h-12 appearance-none border rounded p-3 text-dark leading-6 font-medium text-sm focus:outline-none focus:shadow-outline peer relative'
                  />
                  <i
                    className={`fa ${showpass ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer`}
                    onClick={() => setshowpass(!showpass)}
                  ></i>
                </div>
                {errCodeMSG && <p className='text-red-500 text-sm mb-3 mt-3'>{errCodeMSG}</p>}
              </div>
                <div className="text-center mt-4">
              <p className="text-gray-600 text-sm leading-5">
                Didn’t receive a code?{' '}
                <button className="font-bold text-success hover:text-red-700 mx-1" onClick={() => router.push('/signup')}>
                  Resend
                </button>
              </p>
            </div>
            
              <button type="submit" className='bg-main text-light p-4 w-full rounded-md font-semibold text-sm leading-5 my-5 h-14'>Verify</button>
            </div>

          </form>
        </div>
        <div className='flex-1 h-full mx-10'>
          <img src="../images/verify.png" alt="" className='block w-full h-full ' />
        </div>
      </div>
    </div>
  );
}
export default page