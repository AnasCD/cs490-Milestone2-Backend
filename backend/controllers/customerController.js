import { getCustomersPaginated, searchCustomers } from "../models/chartsQueries.js";

export const getCustomers = (req, res) => {
  const page = parseInt(req.query.page) || 1;  // Default to page 1
  const limit = parseInt(req.query.limit) || 10;  // Default to 10 customers per page

  getCustomersPaginated(page, limit, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch customers" });
    }
    res.json(result);
  });
};

export const searchCustomerByQuery = (req, res) => {
  const searchQuery = req.query.search || "";
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;

  if (!searchQuery) {
    return res.status(400).json({ error: "Search query is required" });
  }


  searchCustomers(searchQuery, limit, offset, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to search customers" });
    }
    res.json(result);
  });
};
