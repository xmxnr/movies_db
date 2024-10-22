require('../../models');
const app = require('../../app');
const request = require('supertest');
const BASE_URL = '/api/v1/movies';

let actorId;
let directorId;
let genreId;

beforeAll(async () => {
	const actor = {
		firstName: 'Eduardo',
		lastName: 'Manrique',
		nationality: 'Mexican',
		image: 'https://randomuser.me/api/portraits/men/3.jpg',
		birthday: 'December 4',
	};

	const director = {
		firstName: 'Eduardo',
		lastName: 'Manrique',
		nationality: 'Mexican',
		image: 'https://randomuser.me/api/portraits/men/3.jpg',
		birthday: 'December 4 2001',
	};

	const genre = {
		name: 'Horror',
	};

	//Post actor
	const resActor = await request(app).post('/api/v1/actors').send(actor);

	actorId = resActor.body.id;

	//Post director
	const resDirector = await request(app)
		.post('/api/v1/directors')
		.send(director);

	directorId = resDirector.body.id;

	//Post genre
	const resGenre = await request(app).post('/api/v1/genres').send(genre);

	genreId = resGenre.body.id;
});

afterAll(async () => {
	//Delete actor
	await request(app).delete(`${'/api/v1/actors'}/${actorId}`);

	//Delete director
	await request(app).delete(`${'/api/v1/directors'}/${directorId}`);

	//Delete genre
	await request(app).delete(`${'/api/v1/genres'}/${genreId}`);
});

const movie = {
	name: 'American History X',
	image: 'hola1',
	synopsis: 'This is a synopsis',
	releaseYear: 2001,
};

const movieUpdate = {
	name: 'Star Wars',
};

let movieId;

test("CREATE -> 'BASE_URL' should return status 201 and res.body.name should be the same as movie.name", async () => {
	const res = await request(app).post(BASE_URL).send(movie);
	movieId = res.body.id;

	expect(res.status).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.name).toBe(movie.name);
});

test("GETALL -> 'BASE_URL' should return status 200 and res.body length has to be 1 ", async () => {
	const res = await request(app).get(BASE_URL);

	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
	expect(res.body[0].name).toBe(movie.name);
});

test("GETONE -> 'BASE_URL/:id' should return status 200 and res.body.id === movieId", async () => {
	const res = await request(app).get(`${BASE_URL}/${movieId}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.id).toBe(movieId);
});

test("UPDATE -> 'BASE_URL/:id' should return status 200 and res.body.name === movieUpdate.name", async () => {
	const res = await request(app)
		.put(`${BASE_URL}/${movieId}`)
		.send(movieUpdate);

	expect(res.status).toBe(200);
	expect(res.body.name).toBe(movieUpdate.name);
});

test("POST/:id/actors-> 'BASE_URL/:id/actors', should return status code 200 and res.body has to be defined", async () => {
	const res = await request(app)
		.post(`${BASE_URL}/${movieId}/actors`)
		.send([actorId]);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body[0].movieActors.actorId).toBe(actorId);
});

test("POST/:id/directors -> 'BASE_URL/actors', should return status code 200 and res.body has to be defined", async () => {
	const res = await request(app)
		.post(`${BASE_URL}/${movieId}/directors`)
		.send([directorId]);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body[0].movieDirector.directorId).toBe(directorId);
});

test("POST/:id/genres -> 'BASE_URL/genres', should return status code 200 and res.body has to be defined", async () => {
	const res = await request(app)
		.post(`${BASE_URL}/${movieId}/genres`)
		.send([genreId]);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body[0].movieGenre.genreId).toBe(genreId);
});

test("DELETE -> 'BASE_URL/:id' should return status 204", async () => {
	const res = await request(app).delete(`${BASE_URL}/${movieId}`);

	expect(res.status).toBe(204);
});
