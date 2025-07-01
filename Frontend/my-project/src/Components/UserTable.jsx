import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiMessage, setApiMessage] = useState(null);
  const [searchParams, setSearchParams] = useState({
    search: '',
    ageFilter: '',
  });
  const [debouncedParams, setDebouncedParams] = useState(searchParams);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedParams(searchParams);
      setCurrentPage(1); 
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchParams]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      setApiMessage(null);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage,
          limit: limit,
        });

        if (debouncedParams.search) {
          queryParams.append('search', debouncedParams.search.trim());
        }
        if (debouncedParams.ageFilter) {
          if (debouncedParams.ageFilter === 'lte25') {
            queryParams.append('ageMax', '25');
          } else if (debouncedParams.ageFilter === 'lte50') {
            queryParams.append('ageMax', '50');
          } else if (debouncedParams.ageFilter === 'gt50') {
            queryParams.append('ageMin', '51');
          }
        }

        const response = await fetch(`${BASE_URL}/api/users/get_users?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.data || []);
        setTotalPages(data.totalPages || 1);
        if (data.data.length === 0 && data.message) {
          setApiMessage(data.message);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch users');
        setUsers([]);
        setTotalPages(1);
        setApiMessage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, limit, debouncedParams]);

  const handleSeedUsers = async () => {
    setLoading(true);
    setError(null);
    setApiMessage(null);
    try {
      const response = await fetch(`${BASE_URL}/api/users/post_users`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to seed users');
      }
      setCurrentPage(1);
    } catch (err) {
      setError(err.message || 'Failed to seed users');
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchParams({
      search: '',
      ageFilter: '',
    });
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="ml-64 mt-16 p-6 bg-gray-100 min-h-[calc(100vh-4rem)]">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Users</h2>
      <div className="flex items-center space-x-4 mb-6">
        <SearchForm searchParams={searchParams} setSearchParams={setSearchParams} />
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 "
        >
          Reset Filters
        </button>
        <button
          onClick={handleSeedUsers}
          disabled={loading}
          className="px-10 py-2  bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-200"
        >
          {loading ? 'Creating...' : 'Create 5000 Users'}
        </button>
        
      </div>
      {error && <p className="text-red-900 mb-6 font-medium">{error}</p>}
      {apiMessage && <p className="text-gray-600 mb-6 font-medium">{apiMessage}</p>}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3 text-center text-gray-700 font-semibold">Name</th>
                  <th className="border border-gray-300 p-3 text-center text-gray-700 font-semibold">Email</th>
                  <th className="border border-gray-300 p-3 text-center text-gray-700 font-semibold">Age</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="border border-gray-300 p-3 text-center">{user.name}</td>
                    <td className="border border-gray-300 p-3 text-center">{user.email}</td>
                    <td className="border border-gray-300 p-3 text-center">{user.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-center items-center space-x-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-gray-400 transition-colors duration-200 ml-40"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-gray-400 transition-colors duration-200"
            >
              Next
            </button>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;