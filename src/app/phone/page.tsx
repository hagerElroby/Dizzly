"use client"
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const PhoneSignUp = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
      size: 'invisible',
      callback: (response: any) => {
         console.log('reCAPTCHA solved, proceed with phone verification');
      },
    });
  };

  const sendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) {
      setError('Phone number is required');
      return;
    }
    setupRecaptcha();

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      localStorage.setItem('verificationId', confirmationResult.verificationId);
      console.log('SMS sent');
      router.push('/verifycode');


    } catch (error) {
      setError('Error sending verification code');
      console.error('Error sending verification code', error);
    }
  };

  return (
    <div>
      <form onSubmit={sendVerificationCode}>
        <PhoneInput
          international
          defaultCountry="US"
          value={phoneNumber}
          onChange={setPhoneNumber}
          error={phoneNumber ? undefined : 'Phone number is invalid'}
          placeholder="Enter phone number"
        />
        {error && <p className="text-red-500">{error}</p>}

        <div id="recaptcha-container"></div>
        <button type="submit">Send Verification Code</button>
      </form>
    </div>
  );
};

export default PhoneSignUp;
