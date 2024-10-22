require('../../models');
const app = require('../../app');
const request = require('supertest');
const BASE_URL = '/api/v1/movies';

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

test("DELETE -> 'BASE_URL/:id' should return status 204", async () => {
	const res = await request(app).delete(`${BASE_URL}/${movieId}`);

	expect(res.status).toBe(204);
});
