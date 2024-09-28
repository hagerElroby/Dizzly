'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Button from '../components/Button'
import ResponsiveImage from '../components/ResponsiveImage'
import ResponsiveLogo from '../components/ResponsiveLogo'
import TitleDesc from '../components/TitleDesc'

const Page = () => {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [errorSelect, setErrorSelect] = useState<string |null>(null);
  const handleSelection = (type: string) => {
    setSelectedType(type);
    setErrorSelect("")
  }

   const handleNext = () => {
    if (selectedType) {
      localStorage.setItem('role', selectedType);
      router.push('/signup');
    } else {
      setErrorSelect('Please select an account type before proceeding.');
    }
  }

  return (
    <div className="my-3 mx-14 max-h-screen">
      <ResponsiveLogo />
      <div className="flex justify-between items-center w-full gap-2 my-8 md:my-3">
        <ResponsiveImage src="/images/join.png" alt="Join as" />
        <div className="flex-[1.5] flex items-start flex-col">
          <div className="w-full mx-3">
          <TitleDesc 
            title="Join us"
            description="To begin this journey, tell us what type of account you'd be opening."
          />
            <div
              onClick={() => handleSelection('Seller')}
              className={`flex items-center justify-between p-4 md:p-7 mb-8 shadow-custom rounded-lg cursor-pointer h-24 ${
                selectedType === 'Seller'
                  ? 'border-second bg-second'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center p-3">
                <div className="p-2">
                  <Image
                    src="/images/seller.svg"
                    alt="seller"
                    width={52}
                    height={52}
                    className="w-[52px] h-[52px]"
                  />
                </div>
                <div className="ml-2 md:ml-4">
                  <h3 className="text-base font-semibold text-dark">Seller</h3>
                  <p className="text-xs md:text-sm font-normal text-weakColor">
                    Lorem Ipsum is simply dummy text of the printing.
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src="/images/arrow-right.svg"
                  alt="customer"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px]"
                  unoptimized
                />
              </div>
            </div>
            <div
              onClick={() => handleSelection('Customer')}
              className={`flex items-center justify-between p-4 md:p-7 mb-4 shadow-custom rounded-lg cursor-pointer h-24 ${
                selectedType === 'Customer'
                  ? 'border-second bg-second'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center p-3">
                <div className="p-2">
                  <Image
                    src="/images/customer.svg"
                    alt="customer"
                    width={52}
                    height={52}
                    className="w-[52px] h-[52px]"
                    unoptimized
                  />
                </div>
                <div className="ml-2 md:ml-4">
                  <h3 className="text-base font-semibold text-dark">
                    Customer
                  </h3>
                  <p className="text-xs md:text-sm font-normal text-weakColor">
                    Lorem Ipsum is simply dummy text of the printing.
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src="/images/arrow-right.svg"
                  alt="customer"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px]"
                  unoptimized
                />
              </div>
            </div>
            <div className="h-4  my-2">
              {errorSelect && (
          <p
            className={`text-xs md:text-sm text-lightRed transition-opacity duration-300 ${
              errorSelect ? 'opacity-100' : 'opacity-0'
            }`}>
            {errorSelect}
          </p>)}
            </div>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
