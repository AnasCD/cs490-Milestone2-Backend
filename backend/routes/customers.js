import express from "express";
import { getCustomers } from "../controllers/customerController.js";
import { searchCustomerByQuery } from "../controllers/customerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/search", searchCustomerByQuery);

export default router;