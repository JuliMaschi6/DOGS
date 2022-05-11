const router = require('express').Router();
const axios = require('axios');
const { API_KEY} = process.env;
const { Dog, Temperament } = require('../db');

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

    if(!name){

        const breeds = await getApiBreeds();
        const breedsDB = await getDBbreeds();
        const allBreeds = breeds.concat(breedsDB)
        res.send(allBreeds)
        
    }else{
        try{
            const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})
            var breeds = []
            apiResult.data.forEach(e => {
                if(e.name.toLowerCase().includes(name.toLowerCase())){
                    breeds.push({
                        id: e.id,
                        img: e.image.url,
                        name: e.name,
                        temperament: e.temperament,
                        weight: e.weight.metric
                    })
                }
            });
            if (breeds.length>0){
                const breedsDB = await Dog.findAll({where: {name: name}});
                if(breedsDB){
                    let allBreeds = [...breeds,...breedsDB]
                    return res.send(allBreeds)
                }
                return res.send(breeds)

            }else {
                const breedsDB = await Dog.findAll({where: {name: name}});
                if(breedsDB){
                    res.send(breedsDB)
                }
                else return res.status(404).send(`No results found four your search (${name})`)
            }
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
router.get('/dogsApi', async (req,res) => {
    const result = await getApiBreeds();
    res.send(result)
})

router.get('/dogsDB', async (req,res) => {
    const result = await getDBbreeds();
    res.send(result)
})

router.get('/:id', async (req, res) =>{
    let {id} = req.params;
    if(id){
        try{
            const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})

            const result = apiResult.data.find(e => e.id === Number(id));
            if(result){
                return res.send({
                    id: result.id,
                    img: result.image.url,
                    name: result.name,
                    temperament: result.temperament,
                    weight: result.weight.metric,
                    height: result.height.metric,
                    age: result.life_span
                })
            } 
            else {
                try{
                    const result = await Dog.findOne({where: {id: id} , include: [Temperament]})
                    if(result){
                        return res.send({
                            id: result.id,
                            img: result.img,
                            name: result.name,
                            temperament: result.temperaments.map(e=> `${e.name}, `),
                            weight: result.weight,
                            height: result.height,
                            age: result.age
                        })
                    }
                }
                catch(e){
                    return res.status(404).send(`No dog founded for id ${id}`)
                }
            }
        }
        catch(e){
            res.status(404).send(e)
        }
    }else{
        res.status(404).send(`Error , ${id}`)
    }
});


const getDBbreeds = async () =>{
    try{
        const breedsDB = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        });
        return breedsDB;
    }
    catch{
        return 'No created dog founded'
    }
}

const getApiBreeds = async () =>{
 
    try{
        const apiResult = await axios.get(`https://api.thedogapi.com/v1/breeds`,{headers: {'x-api-key': `${API_KEY}`}})
        
        const breeds = apiResult.data.map(e => {
            if(!e.weight.metric.includes('-')){

                if(e.weight.metric.includes('NaN')){
                    return {
                        id: e.id,
                        img: e.image.url,
                        name: e.name,
                        temperament: e.temperament,
                        weight: `13 - 27`
                    }
                }
                else if(Number(e.weight.metric) !== NaN){
                    return {
                        id: e.id,
                        img: e.image.url,
                        name: e.name,
                        temperament: e.temperament,
                        weight: `1 - ${e.weight.metric}`
                    }
                }
            }
            return {
                id: e.id,
                img: e.image.url,
                name: e.name,
                temperament: e.temperament,
                weight: e.weight.metric
            }
        })
        return breeds;
    }
    catch(e){
        console.log('Error',e)
    }
}


module.exports = router;
