'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import InputField from '../components/InputField';
import CheckboxField from '../components/CheckboxField';
import PhoneInputComponent from '../components/PhoneInputComponent';
import ResponsiveImage from '../components/ResponsiveImage';
import ResponsiveLogo from '../components/ResponsiveLogo';
import TitleDesc from '../components/TitleDesc';
import { isValidPhoneNumber } from '../utils/validation';
import { loginRequest, loginSuccess, loginFailure } from '../redux/loginSlice';
import axiosInstance from '../api/axiosInstance'
import { useDispatch } from 'react-redux';

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({
    phoneNumber: '',
    password: '',
    rememberMe: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors: any = {};

    const lengthValid =
      formData.password.length >= 6 && formData.password.length <= 20;
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!lengthValid) {
      errors.password = 'Password must be between 6 and 20 characters';
    } else if (!hasUpperCase) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!hasNumber) {
      errors.password = 'Password must contain at least one number';
    } else if (!hasSpecialChar) {
      errors.password = 'Password must contain at least one special character';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handlePhoneInputChange = (value: string,data: any,e: React.ChangeEvent<HTMLInputElement>) => {
      const errors: any = {};
      const val = e.target.value;
       setFormData((prev) => ({
      ...prev,
      phoneNumber: val
    }))

    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required'
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number can only contain digits'
    }
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
       dispatch(loginRequest());
   
      try {
        const response = await axiosInstance.post('/users/signin', formData);
        dispatch(loginSuccess(response.data));
        console.log("data",response.data)
        router.push('/');
      } catch (error: any) {
        dispatch(loginFailure(error.response.data)); 
        console.log(error.response.data);
        setFormErrors((prev) => ({
          ...prev,
          password: 'Invalid credentials',
        }));
      }

    }
  };

  return (
    <div className="my-3 mx-14 h-auto">
    <ResponsiveLogo />
      <div className="flex justify-between items-center w-full gap-2 h-auto my-8 md:my-2">
        <div className="flex-[1.5] flex items-start flex-col custom:mx-5">
       <TitleDesc 
         title="Login"
         description="Login to access your travelwise account"
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
              <div className="flex justify-between gap-5 items-center">
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={formErrors.password}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-3 items-center mb-1">
                <CheckboxField
                  label="Remember me"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <button
                  className="font-bold text-lightRed hover:text-red-700 mx-1 my-1 text-xs md:text-sm"
                  onClick={() => router.push('/forgotpassword')}
                >
                  Forgot Password
                </button>
              </div>

              <Button type="submit">Login</Button>
            </div>

            <div className="text-center">
              <p className="text-dark text-xs md:text-sm leading-5">
                Don’t have an account?{' '}
                <button
                  className="font-bold text-lightRed hover:text-red-700 mx-1 text-xs md:text-sm"
                  onClick={() => router.push('/signup')}
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
        <ResponsiveImage src="/images/login.png" alt="login"/>   
      </div>
    </div>
  );
};

export default Page;
