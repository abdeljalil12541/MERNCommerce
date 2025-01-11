"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";


export default function ProductPage({ slug }) {
  const [selectedSize, setSelectedSize] = useState('XXS/Y12');

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const sizes = [
    { name: 'XXS/Y12', disabled: false },
    { name: 'XS/Y14', disabled: false }, 
    { name: 'SM', disabled: true },
    { name: 'MD', disabled: true },
    { name: 'LG', disabled: true },
    { name: 'XL', disabled: true },
    { name: '2XL', disabled: false },
    { name: '3XL', disabled: false }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product: BEAST WAS HERE SS TEE - BLACK</h1>
      <div className="w-full grid grid-cols-2">
        <div className="col-span-1 grid grid-cols-5">
          <div className="col-span-1">
            <img className="border h-28 object-cover w-full my-2" src="https://mrbeast.store/cdn/shop/files/0-7-Fcopy.jpg?v=1718170165&width=1946" alt="" />
            <img className="h-28 object-cover w-full my-2" src="https://mrbeast.store/cdn/shop/files/0-6-Fcopy.jpg?v=1718170165&width=1946" alt="" />
            <img className="h-28 object-cover w-full my-2" src="https://mrbeast.store/cdn/shop/files/crop_0003_133.jpg?v=1718170165&width=1946" alt="" />
          </div>
          <div className="col-span-4">
            <img src="https://mrbeast.store/cdn/shop/files/photo_2023-06-29_02-49-55.jpg?v=1718170165&width=1946" alt="" />
          </div>
        </div>


        <div className="col-span-1">
          <div className="w-full">
            <p className="text-2xl">BEAST WAS HERE SS TEE - BLACK </p>
            <div className="w-full flex items-end gap-5 py-4">
              <span className="text-gray-500 pb-1 text-sm line-through">365.00 dh</span>
              <p className="text-3xl">183.00 dh</p>
              <p className="text-lg pb-[1px] text-[#E74683]">49% off</p>
            </div>

            <hr className="border-gray-500 mb-1" />
            
            <div className="w-full flex flex-col py-2 gap-2">
              <p className="text-gray-700">Taxes included. <span className="underline text-black">Shipping</span> calculated at checkout.</p>
              <div className="w-full text-lg gap-1 flex text-[#E74683]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="text-gray-600 text-[14px] -mt-[3px] font-mono ml-1">16 reviews</span>
              </div>
            </div>
            
            <hr className="border-gray-500 mt-4" />

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium">Size</h2>
                <button className="text-blue-600 hover:text-blue-800 underline flex items-center">
                  Find my size
                  <svg className="w-4 h-4 ml-1 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button 
                    key={size.name}
                    onClick={() => !size.disabled && handleSizeSelect(size.name)}
                    className={`
                      py-2 px-4 rounded
                      ${selectedSize === size.name 
                        ? 'bg-black text-white hover:opacity-90' 
                        : 'border border-gray-300 hover:border-gray-400'
                      }
                      ${size.disabled 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'cursor-pointer'
                      }
                    `}
                    disabled={size.disabled}
                  >
                    {size.name}
                  </button>
                ))}
              </div>

              <p className="text-gray-600 mt-3">Standard international shipping</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}