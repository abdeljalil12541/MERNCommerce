"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Pagination } from "@nextui-org/react";
import Loader from '@/components/Loader';
import { Goldman } from 'next/font/google';
import { SwipeableDrawer } from '@mui/material';
import { Card, Button, Divider } from "@nextui-org/react";
import { ChevronRight, X, ChevronDown } from "lucide-react";
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

const GoldmanFont = Goldman({
    subsets: ['latin'],
    weight: ['400'],
});

const All = () => {
    const [loader, setLoader] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedSort, setSelectedSort] = useState('Featured');
    const [selectedFilters, setSelectedFilters] = useState({
      size: [],
      color: [],
      productType: []
    });
    const [currentPage, setCurrentPage] = useState(1); // Initial page
    const productsPerPage = 4; // Number of products per page
    const [products, setProducts] = useState([]);


    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const token = localStorage.getItem('token');
          // if (!token) {
          //   throw new Error('No token found, please log in');
          // }

          const response = await api.get('/products', {
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer ${token}`
            }
          });
          console.log('products response: ', response.data);
          setProducts(response.data || []);
        } catch (err) {
          console.log('error while fetching products response...')
        } finally {
          setLoader(false);
        }
      };
      
      fetchProducts();
    }, [])
  

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
    const filteredProducts = products.filter((product) => {
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

    const sizeFilterRef = useRef();
    const filterRef = useRef();
    const colorFilterRef = useRef();
    const productTypeFilterRef = useRef();
    const sortRef = useRef();

    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check which dropdown is open and if click is outside its ref
        if (openDropdown === 'size' && sizeFilterRef.current && !sizeFilterRef.current.contains(event.target)) {
          setOpenDropdown(null);
        }
        
        if (openDropdown === 'color' && colorFilterRef.current && !colorFilterRef.current.contains(event.target)) {
          setOpenDropdown(null);
        }
        
        if (openDropdown === 'productType' && productTypeFilterRef.current && !productTypeFilterRef.current.contains(event.target)) {
          setOpenDropdown(null);
        }
        
        if (openDropdown === 'sort' && sortRef.current && !sortRef.current.contains(event.target)) {
          setOpenDropdown(null);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [openDropdown]); // Add openDropdown as dependency

    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = (open) => () => {
      setDrawerOpen(open);
    };

    // Updated toggleFilter function to handle event propagation
    const toggleFilter = (filterType, value, event) => {
      // Stop event propagation to prevent dropdown from closing
      if (event) {
        event.stopPropagation();
      }
      
      setSelectedFilters(prev => {
        const currentFilters = [...prev[filterType]];
        if (currentFilters.includes(value)) {
          return {
            ...prev,
            [filterType]: currentFilters.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            [filterType]: [...currentFilters, value]
          };
        }
      });
    };

    const Drawer = () => {
      return (
        <Card className="fixed inset-y-0 right-0 w-full max-w-md rounded-none shadow-lg flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-medium">Filter and sort</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">{filteredProducts.length} products</span>
              <Button isIconOnly variant="light" size="sm" onClick={toggleDrawer(false)}>
                <X size={20} />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Filter Options */}
            <div>
              {/* Size */}
              <div className="py-4 px-4 border-b" ref={sizeFilterRef}>
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleDropdown('size')}
                >
                  <span className="font-medium">Size</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-200 ${openDropdown === 'size' ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {openDropdown === 'size' && (
                  <div className="mt-3 pl-2" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{selectedFilters.size.length} selected</span>
                      <Button 
                        size="sm" 
                        variant="light" 
                        className="text-gray-600 hover:text-gray-700 underline h-auto p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFilters(prev => ({...prev, size: []}));
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                    
                    {filterOptions.size.map((option) => (
                      <label
                        key={option}
                        className="flex group items-center py-2 text-sm cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters.size.includes(option)}
                          onChange={(e) => toggleFilter('size', option, e)}
                          className="mr-2 rounded border-gray-300 accent-pink-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className='group-hover:text-gray-800'>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color */}
              <div className="py-4 px-4 border-b" ref={colorFilterRef}>
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleDropdown('color')}
                >
                  <span className="font-medium">Color</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-200 ${openDropdown === 'color' ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {openDropdown === 'color' && (
                  <div className="mt-3 pl-2" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{selectedFilters.color.length} selected</span>
                      <Button 
                        size="sm" 
                        variant="light" 
                        className="text-gray-600 hover:text-gray-700 underline h-auto p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFilters(prev => ({...prev, color: []}));
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                    
                    {filterOptions.color.map((option) => (
                      <label
                        key={option}
                        className="flex group items-center py-2 text-sm cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters.color.includes(option)}
                          onChange={(e) => toggleFilter('color', option, e)}
                          className="mr-2 rounded border-gray-300 accent-pink-500"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className='group-hover:text-gray-800'>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Product type */}
              <div className="py-4 px-4 border-b" ref={productTypeFilterRef}>
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleDropdown('productType')}
                >
                  <span className="font-medium">Product type</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-200 ${openDropdown === 'productType' ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {openDropdown === 'productType' && (
                  <div className="mt-3 pl-2" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{selectedFilters.productType.length} selected</span>
                      <Button 
                        size="sm" 
                        variant="light" 
                        className="text-gray-600 hover:text-gray-700 underline h-auto p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFilters(prev => ({...prev, productType: []}));
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                    
                    {filterOptions.productType.map((option) => (
                      <label
                        key={option.name}
                        className="flex items-center group justify-between py-2 text-sm cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="group-hover:text-gray-800 flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters.productType.includes(option.name)}
                            onChange={(e) => toggleFilter('productType', option.name, e)}
                            className="mr-2 rounded border-gray-300 accent-pink-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span>{option.name}</span>
                        </div>
                        <span className="text-gray-500">({option.count})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort by */}
              <div className="py-4 px-4" ref={sortRef}>
                <div className="flex flex-col">
                  <span className="font-medium mb-2">Sort by:</span>
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
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-sm py-1 z-10" onClick={(e) => e.stopPropagation()}>
                        {sortOptions.map((option) => (
                          <button
                            key={option}
                            onClick={(e) => {
                              e.stopPropagation();
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
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t flex justify-between">
            <Button variant="light" onPress={resetFilters}>
              Remove all
            </Button>
            <Button onPress={toggleDrawer(false)} color="primary" className="bg-pink-500">
              APPLY
            </Button>
          </div>
        </Card>
      );
    };

    const [openDesktopDropdown, setOpenDesktopDropdown] = useState(null);
    const toggleDesktopDropdown = (name) => {
      setOpenDesktopDropdown(openDesktopDropdown === name ? null : name);
    };
    
    const desktopFilterRef = useRef(null);
    const desktopSortRef = useRef(null);
    const desktopSizeFilterRef = useRef(null);
    const desktopColorFilterRef = useRef(null);
    const desktopProductTypeFilterRef = useRef(null);
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check which dropdown is open and if click is outside its ref
        if (openDesktopDropdown === 'size' && desktopSizeFilterRef.current && !desktopSizeFilterRef.current.contains(event.target)) {
          setOpenDesktopDropdown(null);
        }
        
        if (openDesktopDropdown === 'color' && desktopColorFilterRef.current && !desktopColorFilterRef.current.contains(event.target)) {
          setOpenDesktopDropdown(null);
        }
        
        if (openDesktopDropdown === 'productType' && desktopProductTypeFilterRef.current && !desktopProductTypeFilterRef.current.contains(event.target)) {
          setOpenDesktopDropdown(null);
        }
        
        if (openDesktopDropdown === 'sort' && desktopSortRef.current && !desktopSortRef.current.contains(event.target)) {
          setOpenDesktopDropdown(null);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [openDesktopDropdown]); // Add openDesktopDropdown as dependency


    const router = useRouter();

    const handleProductClick = (product) => {
      setLoader(true);
      try {
        sessionStorage.setItem('currentProduct', JSON.stringify(product));

        router.push(`/products/${product.slug}`);
      } catch (err) {
        console.log('error clicking to product: ', err.message);
      } finally {
        // setLoader(false);
      }
    };

    return (
      <div className="w-full bg-white px-2">
        {/* Swipeable Drawer */}
        <SwipeableDrawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {Drawer()}
        </SwipeableDrawer>
          {/* Desktop Filters Section */}
          <div className="hidden lg:block mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div ref={desktopFilterRef} className={`${GoldmanFont.className} text-gray-500 flex items-center gap-4`}>
                <span className="text-sm font-medium">Filter:</span>
                
                {/* Filter Dropdowns */}
                {Object.entries(filterOptions).map(([filter, options]) => (
                  <div key={filter} className="relative" ref={
                    filter === 'size' ? desktopSizeFilterRef : 
                    filter === 'color' ? desktopColorFilterRef : 
                    filter === 'productType' ? desktopProductTypeFilterRef : null
                  }>
                    <button
                      onClick={() => toggleDesktopDropdown(filter)}
                      className="flex items-center gap-2 text-sm capitalize hover:text-gray-600"
                    >
                      {filter === 'productType' ? 'Product type' : filter}
                      <ChevronDown className={`w-4 h-4 mt-1 transition-transform duration-200 ${
                        openDesktopDropdown === filter ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {openDesktopDropdown === filter && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-sm py-1 z-10">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span>{selectedFilters[filter].length} selected</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFilters(prev => ({...prev, [filter]: []}));
                              }}
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
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="group-hover:text-gray-800 flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[filter].includes(option.name)}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    toggleFilter(filter, option.name, e);
                                  }}
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
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="checkbox"
                                checked={selectedFilters[filter].includes(option)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  toggleFilter(filter, option, e);
                                }}
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
              <div ref={desktopSortRef} className={`${GoldmanFont.className} text-gray-500 flex items-center gap-2`}>
                <span className="text-sm">Sort by:</span>
                <div className="relative">
                  <button
                    onClick={() => toggleDesktopDropdown('sort')}
                    className="flex items-center gap-2 text-sm hover:text-gray-600"
                  >
                    {selectedSort}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      openDesktopDropdown === 'sort' ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {openDesktopDropdown === 'sort' && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-sm py-1 z-10">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSort(option);
                            toggleDesktopDropdown('sort');
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
                <span className="text-sm text-gray-500 font-sans ml-4">{filteredProducts.length} products</span>
              </div>
            </div>
          </div>

          <div className="lg:hidden mx-auto px-6 py-4">
            <div className='flex justify-between'>
              <div onClick={toggleDrawer(true)} className='flex group cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon w-6 icon-filter" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M4.833 6.5a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0M4.05 7H2.5a.5.5 0 0 1 0-1h1.55a2.5 2.5 0 0 1 4.9 0h8.55a.5.5 0 0 1 0 1H8.95a2.5 2.5 0 0 1-4.9 0m11.117 6.5a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0M13.5 11a2.5 2.5 0 0 1 2.45 2h1.55a.5.5 0 0 1 0 1h-1.55a2.5 2.5 0 0 1-4.9 0H2.5a.5.5 0 0 1 0-1h8.55a2.5 2.5 0 0 1 2.45-2"></path></svg>
                <span className='ml-2 group-hover:underline'>Filter and sort</span>
              </div>

              <p className='text-gray-500 font-sans text-sm pt-[2px]'> {filteredProducts.length} products </p>
            </div>
          </div>

          {!loader && 
            currentPageProducts.length === 0 ? (
            <div className='w-full container mx-auto text-center mt-4'>No products match the selected filters.</div>
            ) : (
              ''
            )
          }

          <div className="w-full px-4 grid grid-cols-4 mb-5 mt-4">
              {currentPageProducts.length > 0 && (
                  currentPageProducts.map((product, index) => (
                      <div onClick={() => {handleProductClick(product)}} key={product._id} className={`${GoldmanFont.className} col-span-4 sm:col-span-2 md:col-span-1 CardHover relative mx-1 cursor-pointer h-[480px] group`}>
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
                                  <p className="text-gray-800 line-through">{product?.regularPrice?.toFixed(2)} dh</p>
                                  <p className="text-black ">{product?.currentPrice?.toFixed(2)} dh</p>
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