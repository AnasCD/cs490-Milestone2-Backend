import { getActorDetailsById, getTop5MoviesByActor } from "../models/chartsQueries.js";

export const getActorDetails = (req, res) => {
    const actorId = req.params.id;

    getActorDetailsById(actorId, (err, actorDetails) => {
        if (err) {
            console.error('Error fetching actor details:', err);
            return res.status(500).json({ error: "Failed to fetch actor details" });
        }

        if (!actorDetails) {
            console.error('Actor details not found');
            return res.status(404).json({ error: "Actor not found" });
        }

        // Fetch top 5 movies for the actor
        getTop5MoviesByActor(actorId, (err, topMovies) => {
            if (err) {
                console.error('Error fetching top 5 movies:', err);
                return res.status(500).json({ error: "Failed to fetch top 5 movies for the actor" });
            }

            /*
            console.log('Actor Details:', actorDetails);
            console.log('Top Movies:', topMovies);
            */
            // Send both actor details and top 5 movies as JSON
            res.json({
                actorDetails,
                topMovies
            });
        });
    });
};
