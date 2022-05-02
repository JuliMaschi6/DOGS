import React, { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createDog, obtainTemperament } from "../redux/actions/index";
import './Create/Create.css';

// ! ARREGLAR EL EFECTO DEL BOTON QUE ELIMINA AL CLICKEARSE

export default function Create(){

    const dispatch = useDispatch();
    const history = useHistory();
    const temps = useSelector((state) => state.temperamentos);

    // Me guardo los valores del formulario en un estado local nuevo.
    const [input, setInput] = useState({
        name: "",
        image: "",
        weight: "",
        height: "",
        life_span: "",
        temperament: [],
        // origin: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(obtainTemperament());
    }, [dispatch]);

    function handleOnChanges(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });

        setErrors(validation({
            ...input,
            [e.target.name] : e.target.value
        }));
    };

    function handleSelected(e) {
        e.preventDefault();
        setInput({
            ...input,
            // Le paso lo que ya tiene en "...input.temperament" y despues lo que contiene en "e.target.value"
            // Guarda en el arreglo cada select que sea clickeado.
            temperament: [...input.temperament, e.target.value]
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(input)  // Controlo qué tiene el input antes de ser enviado...
        if(input.name &&
        input.image &&
        input.height &&
        input.weight &&
        input.life_span &&
        input.temperament){
        // Llamo a la function que conecta con el back-end y le mando lo recibido por "input"
        dispatch(createDog(input));
        // Para que el usuario vea que fue creado se envía un "alert"
        alert("Breed was created successfully");
        // Reseteo el formulario:
        setInput({
            name: "",
            image: "",
            weight: "",
            height: "",
            life_span: "",
            temperament: [],
        });
        history.push('/home/');

      } else(alert('Must feel all the inputs.'));
    }

    function validation(input){
        var validIMG = /^(ftp|http|https):\/\/[^ "]+$/.test(input.image);
        // var validNUMS = /^[1-9]\d*$/.test(input);
        let errors = {};

        if (!input.name) {
        errors.name='All Breeds must have a name.'
        }else if(!input.image || !validIMG){
        errors.image = 'Must have a valid link image.'
        }else if(!input.weight /*|| !validNUMS*/){
        errors.weight = 'No weight was specified...'
        }else if(!input.height /*|| !validNUMS*/){
        errors.height = 'No height was specified...'
        }else if(!input.life_span /*|| !validNUMS*/){
        errors.life_span = 'No life span was specified...'
        }
        return errors;
    };
    // console.log(errors);

    function handleDelete(e) {
        e.preventDefault();
        setInput({
            ...input,
            temperament: input.temperament.filter( temp => temp !== e.target.value)
        })
    };

    let id = 0
    function addKey(){
        return id++
    }

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div key='f1'><br />
                    <Link to="/home">
                        <button className='btn'>Go Home</button><br />
                    </Link><br />
                    <h3>CREATE A BREED:</h3><br /> 
                    <label>Name:    </label>
                    <input className='input-form' type="text" placeholder="e.g. John" value={input.name} name="name" onChange={handleOnChanges}/>
                    {errors.name && (<p className='error'>{errors.name}</p>)}
                </div>

                <div>
                    <label>Image:   </label>
                    <input

                        className='input-form'
                        type="text"
                        placeholder="Image link..."
                        value={input.image}
                        name="image"
                        onChange={handleOnChanges}
                    />
                    {errors.image && (
                        <p className='error'>{errors.image}</p>
                    )}
                </div>

                <div>
                    <label>Weight:  </label>
                    <input 

                        className='input-form'
                        type="text"
                        placeholder="e.g. 2 - 10 kgs"
                        value={input.weight}
                        name="weight"
                        onChange={handleOnChanges}
                    />
                    {errors.weight && (
                        <p className='error'>{errors.weight}</p>
                    )}
                </div>

                <div>
                    <label>Height:  </label>
                    <input

                        className='input-form'
                        type="text"
                        placeholder="e.g. 20 - 80 cms"
                        value={input.height}
                        name="height"
                        onChange={handleOnChanges}
                    />
                    {errors.height && (
                        <p className='error'>{errors.height}</p>
                    )}
                </div>

                <div>
                    <label>Life-Span:   </label>
                    <input

                        className='input-form'
                        type="text"
                        placeholder="e.g. 8 - 10 years"
                        value={input.life_span}
                        name="life_span"
                        onChange={handleOnChanges}
                    />
                    {errors.life_span && (
                        <p className='error'>{errors.life_span}</p>
                    )}
                </div>

                {/* <div>
                    <label>Origin:</label>
                    <input
                        type="text"
                        placeholder="e.g. Brazil"
                        value={input.origin}
                        name="origin"
                        onChange={handleOnChanges}
                    />
                [[ ES OPCIONAL ... ]]
                </div> */}

                <div>
                    <label>Temperaments:    </label>
                    <select onChange={handleSelected} className='input-form'>
                        <option name='Temperamentos' key='keyT' > Select from... </option>
                        {/* state.temperamentos.name >>> para acceder a la lista de temperament en DB */}
                        {temps && temps.map((t) => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                    </select>
                </div><br />
                
                <div  className='buttons'>
                {input.temperament.map(e => (
                    <div  key={addKey()}>
                        <button onClick={handleDelete} className='btn-create' value={e}>{e}
                        </button>
                    </div>
                ))}
                </div><br />    
                <button
                    className='btn'
                    value='createDog'
                    type="submit"
                    id='button-submit'
                    >SUBMIT</button><br /><br />
                <br />
            </form>
        </div>
    
    )
};