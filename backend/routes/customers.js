import express from "express";
import { getCustomers } from "../controllers/customerController.js";  // Import controller

const router = express.Router();

// Route to fetch paginated customers
router.get("/:id", getCustomers);

export default router;
