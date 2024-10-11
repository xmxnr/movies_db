const express = require('express');
const routerGenre = require('./genre.router');
const router = express.Router();

// colocar las rutas aquí
router.use('./genres', routerGenre);

module.exports = router;
