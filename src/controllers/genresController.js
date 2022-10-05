const db=require('../database/models')

module.exports = {
    list : (req,res) => {
        db.Genre.findAll()
            .then((genres)=>{
                return res.render('genresList',{genres})
            })
            .catch(error => console.log(error))
    },
    new : (req,res) => {

    },
    recommended : (req,res) => {

    },
    detail : (req,res) => {
        db.Genre.findByPk(req.params.id,{
            include : [
                {
                    association: 'movie'
                }
            ]
        })
        .then(genre=> res.render('genresDetail',{genre}))
        .catch(error => console.log(error))
    }
}