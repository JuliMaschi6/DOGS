import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { filterByTemp , getAllTemperaments } from '../../actions/index';
import './FilterByTemp.css';

export default function FilterTemps() {
    const allTemps = useSelector((state) => state.temperaments);
    const [input,setInput] = useState('');
    const [, /*refreshState*/ setRefreshState] = useState(false);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(getAllTemperaments())
    },[dispatch])

    function handleChange(e) {
        e.preventDefault()
        setInput(e.target.value)
        dispatch(filterByTemp(input))
    }

    return (
        <form className="form">
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