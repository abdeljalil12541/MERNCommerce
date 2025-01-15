"use client";
import { Goldman, Archivo } from 'next/font/google';
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import ReviewSwipper from '@/components/home/ReviewSwipper';


  
const GoldmanFont = Goldman({
  subsets: ['latin'],
  weight: ['400'],
});

const ArchivoFont = Archivo({
  subsets: ['latin'],
})


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

  const products = [
    { title: 'BEAST SKATE DECK - PINK', size: 'S', color: 'Red', productType: 'Accessoiries', regularPrice: 499, currentPrice: 459, discount: 16, status: 'NEW', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-03-15', ifBestSeller: true },
    { title: 'BEAST SKATE DECK - PINK', size: 'S', color: 'Blue', productType: 'Flannel Pants', regularPrice: 499, currentPrice: 459, discount: 16, status: 'NEW', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-02-28', ifBestSeller: false },
    { title: 'BEAST SKATE DECK - BLUE', size: 'S', color: 'Red', productType: 'Cap', regularPrice: 499, currentPrice: 449, discount: 10, status: 'DEAL', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-01-15', ifBestSeller: true },
    { title: 'BEAST SKATE DECK - GREEN', size: 'S', color: 'Black', productType: 'Backpack', regularPrice: 499, currentPrice: 399, discount: 20, status: 'TRENDING', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-03-01', ifBestSeller: true },
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
                  <svg className="icon icon-ruler tw-w-6 tw-h-6 tw-text-mrb-black tw-ml-2" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20">
                    <path d="M18.9836 5.32852L14.6715 1.01638L1.01638 14.6715L5.32852 18.9836L18.9836 5.32852ZM15.3902 0.297691C14.9933 -0.0992303 14.3497 -0.0992303 13.9528 0.297691L0.297691 13.9528C-0.0992301 14.3497 -0.0992305 14.9932 0.297691 15.3902L4.60983 19.7023C5.00675 20.0992 5.65029 20.0992 6.04721 19.7023L19.7023 6.04721C20.0992 5.65029 20.0992 5.00675 19.7023 4.60983L15.3902 0.297691Z" fillRule="evenodd"></path>
                    <path d="M11.7863 2.67056C11.9848 2.4721 12.3065 2.4721 12.505 2.67056L14.4237 4.58927C14.6222 4.78774 14.6222 5.1095 14.4237 5.30796C14.2252 5.50642 13.9035 5.50642 13.705 5.30796L11.7863 3.38925C11.5878 3.19079 11.5878 2.86902 11.7863 2.67056Z"></path>
                    <path d="M8.93891 5.36331C9.13737 5.16485 9.45914 5.16485 9.6576 5.36331L11.5763 7.28202C11.7748 7.48048 11.7748 7.80225 11.5763 8.00071C11.3779 8.19917 11.0561 8.19917 10.8576 8.00071L8.93891 6.082C8.74045 5.88354 8.74045 5.56177 8.93891 5.36331Z"></path>
                    <path d="M6.24307 8.20742C6.44153 8.00896 6.76329 8.00896 6.96175 8.20742L8.88047 10.1261C9.07893 10.3246 9.07893 10.6464 8.88047 10.8448C8.68201 11.0433 8.36024 11.0433 8.16178 10.8448L6.24307 8.92611C6.0446 8.72765 6.0446 8.40588 6.24307 8.20742Z"></path>
                    <path d="M3.37296 10.8776C3.57142 10.6791 3.89319 10.6791 4.09165 10.8776L6.01036 12.7963C6.20882 12.9948 6.20882 13.3165 6.01036 13.515C5.8119 13.7134 5.49013 13.7134 5.29167 13.515L3.37296 11.5963C3.1745 11.3978 3.1745 11.076 3.37296 10.8776Z"></path>
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

              <p className="text-red-500 mt-3">Very Low Stock:  13  UNITS LEFT </p>

              <Button color="primary" className="rounded-lg my-4 w-full">ADD TO CART</Button>
            </div>
          </div>
        </div>
      </div>

      <section className='w-full px-4'>
        <p className='flex text-2xl py-4 pl-1 justify-start'>
          You may also like
        </p>
        <div className="w-full grid grid-cols-4 gap-2 mb-5">
            {products.length > 0 && (
              products.map((product, index) => (
                  <div key={index} className={`${GoldmanFont.className} col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group`}>
                      <img
                          src={product.mainSrc}
                          alt={product.title}
                          className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                      />
                      <img
                          src={product.hoverSrc}
                          alt={`${product.title} Hover`}
                          className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                      />
                      <span 
                          className={`absolute ${product.status === 'SOLD OUT'? '!bottom-[90px] right-2': 'top-2 left-2'} 
                              ${product.status === 'NEW' && 'bg-[#1AACDD]' ||
                                  product.status === 'DEAL' && 'bg-[#E74683]' ||
                                  product.status === 'TRENDING' && 'bg-[#17C964]' ||
                                  product.status === 'SOLD OUT' && 'bg-neutral-950'
                              } text-white text-[10px] me-2 px-4 py-1 rounded-xl font-medium`}
                          >
                          {product.status}
                      </span>
                      <div className="space-y-2 p-2">
                          <p className="pt-2 cursor-pointer TextCardHover">{product.title}</p>
                          <div className="flex gap-3">
                              <p className="text-gray-800 line-through">{product.regularPrice.toFixed(2)} dh</p>
                              <p className="text-black ">{product.currentPrice.toFixed(2)} dh</p>
                              <p className="text-[#E74683] mt-[1px]">{product.discount}% OFF</p>
                          </div>
                      </div>
                  </div>
              ))
            )}
        </div>
      </section>

      <section className='-mb-12'>
        <ReviewSwipper />
      </section>
    </div>
  );
}