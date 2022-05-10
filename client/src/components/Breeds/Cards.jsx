import React, { useState } from 'react';
import './Cards.css';
import { orderByAZ , orderByZA , weightASC , weightDESC , getBreedsDB , getBreedsApi} from '../../actions/index';
import { useDispatch } from 'react-redux';
import Pagination from '../Pagination/pagination';
import FilterTemps from '../FilterTemps/FilterByTemp';



export default function Cards() {

    const dispatch = useDispatch();
    const [, /*refreshState*/ setRefreshState] = useState(false);
    
    //Se ejecuta cada vez que se renderiza el componente ---> componentDidMount y componentDidUpdate
    React.useEffect(()=>{
        // console.log('soy el useEffect')
    },[dispatch])

    const sortAZ = () => {
        dispatch(orderByAZ())
        setRefreshState((prevState) => !prevState);
    }

    const sortZA = () => {
        dispatch(orderByZA())
        setRefreshState((prevState) => !prevState);
    }

    const weightAsc = () => {
        dispatch(weightASC())
        setRefreshState((prevState) => !prevState);
    }

    const weightDesc = () => {
        dispatch(weightDESC())
        setRefreshState((prevState) => !prevState);
    }

    const breedsDB = () => {
        dispatch(getBreedsDB())
        setRefreshState((prevState) => !prevState);
    }

    const breedsApi = () => {
        dispatch(getBreedsApi())
        setRefreshState((prevState) => !prevState);
    }

        return (
            <div>
                <div className='options'>
                    <div>
                        <FilterTemps />
                    </div>
                    <div>
                        <input className='btn' type='button' name='orderAZ' onClick={sortAZ} value='Sort A-Z' />
                        <input className='btn' type='button' name='orderZA' onClick={sortZA} value='Sort Z-A' />
                        <input className='btn' type='button' name='weightAsc' onClick={weightAsc} value='Weight ASC' />
                        <input className='btn' type='button' name='weightDesc' onClick={weightDesc} value='Weight DESC' />
                        <input className='btn' type='button' name='breedsDB' onClick={breedsDB} value='Created Dogs' />
                        <input className='btn' type='button' name='breedsApi' onClick={breedsApi} value='API Dogs' />
                    </div>
                </div>
                <div>
                    <Pagination />
                </div> 
            </div>
        );
}


/* //     0     1     2     3     4
// [ {...},{...},{...},{...},{...} ]

//   breed

// arr = []

//                PAGE 1
// pages = [  [{...},{...},{...}] , ] */
