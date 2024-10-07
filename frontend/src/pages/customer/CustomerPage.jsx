import React, { useEffect, useState } from 'react';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);  // Current page
  const [totalPages, setTotalPages] = useState(1);  // Total pages (you'll calculate this based on total records)

  // Fetch customers for the current page
  const fetchCustomers = (pageNumber) => {
    console.log("Fetching customers for page:", page);
    fetch(`http://localhost:5000/api/customers?page=${pageNumber}&limit=10`)  // Adjust the limit as needed
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.customers);  // Assuming the API returns customers in a "customers" field
        setTotalPages(Math.ceil(data.totalCustomers / 10));  // Adjust to your total customer count
      })
      .catch((error) => console.error('Error fetching customers:', error));
  };

  useEffect(() => {
    fetchCustomers(page);  // Fetch customers when the page changes
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

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

      {/* Pagination */}
      <div className="join mt-6">
        {/* Previous Button */}
        <button
          className={`join-item btn ${page === 1 ? 'btn-disabled' : ''}`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        {/* Page Buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`join-item btn ${page === index + 1 ? 'btn-active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
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
