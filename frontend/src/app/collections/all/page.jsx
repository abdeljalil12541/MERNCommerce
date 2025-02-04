"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Pagination } from "@nextui-org/react";
import Loader from '@/components/Loader';
import { Goldman } from 'next/font/google';


const GoldmanFont = Goldman({
    subsets: ['latin'],
    weight: ['400'],
});

const All = () => {
    const [loader, setLoader] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedSort, setSelectedSort] = useState('Featured');
    const [selectedFilters, setSelectedFilters] = useState({
      size: [],
      color: [],
      productType: []
    });
    const [currentPage, setCurrentPage] = useState(1); // Initial page
    const productsPerPage = 4; // Number of products per page
  
    const filterRef = useRef(null);
    const sortRef = useRef(null);


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
  

    const productsAll = [
      { title: 'BEAST SKATE DECK - PINK', size: 'S', color: 'Red', productType: 'Accessoiries', regularPrice: 499, currentPrice: 459, discount: 16, status: 'NEW', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-03-15', ifBestSeller: true },
      { title: 'BEAST SKATE DECK - PINK', size: 'S', color: 'Blue', productType: 'Flannel Pants', regularPrice: 499, currentPrice: 459, discount: 16, status: 'NEW', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-02-28', ifBestSeller: false },
      { title: 'BEAST SKATE DECK - BLUE', size: 'S', color: 'Red', productType: 'Cap', regularPrice: 499, currentPrice: 449, discount: 10, status: 'DEAL', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-01-15', ifBestSeller: true },
      { title: 'BEAST SKATE DECK - GREEN', size: 'S', color: 'Black', productType: 'Backpack', regularPrice: 499, currentPrice: 399, discount: 20, status: 'TRENDING', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-03-01', ifBestSeller: true },
      { title: 'BEAST SKATE DECK - BLUE', size: 'S', color: 'Yellow', productType: 'Accessoiries', regularPrice: 499, currentPrice: 449, discount: 10, status: 'DEAL', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-02-15', ifBestSeller: false },
      { title: 'BEAST SKATE DECK - RED', size: 'S', color: 'Red', productType: 'Flannel Pants', regularPrice: 499, currentPrice: 479, discount: 4, status: 'SOLD OUT', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-01-30', ifBestSeller: true },
      { title: 'BEAST SKATE DECK - GREEN', size: 'S', color: 'Blue', productType: 'Accessoiries', regularPrice: 499, currentPrice: 399, discount: 20, status: 'TRENDING', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-03-10', ifBestSeller: false },
      { title: 'BEAST SKATE DECK - GREEN', size: 'S', color: 'Red', productType: 'Hoodies', regularPrice: 499, currentPrice: 399, discount: 20, status: 'TRENDING', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-02-20', ifBestSeller: true },
      { title: 'BEAST SKATE DECK - RED', size: 'S', color: 'Blue', productType: 'Accessoiries', regularPrice: 499, currentPrice: 479, discount: 4, status: 'SOLD OUT', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-02-10', ifBestSeller: false },
      { title: 'BEAST SKATE DECK - RED', size: 'S', color: 'Yellow', productType: 'Lunch Bag', regularPrice: 499, currentPrice: 479, discount: 4, status: 'SOLD OUT', mainSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0006_SBpinkdeckpanther.jpg', hoverSrc: 'https://mrbeast.store/cdn/shop/files/MB0121-PNK_0002_SBpinkdecktop.jpg?v=1721252530&width=493', date: '2024-01-20', ifBestSeller: true }
    ];


    const handlePagination = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const sortFilteredProducts = (filteredProducts) => {
      switch (selectedSort) {
        case 'Featured':
          return filteredProducts;
        case 'Best selling':
          return [...filteredProducts].sort((a, b) => (b.ifBestSeller === a.ifBestSeller) ? 0 : b.ifBestSeller ? 1 : -1);
        case 'Alphabetically, A-Z':
          return [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
        case 'Alphabetically, Z-A':
          return [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
        case 'Price, low to high':
          return [...filteredProducts].sort((a, b) => a.currentPrice - b.currentPrice);
        case 'Price, high to low':
          return [...filteredProducts].sort((a, b) => b.currentPrice - a.currentPrice);
        case 'Date, old to new':
          return [...filteredProducts].sort((a, b) => new Date(a.date) - new Date(b.date));
        case 'Date, new to old':
          return [...filteredProducts].sort((a, b) => new Date(b.date) - new Date(a.date));
        default:
          return filteredProducts;
      }
    };

    // Filter the product list based on selected filters
    const filteredProducts = productsAll.filter((product) => {
      const matchesSize =
        selectedFilters.size.length === 0 || selectedFilters.size.includes(product.size);
      const matchesColor =
        selectedFilters.color.length === 0 || selectedFilters.color.includes(product.color);
      const matchesProductType =
        selectedFilters.productType.length === 0 ||
        selectedFilters.productType.includes(product.productType);

      return matchesSize && matchesColor && matchesProductType;
    });

    // Apply sorting to the filtered products
    const sortedFilteredProducts = sortFilteredProducts(filteredProducts);

    // Pagination logic: Determine the products to display based on currentPage
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentPageProducts = sortedFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Update total pages based on sorted and filtered products
    const totalPages = Math.ceil(sortedFilteredProducts.length / productsPerPage);

    // Handle pagination visibility
    const isPaginationVisible = sortedFilteredProducts.length > productsPerPage;
    

    return (
      <div className="w-full bg-white px-2">
          <div className="mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div ref={filterRef} className={`${GoldmanFont.className} text-gray-500 flex items-center gap-4`}>
                    <span className="text-sm font-medium">Filter:</span>
                    
                    {/* Filter Dropdowns */}
                    {Object.entries(filterOptions).map(([filter, options]) => (
                    <div key={filter} className="relative">
                        <button
                        onClick={() => toggleDropdown(filter)}
                        className="flex items-center gap-2 text-sm capitalize hover:text-gray-600"
                        >
                        {filter === 'productType' ? 'Product type' : filter}
                        <ChevronDown className={`w-4 h-4 mt-1 transition-transform duration-200 ${
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
                                className="flex items-center group justify-between px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                                >
                                <div className="group-hover:text-gray-800 flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={selectedFilters[filter].includes(option.name)}
                                      onChange={() => toggleFilter(filter, option.name)}
                                      className="mr-2 rounded border-gray-300 accent-pink-500"
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
                                className="flex group items-center px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                                >
                                <input
                                    type="checkbox"
                                    checked={selectedFilters[filter].includes(option)}
                                    onChange={() => toggleFilter(filter, option)}
                                    className="mr-2 rounded border-gray-300 accent-pink-500"
                                />
                                <span className='group-hover:text-gray-800'>{option}</span>
                                </label>
                            ))
                            )}
                        </div>
                        )}
                    </div>
                    ))}
                </div>

                {/* Sort Section */}
                <div ref={sortRef} className={`${GoldmanFont.className} text-gray-500 flex items-center gap-2`}>
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
                            <span className='hover:text-gray-800'>{option}</span>
                            </button>
                        ))}
                        </div>
                    )}
                    </div>
                    <span className="text-sm text-gray-500 ml-4">{filteredProducts.length} products</span>
                </div>
              </div>
          </div>

          {currentPageProducts.length === 0 ? (
            <div className='w-full container mx-auto text-center mt-4'>No products match the selected filters.</div>
          ) : (
            ''
          )}

          <div className="w-full px-4 grid grid-cols-4 mb-5">
              {currentPageProducts.length > 0 && (
                  currentPageProducts.map((product, index) => (
                      <div key={index} className={`${GoldmanFont.className} col-span-4 sm:col-span-2 md:col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group`}>
                          <div className="relative w-full h-[400px]">
                              <img
                                  src={product.mainSrc}
                                  alt={product.title}
                                  className="rounded-lg absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                              />
                              <img
                                  src={product.hoverSrc}
                                  alt={`${product.title} Hover`}
                                  className="rounded-lg absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                              />
                          </div>
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

          <div className="mb-9 flex flex-wrap justify-center w-full gap-4 items-center">
            <Pagination
              hidden={!isPaginationVisible}
              className={`${GoldmanFont.className}`}
              initialPage={currentPage}
              showControls
              showShadow
              total={totalPages} // Use totalPages from filtered and sorted products
              variant="faded"
              onChange={handlePagination}
            />
          </div>

        {loader && <Loader />}   
      </div>
    );
};

export default All;