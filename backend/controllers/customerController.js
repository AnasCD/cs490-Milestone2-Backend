import { getCustomersPaginated } from "../models/chartsQueries.js";

export const getCustomers = (req, res) => {
//console.log("Fetching customers:");
  const page = parseInt(req.query.page) || 1;  // Default to page 1
  const limit = parseInt(req.query.limit) || 10;  // Default to 10 customers per page

  getCustomersPaginated(page, limit, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch customers" });
    }
    res.json(result);
  });
};