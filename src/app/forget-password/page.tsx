"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../style.css'
const page = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  // Error messages
  const [phoneErrMSG, setphoneErrMSG] = useState<string>('');


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



  /* submit validate */
  const submitVal = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber) {
      setphoneErrMSG('Phone number is required');
      return;
    }
    // All validation passed, navigate to the home 
    router.push('/verifycode');

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
          <p className='mb-4'>
            <i className='fa fa-chevron-left'></i>
            <button className='ml-2 font-medium text-sm' onClick={() => router.push('/login')}>Back to login</button>
          </p>
          <h1 className='text-3xl font-semibold text-center text-gray-800 mb-3'>Forgot your password?</h1>
          <p className='font-normal text-sm leading-6 text-gray opacity-75 mb-7'>Don’t worry, happens to all of us. Enter your email below to recover your password</p>
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
              <button type="submit" className='bg-main text-light p-3 w-full rounded-md font-semibold text-sm leading-5 my-3 h-12'>Submit</button>
            </div>


          </form>
        </div>
        <div className='flex-1 h-full mx-10'>
          <img src="../images/forget.png" alt="" className='block w-full h-full ' />
        </div>
      </div>
    </div>
  );
}
export default page