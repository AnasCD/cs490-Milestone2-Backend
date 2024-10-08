import express from "express";
import { getFilmDetails } from "../controllers/filmsController.js";

const router = express.Router();
router.get("/:id", getFilmDetails);

export default router;