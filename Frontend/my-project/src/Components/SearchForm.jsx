import React from 'react';

const SearchForm = ({ searchParams, setSearchParams }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex space-x-4">
      <input
        type="text"
        name="search"
        value={searchParams.search}
        onChange={handleInputChange}
        placeholder="Search by name or email"
        className="p-2 px-13  border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="ageFilter"
        value={searchParams.ageFilter}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Ages</option>
        <option value="lte25">less than or equal to 25</option>
        <option value="lte50">less than or equal to 50</option>
        <option value="gt50">more than 50</option>
      </select>
    </div>
  );
};

export default SearchForm;