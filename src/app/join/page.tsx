"use client"
import React, { useState } from "react";
import {useRouter} from 'next/navigation'

const AccountTypeSelection: React.FC = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelection = (type: string) => {
    setSelectedType(type);
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
          <img src="../images/join.png" alt="" className='block w-full h-full ' />
        </div>
    <div className="flex-1 flex items-start flex-col mx-4">
      <div className=" p-6 rounded-lg  w-full">
        <h1 className="text-4xl font-semibold text-gray mb-3">Join as</h1>
        <p className="text-gray mb-6 font-normal text-sm">
          To begin this journey, tell us what type of account you'd be opening.
        </p>
        <div
          onClick={() => handleSelection("Seller")}
          className={`flex items-center justify-between p-7 mb-8 shadow-custom rounded-lg cursor-pointer h-24 ${
            selectedType === "Seller"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center p-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <i className="fas fa-store text-second text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold text-dark">Seller</h3>
              <p className="text-sm font-normal text-weakColor">
                Lorem Ipsum is simply dummy text of the printing.
              </p>
            </div>
          </div>
          <div>
            <i className="fas fa-arrow-right text-second text-xl"></i>
          </div>
        </div>
        <div
          onClick={() => handleSelection("Customer")}
          className={`flex items-center justify-between p-7 mb-4 shadow-custom rounded-lg cursor-pointer h-24 ${
            selectedType === "Customer"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center p-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <i className="fas fa-user text-second text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-semibold text-dark">Customer</h3>
              <p className="text-sm font-normal text-weakColor">
                Lorem Ipsum is simply dummy text of the printing.
              </p>
            </div>
          </div>
          <div>
            <i className="fas fa-arrow-right text-second text-xl"></i>
          </div>
        </div>

        <button
          className="bg-main text-light p-3 w-full rounded-md font-semibold text-sm leading-5 my-3 h-11"
         onClick={() => router.push('/signup')}
        >
          Next
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AccountTypeSelection;
