"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../style.css'

const page = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showpass, setshowpass] = useState<boolean>(false);

  // Error messages
  const [fNameErrMSG, setfNameErrMSG] = useState<string>('');
  const [lNameErrMSG, setlNameErrMSG] = useState<string>('');
  const [phoneErrMSG, setphoneErrMSG] = useState<string>('');
  const [emailErrMSG, setEmailErrMSG] = useState<string>('');
  const [addressErrMSG, setAddressErrMSG] = useState<string>('');
  const [passErrMSG, setpassErrMSG] = useState<string>('');
  const [confirmPassErrMSG, setconfirmPassErrMSG] = useState<string>('');



  const nameVal = /^[A-Za-z]+$/;
  const phoneVal = /^[0-9]*$/;
  const addressVal = /^[A-Za-z0-9\s,.'-]{3,50}$/;



  /* first name validation */
  const firstNameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setfNameErrMSG('First name is required');
    } else if (!nameVal.test(e.target.value)) {
      setfNameErrMSG('Enter a valid name');
    } else {
      setfNameErrMSG('');
      setFirstName(e.target.value);
    }
  };
  
  /* last name validation */
  const lastNameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setlNameErrMSG('Last name is required');
    } else if (!nameVal.test(e.target.value)) {
      setlNameErrMSG('Enter a valid name');
    } else {
      setlNameErrMSG('');
      setLastName(e.target.value);
    }
  };

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


  
  /* address validation */
  const userAddressVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setAddressErrMSG('Address is required');
    } else if (!addressVal.test(e.target.value)) {
      setAddressErrMSG('Wrong Address format'); 
    }
    else {
      setAddressErrMSG('');
      setAddress(e.target.value);
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

    if (!firstName) {
      setfNameErrMSG('First name is required');
      return;
    }

    if (!lastName) {
      setlNameErrMSG('Last name is required');
      return;
    }


    if (!phoneNumber) {
      setphoneErrMSG('Phone number is required');
      return;
    }
    
    if (!address) {
      setAddressErrMSG('Address is required');
      return;
    }

    if (!password || !confirmPassword) {
      setpassErrMSG('Password is required');
      return;
    } else if (password !== confirmPassword) {
      setconfirmPassErrMSG('Passwords do not match');
      return;
    }

      // All validation passed, navigate to the upload photo route
   router.push('/verifycode');
   
  };

  return (
    <div className='my-3 mx-14 max-h-screen'>
      <div className='flex items-center gap-2 justify-end'>
        <div className='w-10  flex items-center'>
          <img src="/images/Group 47602.png" alt="" className='block w-full' />
        </div>
        <h1 className='text-3xl font-bold'>DIZZLY</h1>
      </div>
      <div className='flex justify-between items-center w-full gap-28 h-[85vh]'>
         <div className='flex-1 h-full mx-10'>
          <img src="../images/signup.png" alt="" className='block w-full h-full ' />
        </div>
        <div className='flex-1 flex items-start flex-col mx-4'>
          <h1 className='text-4xl font-semibold text-center text-gray-800 mb-3'>Sign up</h1>
          <p className='font-normal text-sm leading-6 text-gray opacity-75 mb-4'>Let’s get you all st up so you can access your personal account.</p>
          <form onSubmit={submitVal} className='space-y-4 text-gray-900 w-full rounded font-poppins'>
            <div>

               <div className='flex justify-between gap-5 items-center'>
                 <div className='flex-1'>
                <div className='flex items-center justify-center bg-gray-100 relative mb-3'>
                  <label className='block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-3 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-[2]'>First Name</label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={firstNameVal}
                    className='w-full h-10 appearance-none border rounded p-4 text-dark leading-6 font-medium text-sm focus:outline-none focus:shadow-outline peer relative'
                  />
                </div>
                {fNameErrMSG && <p className='text-red-500 text-sm mb-3 mt-3'>{fNameErrMSG}</p>}
              </div>
                <div className='flex-1'>
                <div className='flex items-center justify-center bg-gray-100 relative mb-3'>
                  <label className='block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-3 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-[2]'>Last Name</label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={lastNameVal}
                    className='w-full h-10 appearance-none border rounded p-4 text-dark leading-6 font-medium text-sm focus:outline-none focus:shadow-outline peer relative'
                  />
                </div>
                {lNameErrMSG && <p className='text-red-500 text-sm mb-3 mt-3'>{lNameErrMSG}</p>}
              </div>
               </div>
              <div className='flex justify-between gap-5 items-center'>
                <div className='flex-1'>
                <div className='w-full my-4 relative z-10'>
                  <label className="block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-12 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-10">Phone input</label>
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

               <div className='flex-1'>
                <div className='flex items-center justify-center bg-gray-100 relative mb-3'>
                  <label className='block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-3 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-[2]'>First Name</label>

                  <input
                    type="email"
                    value={email}
                    onChange={firstNameVal}
                    className='w-full h-10 appearance-none border rounded p-4 text-dark leading-6 font-medium text-sm focus:outline-none focus:shadow-outline peer relative'
                  />
                </div>
                {fNameErrMSG && <p className='text-red-500 text-sm mb-3 mt-3'>{fNameErrMSG}</p>}
              </div>

              </div>
              <div>
                <div className='flex items-center justify-center bg-gray-100 relative mb-3'>
                  <label className='block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-3 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-[2]'>Password</label>

                  <input
                    type={showpass ? 'text' : 'password'}
                    value={password}
                    onChange={valPass}
                    className='w-full h-10 appearance-none border rounded p-4 text-dark leading-6 font-medium text-sm focus:outline-none focus:shadow-outline peer relative'
                  />
                  <i
                    className={`fa ${showpass ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer`}
                    onClick={() => setshowpass(!showpass)}
                  ></i>
                </div>
                {passErrMSG && <p className='text-red-500 text-sm mb-3 mt-3'>{passErrMSG}</p>}
              </div>
              <div>
                <div className='flex items-center justify-center bg-gray-100 relative mb-3'>
                  <label className='block text-dark font-medium leading-5 mb-1 absolute font-poppins  left-3 top-0 transform -translate-y-1/2 px-1 text-sm bg-white z-[2]'>Confirm Password</label>

                  <input
                    type={showpass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={confirmPassVal}
                    className='w-full h-10 appearance-none border rounded p-4 text-dark leading-6 font-medium text-sm focus:outline-none focus:shadow-outline peer relative'
                  />
                  <i
                    className={`fa ${showpass ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer`}
                    onClick={() => setshowpass(!showpass)}
                  ></i>
                </div>
                {confirmPassErrMSG && <p className='text-red-500 text-sm mb-3 mt-3'>{confirmPassErrMSG}</p>}
              </div>
              <div className='my-2 flex items-center justify-between'>
                <div className='flex items-center'>
                  <input type="checkbox" id='remember' className='w-5 h-5' />
                  <label htmlFor="remember" className='text-sm leading-5 font-medium ml-4'>I agree to all the Terms and Privacy Policies</label>
                </div>
                <div>
                  <button className='text-success font-medium leading-5 text-sm hover:text-red-700' onClick={() => router.push('/forget-password')}>Forgot Password</button>
                </div>
              </div>

              <button type="submit" className='bg-main text-light p-3 w-full rounded-md font-semibold text-sm my-2 h-11'>Continue</button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm leading-5">
                Already have an account?{' '}
                <button className="font-bold text-success hover:text-red-700 mx-1" onClick={() => router.push('/login')}>
                  Login
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
export default page
