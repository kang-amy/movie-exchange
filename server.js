import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

// API to read movies from the database
app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);

	const sql = `SELECT id, name, year, quality FROM movies`;

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

// API to add a review to the database
app.post('/api/addReview', (req, res) => {
	const { userID, movieID, reviewTitle, reviewContent, reviewScore } = req.body;

	let connection = mysql.createConnection(config);

	const sql = `INSERT INTO review (userID, movieID, reviewTitle, reviewContent, reviewScore) 
				 VALUES (?, ?, ?, ?, ?)`;

	const data = [userID, movieID, reviewTitle, reviewContent, reviewScore];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			console.error("Error adding review:", error.message);
			return res.status(500).json({ error: "Error adding review to the database" });
		}

		return res.status(200).json({ success: true });
	});
	connection.end();
});

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

// API to load search results
app.post('/api/search', (req, res) => {
	let { movieTitle, actorName, directorName } = req.body;
	const newMovieTitle = "%" + movieTitle + "%";
	const newActorName = "%" + actorName + "%";
	const newDirectorName = "%" + directorName + "%";

	let connection = mysql.createConnection(config);
	const data = [newDirectorName, newMovieTitle, newActorName];
	const sql = `SELECT DISTINCT movie_name, director_name, reviewContent, reviewScore
	FROM (SELECT movie_id, movie_name, director_name, reviewContent, reviewScore
	FROM (SELECT movie_id, name as movie_name, CONCAT(first_name, " ", last_name) as director_name FROM (Select movie_id, director_id, first_name, last_name
	from directors D
	JOIN movies_directors MD
	ON D.id = MD.director_id WHERE CONCAT(D.first_name, " ", D.last_name) LIKE ?) as joinedMD
	JOIN movies M
	ON M.id = joinedMD.movie_id WHERE M.name LIKE ?) as joinedMDR
	LEFT JOIN review R ON joinedMDR.movie_id = R.movieID) as joinedAll
	JOIN (SELECT CONCAT(first_name, " ", last_name) as actor_name, movie_id
	FROM actors A
	JOIN roles RL
	ON A.id = RL.actor_id) as joinedARL
	ON joinedARL.movie_id = joinedAll.movie_id
	WHERE actor_name LIKE ?`;

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error("Error fetching movies:", error.message);
		}
		console.log(results);
		let string = JSON.stringify(results);
		console.log(string);
		res.send(results);
	});
	connection.end();
});

// API to load user info
app.post('/api/loadUser', (req, res) => {
	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT * FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string)
		res.send(results)
	});
	connection.end();
});

// API to update user info
app.post('/api/updateUser', (req, res) => {
	let connection = mysql.createConnection(config);
	const { firstName, lastName, email, phone, userID } = req.body;

	let sql = `UPDATE user
	SET firstName = ?, lastName = ?, email = ?, phone = ?
	WHERE userID = ?`;
	console.log(sql);
	let data = [firstName, lastName, email, phone, userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
