const app = require('../../app');
const request = require('supertest');
const BASE_URL = '/api/v1/directors';

const actor = {
	firstName: 'Eduardo',
	lastName: 'Manrique',
	nationality: 'Mexican',
	image: 'https://randomuser.me/api/portraits/men/3.jpg',
	birthday: 'December 4 2001',
};

const directorUpdate = {
	firstName: 'Pedro',
};

let directorId;

test("CREATE -> 'BASE_URL' should return status 200, and res.body.name === actor.name ", async () => {
	const res = await request(app).post(BASE_URL).send(actor);
	directorId = res.body.id;

	expect(res.status).toBe(201);
	expect(res.body.firstName).toBe(actor.firstName);
});

test("GETALL -> 'BASE_URL' should return status 201, and res.body lenght should be 1 ", async () => {
	const res = await request(app).get(BASE_URL);

	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("GETONE -> 'BASE_URL/:id' should return status 201 and res.body.id === directorId  ", async () => {
	const res = await request(app).get(`${BASE_URL}/${directorId}`);

	expect(res.status).toBe(200);
	expect(res.body.id).toBe(directorId);
});

test("UPDATE -> 'BASE_URL/:id' should return status 201 and res.body.firstName === directorUpdate.firstName  ", async () => {
	const res = await request(app)
		.put(`${BASE_URL}/${directorId}`)
		.send(directorUpdate);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(directorUpdate.firstName);
});

test("DELETE -> 'BASE_URL/:id' should return status 204", async () => {
	const res = await request(app).delete(`${BASE_URL}/${directorId}`);

	expect(res.status).toBe(204);
});
