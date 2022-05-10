const router = require('express').Router();
const { Dog, Temperament } = require('../db');

/*
[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
*/

router.post('/', async (req, res) =>{

    let {img, name, minHeight, maxHeight, minWeight, maxWeight, minAge, maxAge, temperament} = req.body;

    if(!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !img){
        res.send('Necessary data missing')
    }
    else{
        try{
            const dog = await Dog.create({
                img: img,
                name: name,
                height: `${minHeight} - ${maxHeight}` ,
                weight: `${minWeight} - ${maxWeight}`,
                age: `${minAge} - ${maxAge}`,
            });
            
            if(temperament){
                temperament.forEach(async e => {
                    const temper = await Temperament.findOne({
                        where: {
                            name: e
                        }
                    })
                    await temper.addDog(dog);
                    await dog.addTemperaments(temper);
                });
            }
            res.send(dog);
        }
        catch(e){
            console.log('ERROR!!: ',e)
        }
    }
});




module.exports = router;