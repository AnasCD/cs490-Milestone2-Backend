import express from "express";


import { getFilms, searchFilmByQuery } from "../controllers/filmPageController.js";
const router = express.Router();

router.get("/", getFilms);
router.get("/search", searchFilmByQuery);


export default router;