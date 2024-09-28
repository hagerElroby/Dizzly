'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import InputField from '../components/InputField'
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '../firebase'
import ResponsiveLogo from '../components/ResponsiveLogo'
import ResponsiveImage from '../components/ResponsiveImage'
import TitleDesc from '../components/TitleDesc'
import { useDispatch, useSelector } from 'react-redux'
import {
  signupPending,
  signupSuccess,
  signupFailure,
} from '../redux/signupSlice'
import axiosInstance from '../api/axiosInstance'

const Page = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state: any) => state.signup)
  const [code, setCode] = useState<string>('')
  const [errCodeMSG, setErrCodeMSG] = useState<string>('')
  // const [previousRoute, setPreviousRoute] = useState<string>('')
  const previousRoute = localStorage.getItem("path");


  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const verificationIdStore = localStorage.getItem('verificationId')
      const verificationId = window.verificationId || verificationIdStore
      console.log('Stored verificationId:', verificationIdStore)
      console.log('Window verificationId:', window.verificationId)
      console.log('Using verificationId:', verificationId)

      if (!verificationId) {
        setErrCodeMSG(
          'Verification ID not found. Please retry the verification process.',
        )
        return
      }
      const credential = PhoneAuthProvider.credential(verificationId, code)
      const result = await signInWithCredential(auth, credential)
      console.log('Code verified, user signed in:', result)

      const accessToken = await result.user.getIdToken()
      console.log('Access token:', accessToken)

      if (previousRoute=="signup") {
        const storedFormData = localStorage.getItem('formData')
        const parsedFormData = storedFormData
          ? JSON.parse(storedFormData)
          : null
        console.log(parsedFormData)
        const role = localStorage.getItem('role')
        console.log(role)
        const { firstName, lastName, phoneNumber, email, password } =
          parsedFormData || {}
        const dataToSend = {
          firstName,
          lastName,
          phoneNumber,
          password,
          role,
          ...(email && { email }),
        }
        if (dataToSend) {
          console.log(dataToSend)
          const response = await axiosInstance.post('/users/signup', dataToSend)
          dispatch(signupSuccess(response.data))
          console.log('Signup response data:', response.data)
          router.push('/')
        } else {
          console.log('sign up error');
          dispatch(signupFailure(error));
        }
      } else if (previousRoute=="forgotpassword") {
        console.log("forgot")
        router.push('/setpassword')
      }
    } catch (error: any) {
      console.error('Error verifying code:', error)

      if (error.code === 'auth/invalid-verification-code') {
        setErrCodeMSG('Invalid verification code. Please try again.')
      } else {
        setErrCodeMSG(
          'An error occurred during verification. Please try again.',
        )
      }
    }
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  return (
    <div className="my-3 mx-14 h-auto">
      <ResponsiveLogo />
      <div className="flex justify-between items-center w-full gap-2 h-auto my-8 md:my-4">
        <div className="flex-[1.5] flex items-start flex-col custom:mx-5">
          <p className="mb-4">
            <i className="fa fa-chevron-left"></i>
            <button
              className="ml-2 font-medium text-xs md:text-sm"
              onClick={() => router.push('/login')}
            >
              Back to login
            </button>
          </p>
          <TitleDesc
            title="Verify code"
            description="An authentication code has been sent to your email."
          />
          <form
            onSubmit={verifyCode}
            className="mx-auto space-y-4 w-full font-poppins"
          >
            <div>
              <div className="flex justify-between gap-5 items-center">
                <InputField
                  label="Enter Code"
                  name="Enter Code"
                  value={code}
                  type="password"
                  onChange={handleCodeChange}
                  error={errCodeMSG}
                />
              </div>
              <Button type="submit">Verify</Button>
            </div>
          </form>
        </div>
        <div id="recaptcha-container"></div>
        <ResponsiveImage src="/images/verify.png" alt="verify" />
      </div>
    </div>
  )
}

export default Page
