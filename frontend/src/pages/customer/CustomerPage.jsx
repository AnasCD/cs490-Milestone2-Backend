import React, { useEffect, useState } from 'react';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = (pageNumber, search) => {
    let url;
    
    if (search) {
      url = `http://localhost:5000/api/customers/search?search=${search}&page=${pageNumber}&limit=10`;
    } else {
      url = `http://localhost:5000/api/customers?page=${pageNumber}&limit=10`;
    }
    
    console.log("Fetching customers from URL:", url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.customers || []);
        setTotalPages(Math.ceil(data.totalCustomers / 10));
      })
      .catch((error) => console.error('Error fetching customers:', error));
  };

  useEffect(() => {
    fetchCustomers(page, searchTerm);  // Fetch customers when the page or search term changes
  }, [page, searchTerm]);

  const handlePageChange = (newPage) => {
    setPage(newPage);  // Update the page number and trigger fetch
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);  // Update the search term when the user types
    setPage(1);  // Reset to page 1 when searching
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Search by ID, First Name, Last Name"
          value={searchTerm}
          onChange={handleSearchChange}  // Update the search term on change
        />
      </div>

      
      <ul className="list-disc pl-6">
        {customers.map((customer) => (
          <li key={customer.customer_id} className="mb-2">
            <p>
              <strong>ID:</strong> {customer.customer_id} <br />
              <strong>Store ID:</strong> {customer.store_id} <br />
              <strong>Name:</strong> {customer.first_name} {customer.last_name} <br />
              <strong>Active:</strong> {customer.active ? 'Yes' : 'No'}
            </p>
          </li>
        ))}
      </ul>

      <div className="join mt-6">
        <button
          className={`join-item btn ${page === 1 ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`join-item btn ${page === index + 1 ? 'btn-active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}


        <button
          className={`join-item btn ${page === totalPages ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerPage;