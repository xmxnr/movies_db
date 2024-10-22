const app = require('../../app');
const request = require('supertest');
const BASE_URL = '/api/v1/actors';

const actor = {
	firstName: 'Eduardo',
	lastName: 'Manrique',
	nationality: 'Mexican',
	image: 'https://randomuser.me/api/portraits/men/3.jpg',
	birthday: 'December 4',
};

const actorUpdate = {
	birthday: 'December 4 2001',
};

let actorId;

test("CREATE -> 'BASE_URL' should return status 201 and actor.firstName === req.body.firstName", async () => {
	const res = await request(app).post(BASE_URL).send(actor);
	actorId = res.body.id;

	expect(res.status).toBe(201);
	expect(res.body).toBeDefined();
	expect(res.body.firstName).toBe(actor.firstName);
});

test("GETALL -> 'BASE_URL' should return status 200 and res.body lenght has to been 1", async () => {
	const res = await request(app).get(BASE_URL);
	expect(res.status).toBe(200);
	expect(res.body).toHaveLength(1);
});

test("GETONE -> 'BASE_URL/:id' should return status 200 and res.body.id === actorId", async () => {
	const res = await request(app).get(`${BASE_URL}/${actorId}`);

	expect(res.status).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.body.id).toBe(actorId);
});

test("UPDATE -> 'BASE_URL/:id' should return status 200 and res.body.birthday === actorUpdate.birthday", async () => {
	const res = await request(app)
		.put(`${BASE_URL}/${actorId}`)
		.send(actorUpdate);

	expect(res.status).toBe(200);
	expect(res.body.birthday).toBe(actorUpdate.birthday);
});

test("DELETE -> 'BASE_URL/:id' should return status 204", async () => {
	const res = await request(app).delete(`${BASE_URL}/${actorId}`);

	expect(res.status).toBe(204);
});
