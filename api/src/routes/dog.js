const router = require('express').Router();
const { Dog, Temperament } = require('../db');

/*
[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
*/

router.post('/dog', async (req, res) =>{

    let {name, height, weight, age, temperaments} = req.body;

    if(!name || !height || !weight){
        throw new Error('Necessary data missing')
    }
    else{
        const [dog,created] = await Dog.findOrCreate({
            where: {
              name,
              height,
              weight,
              age
            }
        });

        if(temperaments){
            temperaments.forEach(async e => {
                const temper = await Temperament.create({
                    name: e
                })
            });
            await dog.setTemperaments(temper);
        }
        res.send('Dog created!')
    }
});


module.exports = router;