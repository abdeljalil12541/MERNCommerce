"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AllProducts = () => {
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

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-2">
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
    </div>
  );
};

export default AllProducts;