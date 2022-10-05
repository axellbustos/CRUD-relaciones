const db = require('../database/models')
const moment = require('moment')
const { validationResult } = require('express-validator')
module.exports = {
    //LIST ALL MOVIES
    list: (req, res) => {
        db.Movie.findAll()
            .then((movies) => {
                return res.render('moviesList', { movies })
            })
            .catch(error => console.log(error))
    },
    //NEWEST MOVIES
    new: (req, res) => {
        db.Movie.findAll({
            order: [
                ["release_date", "DESC"]
            ]
        })
            .then((movies) => {
                return res.render("newestMovies", { movies })
            })
    },

    //RECOMMENDED MOVIES
    recommended: (req, res) => {
        db.Movie.findAll({
            order: [
                ["release_date", "DESC"]
            ],
            limit: 5
        }
        )
            .then((movies) => {
                return res.render("recommendedMovies", { movies })
            })
    },

    //DETAIL OF MOVIES
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id,{
            include:[
                {
                    association: 'genre'
                },
                {
                    association:'actor'
                }
            ]
        })
            .then(movie => res.render('moviesDetail', { movie }))
            .catch(error => console.log(error))
    },

    //LOAD NEW MOVIE
    add: (req, res) => {
        db.Genre.findAll({
            order: ["name"]
        })
            .then((genres) => { res.render("moviesAdd", { genres }) })
            .catch(errors => console.log(errors))
    },
    create: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            const { title } = req.body;
            db.Movie.create({
                ...req.body,
                title: title.trim()
                //COMPLETAR
            })
                .then(movie => {
                    console.log(movie),
                        res.redirect('/movies/detail/' + movie.id)
                })
                .catch(errors => console.log(errors))
        } else {
            db.Genre.findAll({
                order: ["name"]
            })
                .then((genres) => { res.render("moviesAdd", { genres, errors: errors.mapped(), old: req.body }) })
                .catch(errors => console.log(errors))
        }
    },

    //EDIT MOVIE
    edit: (req, res) => {

        const { } = req.body;
        let genres = db.Genre.findAll({
            order: ["name"]
        })
        let movie = db.Movie.findByPk(req.params.id)

        Promise.all([genres, movie])
            .then(([genres, movie]) => {
                return res.render("moviesEdit", {
                    genres,
                    Movie: movie,
                    moment: moment
                })
            })
            .catch(errors => console.log(errors))

    },
    update: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            const { title } = req.body;
            db.Movie.update(
                {
                    ...req.body,
                    title: title.trim()
                },
                {
                    where: { id: req.params.id }
                }
            )
                .then(response => {
                    console.log(response)
                    return res.redirect("/movies/detail/" + req.params.id)
                })
                .catch(errors => console.log(errors))
        } else {
            let genres = db.Genre.findAll({
                order: ["name"]
            })
            let movie = db.Movie.findByPk(req.params.id)
            Promise.all([genres, movie])
                .then(([genres, movie]) => { res.render("moviesEdit", { genres, errors: errors.mapped(), Movie: movie, moment: moment }) })
                .catch(errors => console.log(errors))
        }
    },

    //DELETE MOVIE
    delete: (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => res.render("moviesDelete", {
                movie: movie
            }))
            .catch(errors => console.log(errors))
    },
    destroy: (req, res) => {
        db.Movie.destroy({
            where: { id: req.params.id }
        })
            .then(result => {
                res.redirect('/movies')
            })
            .catch(errors => console.log(errors))
    }
}