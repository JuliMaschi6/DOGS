const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require('./dog');
const dogsRouter = require('./dogs');
const tempRouter = require('./temperament');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogsRouter);
router.use('/dog', dogRouter);
router.use('/temperament', tempRouter);


module.exports = router;
