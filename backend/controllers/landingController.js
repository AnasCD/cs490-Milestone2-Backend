/*Logic for handling landing page, fetching top 5
rented films and top 5 actors and passing this data
to the view*/

import { getTop5RentedMovies, getTop5Actors } from "../models/chartsQueries.js";

export const getLandingPageData = (req, res) => {
    getTop5RentedMovies((err, filmsResult) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch top 5 rented films" });
        }

        getTop5Actors((err, actorsResult) => {
            if (err) {
                return res.status(500).json({ error: "Failed to fetch top 5 actors" });
            }

            res.json({
                top5Films: filmsResult,
                top5Actors: actorsResult
            });
        });
    });
};
