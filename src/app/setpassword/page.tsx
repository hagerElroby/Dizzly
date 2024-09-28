'use client';

import { useState} from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ResponsiveLogo from '../components/ResponsiveLogo';
import TitleDesc from '../components/TitleDesc';
import ResponsiveImage from '../components/ResponsiveImage';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    password: '',
    confirmPassword: ''
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }


    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
      router.push('/');
    }
  };
  
 
   return (
    <div className="my-3 mx-14 max-h-screen">
      <ResponsiveLogo />
       <div className="flex justify-between items-center w-full gap-2 h-auto my-8 md:my-4">
         <div className="flex-[1.5] flex items-start flex-col custom:mx-5">
           <TitleDesc 
            title="Set a password"
            description="Your previous password has been reseted. Please set a new password for your account."
          />
          <form
            onSubmit={handleSubmit}
            className="mx-auto space-y-4 w-full font-poppins"
          >
            <div>
              <div className="flex justify-between gap-5 items-center">
                 <InputField
                   label="Create Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={formErrors.password}
                />
              </div>
              <div className="flex justify-between gap-5 items-center">
                 <InputField
                   label="Re-enter Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={formErrors.confirmPassword}
                />
              </div>
              <Button type='submit'>Set password</Button>
            </div>
          </form>
        </div>
        <div id="recaptcha-container"></div>
        <ResponsiveImage  src="/images/verify.png" alt="verify"/>
      </div>
    </div>
  );
}

export default Page