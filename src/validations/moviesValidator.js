const { check } = require('express-validator');

module.exports =[

    check('title')
     .notEmpty().withMessage('Este campo es obligatorio'),
     
     check('rating')
     .notEmpty().withMessage('Este campo es obligatorio').bail(),
     //.isNumeric({no_symbols: true}).withMessage('Éste campo solo acepta numeros').bail()
     //.isInt({min: 0, max: 10}).withMessage('Debe ingresar un valor valido entre 0 y 10'),

     check('awards')
     .notEmpty().withMessage('Este campo es obligatorio').bail()
     .isNumeric({no_symbols: true}).withMessage('Éste campo solo acepta numeros'),

     check('release_date')
     .notEmpty().withMessage('Este campo es obligatorio'),

     check('length')
     .notEmpty().withMessage('Este campo es obligatorio').bail()
     .isNumeric({no_symbols: true}).withMessage('Éste campo solo acepta numeros'),

     check('genre_id')
     .notEmpty().withMessage('Este campo es obligatorio'),
]