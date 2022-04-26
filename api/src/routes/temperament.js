const router = require('express').Router();
const axios = require('axios');
const { Temperament } = require('../db');
const { API_KEY} = process.env;

/*
[ ] GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos
y luego ya utilizarlos desde allí
*/

router.get('/', async (req, res) =>{

    try{
        const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})

        apiResult.data.forEach( async (e) => {
            const [temper , created] = await Temperament.findOrCreate({
                where: {
                    name: e.temperament
                }
            })
        });

        const temperaments = await Temperament.findAll()
        res.send('temperaments: ' ,{temperaments})
    }
    catch(e){
        console.log('Error',e)
    }
});


module.exports = router;