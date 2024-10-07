/*Defines the routes for actor related ops */

import express from "express";
import { getActorDetails } from "../controllers/actorsController.js";

const router = express.Router();

// Route to get actor details by ID
router.get("/:id", getActorDetails);

export default router;
