const router = require('express').Router();
const axios = require('axios');
const { API_KEY} = process.env;

/*
GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal
*/

/*
GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado
*/

router.get('/', async (req, res) =>{

    let {name} = req.query;
    console.log('SOY EL NAME: ', name)

    if(!name){
        try{
            const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})

            const breeds = apiResult.data.map(e => {
                return {
                    img: e.image.url,
                    name: e.name,
                    temperament: e.temperament,
                    // weight: e.weight
                }
            })
            res.send(breeds)
        }
        catch(e){
            console.log('Error',e)
        }

    }else{
        try{
            const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})
            var breeds = []
            apiResult.data.forEach(e => {
                if(e.name.toLowerCase().includes(name.toLowerCase())){
                    breeds.push({
                        img: e.image.url,
                        name: e.name,
                        temperament: e.temperament,
                        // weight: e.weight
                    })
                }
            });
            if (breeds.length>0){
                res.send(breeds)
            }else res.status(404).send(`No results found four your search (${name})`)
        }
        catch(e){
            console.log('Error',e)
        }
    }
});

/*
GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
*/

router.get('/:idBreed', async (req, res) =>{
    let {idBreed} = req.params;

    if(idBreed){
        try{
            const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})

            const result = apiResult.data.filter(e => e.id === Number(idBreed));
            if(result) return res.send(result)
            else return res.status(404).send(`No results found four your search (${idBreed})`)
        }
        catch(e){
            console.log('Error',e)
        }
    }else{
        res.status(404).send(`No results found four your search (${idBreed})`)
    }
});


module.exports = router;