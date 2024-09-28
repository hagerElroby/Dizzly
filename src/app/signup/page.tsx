'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import InputField from '../components/InputField'
import CheckboxField from '../components/CheckboxField'
import PhoneInputComponent from '../components/PhoneInputComponent'
import { auth } from '../firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import ResponsiveLogo from '../components/ResponsiveLogo'
import ResponsiveImage from '../components/ResponsiveImage'
import TitleDesc from '../components/TitleDesc'
import { useParams } from 'next/navigation';
import {
  isValidName,
  isValidEmail,
  isValidPhoneNumber,
} from '../utils/validation'
import { usePathname, useSearchParams } from 'next/navigation';

const Page = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  })

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: '',
  })

  const [submissionError, setSubmissionError] = useState('');
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
            console.log(
              'reCAPTCHA solved, proceed with phone verification',
              response,
            )
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired, please retry')
          },
        },
      )
    }
      return () => {
    window.recaptchaVerifier.clear(); 
  };
  }, [auth])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

       setFormErrors((prev) => ({
    ...prev,
    [name]: '',
  }));
  }

  const validateForm = () => {
    const errors: any = {}

    if (!formData.firstName) {
      errors.firstName = 'First name is required'
    } else if (!isValidName(formData.firstName)) {
      errors.firstName = 'First name can only contain Arabic or English letters'
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'Name is too short'
    } else if (formData.firstName.length > 15) {
      errors.firstName = 'Name is too long'
    }

    if (!formData.lastName) {
      errors.lastName = 'Last name is required'
    } else if (!isValidName(formData.lastName)) {
      errors.lastName = 'Last name can only contain Arabic or English letters'
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Name is too short'
    } else if (formData.lastName.length > 15) {
      errors.lastName = 'Name is too long'
    }

    if (formData.email && !isValidEmail(formData.email)) {
      errors.email = 'Email is invalid'
    }

    const lengthValid =
      formData.password.length >= 6 && formData.password.length <= 20
    const hasUpperCase = /[A-Z]/.test(formData.password)
    const hasNumber = /[0-9]/.test(formData.password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)

    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (!lengthValid) {
      errors.password = 'Password must be between 6 and 20 characters'
    } else if (!hasUpperCase) {
      errors.password = 'Password must contain at least one uppercase letter'
    } else if (!hasNumber) {
      errors.password = 'Password must contain at least one number'
    } else if (!hasSpecialChar) {
      errors.password = 'Password must contain at least one special character'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.termsAccepted) {
      errors.termsAccepted = 'You must accept the terms and privacy policies'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePhoneInputChange = (
    value: string,
    data: any,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const errors: any = {}
    const val = e.target.value
    setFormData((prev) => ({
      ...prev,
      phoneNumber: val,
    }))

    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required'
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number can only contain digits'
    }

     setFormErrors((prev) => ({
    ...prev,
    phoneNumber: '',
  }));
  }

  const sendVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.phoneNumber) {
      setFormErrors((prev) => ({
        ...prev,
        phoneNumber: 'Phone number is required',
      }))
      return
    }

    try {
      const appVerifier = window.recaptchaVerifier
      if (!appVerifier) {
        console.error('reCAPTCHA not initialized')
        return
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formData.phoneNumber,
        appVerifier,
      )

      localStorage.setItem('verificationId', confirmationResult.verificationId)
      console.log('SMS sent', confirmationResult)
      router.push('/verifycode')
    } catch (error) {
      console.error('Error sending verification code:', error);
      setSubmissionError('Failed to send verification code. Please try again.');
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionError('');
    if (validateForm()) {
      try {
        await sendVerificationCode(e)
        localStorage.setItem('formData', JSON.stringify(formData))
      } catch (error) {
        console.error('Error during form submission:', error)
        setSubmissionError('There was an error submitting the form, please try again.');
      }
    }
  }

  return (
    <div className="my-3 mx-14 h-auto">
      <ResponsiveLogo />
      <div className="flex justify-between items-center w-full gap-2 h-auto my-8 md:my-2">
        <ResponsiveImage src="/images/signup.png" alt="Sign up" />
        <div className="flex-[1.5] flex items-start flex-col custom:mx-5">
          <TitleDesc
            title="Sign up"
            description="Let’s get you all set up so you can access your personal account."
          />
          <form
            onSubmit={handleSubmit}
            className="mx-auto space-y-4 w-full font-poppins"
          >
            <div>
              <div className="flex flex-col sm:flex-row justify-between gap-5 md:gap-3 items-center">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={formErrors.firstName}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={formErrors.lastName}
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-5 items-center">
                <PhoneInputComponent
                  phoneNumber={formData.phoneNumber}
                  onChange={handlePhoneInputChange}
                  error={formErrors.phoneNumber}
                />
                <InputField
                  label="Email (Optional)"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-5 items-center">
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={formErrors.password}
                />
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={formErrors.confirmPassword}
                />
              </div>
              <div>
                <CheckboxField
                  label="I agree to the Terms and Privacy Policy"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  error={formErrors.termsAccepted}
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
              <Button type="submit">Continue</Button>
            </div>

            <div className="text-center mb-2">
              <p className="text-dark text-xs md:text-sm leading-5">
                Already have an account?{' '}
                <button
                  className="font-bold text-lightRed hover:text-red-700 mx-1 text-xs md:text-sm"
                  onClick={() => router.push('/login')}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
          <div id="recaptcha-container"></div>
        </div>
      </div>
    </div>
  )
}

export default Page
