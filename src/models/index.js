const Actor = require('./Actor');
const Director = require('./Director');
const Genre = require('./Genre');
const Movie = require('./Movie');

Movie.belongsToMany(Actor, { through: 'movieActors' });
Actor.belongsToMany(Movie, { through: 'movieActors' });

Movie.belongsToMany(Director, { through: 'movieDirector' });
Director.belongsToMany(Movie, { through: 'movieDirector' });

Movie.belongsToMany(Genre, { through: 'movieGenre' });
Genre.belongsToMany(Movie, { through: 'movieGenre' });
