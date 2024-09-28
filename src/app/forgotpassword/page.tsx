'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import PhoneInputComponent from '../components/PhoneInputComponent'
import { auth } from '../firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import ResponsiveLogo from '../components/ResponsiveLogo';
import ResponsiveImage from '../components/ResponsiveImage'
import TitleDesc from '../components/TitleDesc'
import { isValidPhoneNumber } from '../utils/validation'
import { usePathname, useSearchParams } from 'next/navigation';

const Page = () => {
  const router = useRouter()
  const [submissionError, setSubmissionError] = useState('');
    const [formData, setFormData] = useState({
    phoneNumber: ''
  })

  const [formErrors, setFormErrors] = useState({
    phoneNumber: ''
  })

   const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pathAfterRoot = pathname.split('/').filter(Boolean).join('/');
     localStorage.setItem("path", pathAfterRoot);
    console.log("current route", pathAfterRoot);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (typeof window !== 'undefined' && auth) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response: any) => {
            console.log('reCAPTCHA solved, proceed with phone verification', response)
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired, please retry')
          },
        },
      )
    }
  }, [auth])

  const handlePhoneInputChange = (
    value: string,
    data: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
       const errors: any = {}
    const val = e.target.value
      setFormData((prev) => ({
      ...prev,
      phoneNumber: val,
    }))
    
       setFormErrors((prev) => ({
    ...prev,
    phoneNumber: '',
  }));
  }

  const sendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.phoneNumber) {
      setFormErrors({ phoneNumber: 'Valid phone number is required' })
      return
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      console.log("appVerifier",appVerifier)
      if (!appVerifier) {
        console.error('reCAPTCHA not initialized')
        return
      }

      const confirmationResult = await signInWithPhoneNumber(auth, formData.phoneNumber, appVerifier)
      localStorage.setItem('verificationId', confirmationResult.verificationId);
      console.log('SMS sent', confirmationResult)
      router.push('/verifycode') 
    } catch (error) {
      console.error('Error sending verification code:', error)
      setSubmissionError('Failed to send verification code. Please try again.')
    }
  }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionError('');
    if (formData.phoneNumber) {
      try {
        await sendVerificationCode(e)
      } catch (error) {
        console.error('Error during form submission:', error)
        setSubmissionError('There was an error submitting the form, please try again.');
      }
    }
  }

  return (
    <div className="my-3 mx-14 max-h-screen">
      <ResponsiveLogo />
      <div className="flex justify-between items-center w-full gap-2 h-auto my-8 md:my-4">
        <div className="flex-[1.5] flex items-start flex-col custom:mx-5">
             <p className='mb-4'>
            <i className='fa fa-chevron-left'></i>
            <button className='ml-2 font-medium text-xs md:text-sm' onClick={() => router.push('/login')}>Back to login</button>
          </p>
           <TitleDesc 
            title="Forgot your password?"
            description="Don’t worry, happens to all of us. Enter your email below to recover your password"
          />
          <form
            onSubmit={handleSubmit}
            className="mx-auto space-y-4 w-full font-poppins"
          >
            <div>
              <div className="flex justify-between gap-5 items-center">
                <PhoneInputComponent
                  phoneNumber={formData.phoneNumber}
                  onChange={handlePhoneInputChange}
                  error={formErrors.phoneNumber}
                />
              </div>
               <div className="h-4 my-1">
               {submissionError && (
                <p
            className={`text-xs md:text-sm text-lightRed transition-opacity duration-300 ${
              submissionError ? 'opacity-100' : 'opacity-0'}`}>
                {submissionError}
              </p>
            )}
             </div>
              <Button type='submit'>Submit</Button>
              
            </div>
          </form>
        </div>
        <div id="recaptcha-container"></div>
        <ResponsiveImage  src="/images/forgot.png" alt="forgot"/>
      </div>
    </div>
  );
};

export default Page;
