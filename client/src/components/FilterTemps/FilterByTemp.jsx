import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { filterByTemp , getAllTemperaments, setPage  } from '../../actions/index';
import './FilterByTemp.css';

export default function FilterTemps() {
    const allTemps = useSelector((state) => state.temperaments);
    const [input,setInput] = useState('');
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(getAllTemperaments())
    },[dispatch])

    function handleChange(e) {
        e.preventDefault()
        setInput(e.target.value)
        // dispatch(setPage(1))
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(filterByTemp(input))
        setInput('')
    }

    return (
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <input
                    className='inputTemper'
                    type="text"
                    id="name"
                    autoComplete="off"
                    placeholder="Temperament..."
                    value={input}
                    onChange={(e) => handleChange(e)}
                  />
            </div>
        </form>
    )
};