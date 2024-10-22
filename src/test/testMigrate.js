require('../models');
const sequelize = require('../utils/connection');

const testMigrate = async () => {
	try {
		sequelize.sync({ force: true });
		console.log(`Database reset ✌️✌️✌️`);
	} catch (error) {
		console.log(error);
	}
};

testMigrate();
