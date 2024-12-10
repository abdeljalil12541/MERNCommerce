"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import HoverImage from "react-hover-image"

const All = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedSort, setSelectedSort] = useState('Featured');
    const [selectedFilters, setSelectedFilters] = useState({
      size: [],
      color: [],
      productType: []
    });
  
    const sortOptions = [
      'Featured',
      'Best selling',
      'Alphabetically, A-Z',
      'Alphabetically, Z-A',
      'Price, low to high',
      'Price, high to low',
      'Date, old to new',
      'Date, new to old'
    ];
  
    const filterOptions = {
      size: ['XS', 'S', 'M', 'L', 'XL'],
      color: ['Black', 'White', 'Blue', 'Red'],
      productType: [
        { name: 'Accessories', count: 1 },
        { name: 'Backpack', count: 1 },
        { name: 'Cap', count: 3 },
        { name: 'Flannel Pants', count: 1 },
        { name: 'Hoodies', count: 11 },
        { name: 'Jersey', count: 1 },
        { name: 'Lunch Bag', count: 1 },
        { name: 'Skate Deck', count: 3 },
        { name: 'Sweaters', count: 1 },
        { name: 'T-Shirt', count: 16 }
      ]
    };
  
    const filterRef = useRef(null);
    const sortRef = useRef(null);
  
    const toggleDropdown = (name) => {
      setOpenDropdown(openDropdown === name ? null : name);
    };
  
    const toggleFilter = (category, value) => {
      setSelectedFilters(prev => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
      }));
    };
  
    const getSelectedCount = () => {
      return Object.values(selectedFilters).flat().length;
    };
  
    const resetFilters = () => {
      setSelectedFilters({
        size: [],
        color: [],
        productType: []
      });
    };
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check if click is outside filter section
        if (filterRef.current && !filterRef.current.contains(event.target)) {
          // Only close filter dropdowns (size, color, productType)
          if (openDropdown && openDropdown !== 'sort') {
            setOpenDropdown(null);
          }
        }
  
        // Check if click is outside sort section
        if (sortRef.current && !sortRef.current.contains(event.target)) {
          // Only close sort dropdown
          if (openDropdown === 'sort') {
            setOpenDropdown(null);
          }
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [openDropdown]); // Add openDropdown as dependency
  
  

  return (
    <div className="w-full bg-white">
        <div className="mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
            <div ref={filterRef} className="flex items-center gap-4">
                <span className="text-sm font-medium">Filter:</span>
                
                {/* Filter Dropdowns */}
                {Object.entries(filterOptions).map(([filter, options]) => (
                <div key={filter} className="relative">
                    <button
                    onClick={() => toggleDropdown(filter)}
                    className="flex items-center gap-2 text-sm capitalize hover:text-gray-600"
                    >
                    {filter === 'productType' ? 'Product type' : filter}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === filter ? 'rotate-180' : ''
                    }`} />
                    </button>

                    {openDropdown === filter && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-sm py-1 z-10">
                        <div className="px-4 py-2 border-b border-gray-200">
                        <div className="flex justify-between text-sm">
                            <span>{getSelectedCount()} selected</span>
                            <button
                            onClick={resetFilters}
                            className="text-gray-600 hover:text-gray-700 underline"
                            >
                            Reset
                            </button>
                        </div>
                        </div>
                        {filter === 'productType' ? (
                        // Product type options with counts
                        options.map((option) => (
                            <label
                            key={option.name}
                            className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                            >
                            <div className="flex items-center">
                                <input
                                type="checkbox"
                                checked={selectedFilters[filter].includes(option.name)}
                                onChange={() => toggleFilter(filter, option.name)}
                                className="mr-2 rounded border-gray-300"
                                />
                                <span>{option.name}</span>
                            </div>
                            <span className="text-gray-500">({option.count})</span>
                            </label>
                        ))
                        ) : (
                        // Regular options without counts
                        options.map((option) => (
                            <label
                            key={option}
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                            >
                            <input
                                type="checkbox"
                                checked={selectedFilters[filter].includes(option)}
                                onChange={() => toggleFilter(filter, option)}
                                className="mr-2 rounded border-gray-300"
                            />
                            {option}
                            </label>
                        ))
                        )}
                    </div>
                    )}
                </div>
                ))}
            </div>

            {/* Sort Section */}
            <div  ref={sortRef} className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <div className="relative">
                <button
                    onClick={() => toggleDropdown('sort')}
                    className="flex items-center gap-2 text-sm hover:text-gray-600"
                >
                    {selectedSort}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === 'sort' ? 'rotate-180' : ''
                    }`} />
                </button>

                {openDropdown === 'sort' && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-sm py-1 z-10">
                    {sortOptions.map((option) => (
                        <button
                        key={option}
                        onClick={() => {
                            setSelectedSort(option);
                            toggleDropdown('sort');
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                            selectedSort === option ? 'bg-gray-50' : ''
                        }`}
                        >
                        {option}
                        </button>
                    ))}
                    </div>
                )}
                </div>
                <span className="text-sm text-gray-500 ml-4">39 products</span>
            </div>
            </div>
        </div>
        
        <div className='w-full px-4 grid grid-cols-4 mb-5'>
            <div className='col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group'>
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg"
                    alt="BEAST SKATE DECK - PINK"
                    className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                />
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493"
                    alt="BEAST SKATE DECK - PINK Hover"
                    className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#1AACDD] text-white text-[10px] me-2 px-4 py-1 rounded-xl font-semibold">
                    NEW
                </span>
                <div className='space-y-2 p-2'>
                    <p className='pt-2 cursor-pointer TextCardHover'>BEAST SKATE DECK - PINK</p>
                    <div className='flex gap-3'>
                        <p className='text-gray-800 line-through'>499.00 dh</p>
                        <p className='text-black font-semibold'>499.00 dh</p>
                        <p className='text-[#E74683] font-semibold text-sm mt-[1px]'>16% OFF</p>
                    </div>
                </div>
            </div>

            
            <div className='col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group'>
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg"
                    alt="BEAST SKATE DECK - PINK"
                    className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                />
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493"
                    alt="BEAST SKATE DECK - PINK Hover"
                    className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#E74683] text-white text-[10px] me-2 px-4 py-1 rounded-xl font-semibold">
                    DEAL
                </span>
                <div className='space-y-2 p-2'>
                    <p className='pt-2 cursor-pointer TextCardHover'>BEAST SKATE DECK - PINK</p>
                    <p className='text-black font-semibold'>499.00 dh</p>
                </div>
            </div>

            
            <div className='col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group'>
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg"
                    alt="BEAST SKATE DECK - PINK"
                    className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                />
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493"
                    alt="BEAST SKATE DECK - PINK Hover"
                    className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#E74683] text-white text-[10px] me-2 px-4 py-1 rounded-xl font-semibold">
                    DEAL
                </span>
                <div className='space-y-2 p-2'>
                    <p className='pt-2 cursor-pointer TextCardHover'>BEAST SKATE DECK - PINK</p>
                    <p className='text-black font-semibold'>499.00 dh</p>
                </div>
            </div>

            
            <div className='col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group'>
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg"
                    alt="BEAST SKATE DECK - PINK"
                    className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                />
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493"
                    alt="BEAST SKATE DECK - PINK Hover"
                    className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#1AACDD] text-white text-[10px] me-2 px-4 py-1 rounded-xl font-semibold">
                    NEW
                </span>
                <div className='space-y-2 p-2'>
                    <p className='pt-2 cursor-pointer TextCardHover'>BEAST SKATE DECK - PINK</p>
                    <p className='text-black font-semibold'>499.00 dh</p>
                </div>
            </div>
        </div>

        <div className='w-full px-4 grid grid-cols-4 mb-5'>
            <div className='col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group'>
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg"
                    alt="BEAST SKATE DECK - PINK"
                    className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                />
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493"
                    alt="BEAST SKATE DECK - PINK Hover"
                    className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#17C964] text-white text-[10px] me-2 px-4 py-1 rounded-xl font-semibold">
                    TRENDING
                </span>
                <div className='space-y-2 p-2'>
                    <p className='pt-2 cursor-pointer TextCardHover'>BEAST SKATE DECK - PINK</p>
                    <div className='flex gap-3'>
                        <p className='text-gray-800 line-through'>499.00 dh</p>
                        <p className='text-black font-semibold'>499.00 dh</p>
                        <p className='text-[#E74683] font-semibold text-sm mt-[1px]'>16% OFF</p>
                    </div>
                </div>
            </div>

            
            <div className='col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group'>
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg"
                    alt="BEAST SKATE DECK - PINK"
                    className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                />
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493"
                    alt="BEAST SKATE DECK - PINK Hover"
                    className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#17C964] text-white text-[10px] me-2 px-4 py-1 rounded-xl font-semibold">
                    TRENDING
                </span>
                <div className='space-y-2 p-2'>
                    <p className='pt-2 cursor-pointer TextCardHover'>BEAST SKATE DECK - PINK</p>
                    <p className='text-black font-semibold'>499.00 dh</p>
                </div>
            </div>

            
            <div className='col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group'>
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg"
                    alt="BEAST SKATE DECK - PINK"
                    className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                />
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493"
                    alt="BEAST SKATE DECK - PINK Hover"
                    className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#1AACDD] text-white text-[10px] me-2 px-4 py-1 rounded-xl font-semibold">
                    NEW
                </span>
                <div className='space-y-2 p-2'>
                    <p className='pt-2 cursor-pointer TextCardHover'>BEAST SKATE DECK - PINK</p>
                    <p className='text-black font-semibold'>499.00 dh</p>
                </div>
            </div>

            
            <div className='col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group'>
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg"
                    alt="BEAST SKATE DECK - PINK"
                    className="rounded-lg group-hover:hidden h-[400px] w-full object-cover"
                />
                <img
                    src="https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493"
                    alt="BEAST SKATE DECK - PINK Hover"
                    className="rounded-lg hidden group-hover:block h-[400px] w-full object-cover"
                />
                <span className="absolute !bottom-[90px] right-2 bg-neutral-950 text-white text-[10px] me-2 px-4 py-1 rounded-xl font-semibold">
                    SOLD OUT
                </span>
                <div className='space-y-2 p-2'>
                    <p className='pt-2 cursor-pointer TextCardHover'>BEAST SKATE DECK - PINK</p>
                    <p className='text-black font-semibold'>499.00 dh</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default All;