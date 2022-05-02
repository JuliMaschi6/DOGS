import React , { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { createBreed , getAllTemperaments} from '../../actions/index';
import './CreateBreed.css'
import  validate  from './validations';

export default function CreateBreed() {

    const dispatch = useDispatch();
    let t = useSelector(state => state.temperaments)

    const [input,setInput] = useState({
        name: '',
        minWeight: '',
        maxWeight: '',
        minHeight: '',
        maxHeight: '',
        minAge: '',
        maxAge: '',
        img: '',
        temperament: []
    })
    
    const [errors,setErrors] = useState({});

    React.useEffect(()=>{
        dispatch(getAllTemperaments())
    }, [dispatch])

    const handleChange = function (e){
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })

      setErrors(validate({ 
          ...input,
          [e.target.name]: e.target.value
        }))
    }

    const hadleChangeTemp = function(e){
        e.preventDefault();
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        });
    }

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
  
    function handleSubmit(e) {
      e.preventDefault();
      if(input.name && input.img && input.minHeight && input.maxHeight && input.minWeight && input.maxWeight &&
        input.minAge && input.maxAge && input.temperament){
        dispatch(createBreed(input))
        alert("Breed was created successfully");

        setInput({
            name: '',
            minWeight: '',
            maxWeight: '',
            minHeight: '',
            maxHeight: '',
            minAge: '',
            maxAge: '',
            img: '',
            temperament: []
        });

        }else{
            (alert('Must fill all the inputs.'));
        }
    }

    return (
        <div >
          <form id="breedForm" className='divForm' onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input name='name' value={input.name} onChange={handleChange} />
                {errors.name && (<p className='danger'>{errors.name}</p>)}
            </div>
            <div>
                <p>Weight</p>
                <label>Min: </label>
                <input type="text" name='minWeight' value={input.minWeight} onChange={handleChange}  />
                <label>Max: </label>
                <input type="text" name='maxWeight' value={input.maxWeight} onChange={handleChange} />
                {errors.weight && (<p className='danger'>{errors.weight}</p>)}
            </div>
            <div>
                <p>Height</p>
                <label>Min: </label>
                <input type="text" name='minHeight' value={input.minHeight} onChange={handleChange} />
                <label>Max: </label>
                <input type="text" name='maxHeight' value={input.maxHeight} onChange={handleChange} />
                {errors.height && (<p className='danger'>{errors.height}</p>)}
            </div>
            <div>
                <p>Average life: </p>
                <label>Min: </label>
                <input type='text' name='minAge' max='35' value={input.minAge} onChange={handleChange} />
                <label>Max: </label>
                <input type='text' name='maxAge' max='35' value={input.maxAge} onChange={handleChange} />
                {errors.age && (<p className='danger'>{errors.age}</p>)}
            </div>
            <div>
                <label>Image url: </label>
                <input type='text' name='img' placeholder='Paste your image link...' value={input.img} onChange={handleChange} />
                {errors.img && (<p className='danger'>{errors.img}</p>)}
            </div>
            <div>
                <label>Temperaments:  </label>
                    <select onChange={hadleChangeTemp} className='tempSelect'>
                        {t && t.map((t) => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                    </select>
            </div>

            <div>
                {input.temperament.map(e => (
                    <div  key={addKey()}>
                        <p>{e}</p>
                        <button onClick={handleDelete} value={e}>X</button>
                    </div>
                ))}
            </div>
            <div>
                <button type='submit'>Create breed</button> 
            </div>
          </form>
        </div>
    );
}

