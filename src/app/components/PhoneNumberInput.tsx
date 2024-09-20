"use client"

import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInput = () => {
  const [phone, setPhone] = useState('');

  return (
    <div className="w-full max-w-xs mx-auto">
      <label className="block text-dark font-medium leading-5 mb-1 absolute left-3 top-0 transform -translate-y-1/2 px-1 text-base bg-white">
        Phone Number
      </label>
      <PhoneInput
        country={'iq'} // Default country: Iraq
        value={phone}
        onChange={setPhone}
        inputStyle={{
        //   width: '100%',
          height: '56px',
          paddingLeft: '58px', // Make space for the flag and country code
          borderRadius: '8px',
        //   border: '1px solid #ccc', // Border for the input, remove or modify as needed
          fontSize: '16px',
          outline: 'none',
        }}
        buttonStyle={{
          border: 'none', // Remove border from the country selector
          background: 'transparent', // Remove background from the country selector
          position: 'absolute',
          left: '0',
          top: '50%',
          transform: 'translateY(-50%)', // Vertically center the flag
          padding: '0',
          margin: '0',
          width: '48px',
        }}
        dropdownStyle={{
          width: '300px',
        }}
      />
    </div>
  );
};

export default PhoneNumberInput;