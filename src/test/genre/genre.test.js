const app = require('../../app');
const request = require('supertest');
require('../../models');
const BASE_URL = '/api/v1/genres';

const genre = {
	name: 'Horror',
};

const updateGenre = {
	name: 'Comedy',
};

let genreId;

test("CREATE -> 'BASE_URL' should return status 201", async () => {
	const res = await request(app).post(BASE_URL).send(genre);
	genreId = res.body.id;

	expect(res.status).toBe(201);
	expect(res.body.name).toBe(genre.name);
});

test("GETALL -> 'BASE_URL' should return status 200, and lenght should be 1", async () => {
	const res = await request(app).get(BASE_URL);

	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("GETONE -> 'BASE_URL/:id' should return status 201 and res.body.id === genreId", async () => {
	const res = await request(app).get(`${BASE_URL}/${genreId}`);

	expect(res.status).toBe(200);
	expect(res.body.id).toBe(genreId);
});

test("UPDATE -> 'BASE_URL/:id' should return status 201 and res.body.name === genreUpdate.name", async () => {
	const res = await request(app)
		.put(`${BASE_URL}/${genreId}`)
		.send(updateGenre);

	expect(res.status).toBe(200);
	expect(res.body.name).toBe(updateGenre.name);
});

test("DELETE -> 'BASE_URL/:id' should return status 204", async () => {
	const res = await request(app).delete(`${BASE_URL}/${genreId}`);

	expect(res.status).toBe(204);
});
