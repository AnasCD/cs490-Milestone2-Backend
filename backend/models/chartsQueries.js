/*SQL queries to fetch data */

import db from '../db/connectMySql.js';


export const getCustomersPaginated = (page, limit, callback) => {
    const offset = (page - 1) * limit;
    const query = `
        SELECT customer_id, store_id, first_name, last_name, active
        FROM sakila.customer
        LIMIT ? OFFSET ?
    `;
    console.log(`Executing SQL query: ${query}`);

    db.query(query, [limit, offset], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        console.log(`Query result:`, result);
        callback(null, result);
    });
};

export const getTop5RentedMovies = (callback) => {
    const query = 'SELECT * FROM top_5_rented_films';

    db.query(query, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};


export const getTop5Actors = (callback) => {
    const query = 'SELECT * FROM top5actors';

    db.query(query, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

export const getMovieDetailsById = (id, callback) => {
    const query = `
    SELECT 
        film_id, 
        title,
        description, 
        release_year, 
        rental_duration, 
        rental_rate, 
        length, 
        replacement_cost, 
        rating, 
        special_features, 
        last_update 
    FROM sakila.film 
    WHERE film_id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result[0]);
    });
};

export const getActorDetailsById = (id, callback) => {
    const query = 'SELECT actor_id, first_name, last_name FROM sakila.actor WHERE actor_id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching actor details from database:', err);
            return callback(err, null);
        }

        if (result.length === 0) {
            console.log('No actor found with that ID.');
            return callback(null, null);  // Return null if no actor found
        }

        callback(null, result[0]);
    });
};


export const getTop5MoviesByActor = (actorId, callback) => {
    const query = `
        SELECT f.film_id, f.title, COUNT(r.rental_id) AS rentals
        FROM sakila.film f
        JOIN sakila.film_actor fa ON f.film_id = fa.film_id
        JOIN sakila.inventory i ON f.film_id = i.film_id
        JOIN sakila.rental r ON r.inventory_id = i.inventory_id
        WHERE fa.actor_id = ?
        GROUP BY f.film_id
        ORDER BY rentals DESC
        LIMIT 5;
    `;

    db.query(query, [actorId], (err, result) => {
        if (err) {
            console.error("Error fetching top 5 movies by actor:", err);
            return callback(err, null);
        }
        callback(null, result);
    });
};


