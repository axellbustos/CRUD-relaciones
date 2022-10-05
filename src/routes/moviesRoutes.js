const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const moviesValidator=require("../validations/moviesValidator")

//VIEWS
router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recommended);
router.get('/movies/detail/:id', moviesController.detail);

//LOAD
router.get('/movies/add', moviesController.add);
router.post('/movies/create', moviesValidator, moviesController.create);

//EDIT
router.get('/movies/edit/:id', moviesController.edit);
router.put('/movies/update/:id', moviesValidator, moviesController.update);

//DELETE
router.get('/movies/delete/:id', moviesController.delete);
router.delete('/movies/delete/:id', moviesController.destroy);


module.exports = router;