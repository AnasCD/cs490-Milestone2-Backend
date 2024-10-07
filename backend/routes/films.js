/*defines routes for film related ops*/

import express from "express";
import { getFilmDetails } from "../controllers/filmsController.js";

const router = express.Router();

// Route to get film details by ID
router.get("/:id", getFilmDetails);

export default router;
