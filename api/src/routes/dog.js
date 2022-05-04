const router = require('express').Router();
const { Dog, Temperament } = require('../db');

/*
[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
*/

router.post('/', async (req, res) =>{

    let {img, name, minHeight, maxHeight, minWeight, maxWeight, minAge, maxAge, temperaments} = req.body;

    if(!name || !minHeight || !maxHeight || !minWeight || !maxWeight){
        res.send('Necessary data missing')
    }
    else{
        try{
            const [dog,created] = await Dog.findOrCreate({
                where: {
                  img,
                  name,
                  height: `${minHeight} - ${maxHeight}` ,
                  weight: `${minWeight} - ${maxWeight}`,
                  age: `${minAge} - ${maxAge}`
                }
            });
    
            if(temperaments){
                temperaments.forEach(async e => {
                    const [temper , created] = await Temperament.findOrCreate({
                        where: {
                            name: e
                        }
                    })
                    await temper.addDog(dog);
                    await dog.addTemperaments(temper);
                });
            }
            res.send('Dog created!')
        }
        catch(e){
            console.log('ERROR!!: ',e)
        }
    }
});




module.exports = router;