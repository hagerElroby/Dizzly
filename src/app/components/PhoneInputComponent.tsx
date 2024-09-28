import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './style.css'

interface PhoneInputProps {
  phoneNumber: string;
  onChange:(value: string,data: any, e: React.ChangeEvent<HTMLInputElement>) => void;
  error?:string;
}

const PhoneInputComponent: React.FC<PhoneInputProps> = ({ 
  phoneNumber, 
  onChange, 
 error
}) => {
  return (
     <div className="w-full md:flex-1 mb-2 relative">
      <div className="flex items-center justify-center relative mb-1 md:mb-2 z-20">
        <label
          className="block text-dark font-medium leading-5 mb-1 absolute font-poppins left-3 top-2 md:top-0 transform -translate-y-1/2 px-1 text-xs md:text-sm bg-white z-[2]"
        >
        Phone Number
      </label>
      <PhoneInput
        country={'iq'}
        value={phoneNumber}
        onChange={onChange} 
        buttonClass="bg-white rounded-l-lg px-3 z-20"
        containerClass="w-full"
        inputClass="w-full p-8"
      />
       </div>
        <div className="h-4 mt-1 md:my-2">
        {error && (
          <p
            className={`text-xs md:text-sm text-lightRed transition-opacity duration-300 ${
              error ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default PhoneInputComponent;


