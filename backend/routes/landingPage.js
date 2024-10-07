/*Defines the route for the landing page, which
displayes top 5 rented films and top 5 actors*/

import express from "express";
import { getLandingPageData } from "../controllers/landingController.js";

const router = express.Router();
router.get("/", getLandingPageData);

/*
import { films } from "../controllers/landingController.js";
import { customer } from "../controllers/landingController.js";
router.post("/", landing);

router.post("/films", films);

router.post("/customer", customer);
*/
export default router;