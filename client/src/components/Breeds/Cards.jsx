import React, { useState } from 'react';
import './Cards.css';
import Pagination from '../Pagination/pagination';
import FilterTemps from '../FilterTemps/FilterByTemp';
import { setPage } from '../../actions';
import { useDispatch } from 'react-redux';
import { orderByAZ , orderByZA , weightASC , weightDESC , getBreedsDB , getBreedsApi , getAllBreeds} from '../../actions/index';

export default function Cards() {

    const dispatch = useDispatch();
    const [, /*refreshState*/ setRefreshState] = React.useState(false);
    const handleSortName = (e)=>{
        if(e.target.value === 'orderAZ'){
            dispatch(orderByAZ())
            setRefreshState((prevState) => !prevState);
        }
        else if(e.target.value === 'orderZA'){
            dispatch(orderByZA())
            setRefreshState((prevState) => !prevState);
        }
    }

    const handleSortWeight = (e)=>{
        if(e.target.value === 'weightAsc'){
            dispatch(weightASC())
            setRefreshState((prevState) => !prevState);
        }
        else if(e.target.value === 'weightDesc'){
            dispatch(weightDESC())
            setRefreshState((prevState) => !prevState);
        }
    }

    const handleFilters = (e) =>{
        if(e.target.value === 'allBreeds'){
            dispatch(getAllBreeds())
            setRefreshState((prevState) => !prevState);
        }
        else if(e.target.value === 'breedsApi'){
            dispatch(getBreedsApi())
            setRefreshState((prevState) => !prevState);
        }
        else if(e.target.value === 'breedsDB'){
            dispatch(getBreedsDB())
            setRefreshState((prevState) => !prevState);
        }
    }

    return (
            <div>
                <div className='options'>
                    <div>
                        <FilterTemps onSearch={setPage(1)} />
                    </div>
                </div>
                <div className='options'>
                        <select onChange={handleSortName}>
                            <option value="" selected="selected" select disabled>Sort by name</option>
                            <option value='orderAZ'>Sort A-Z</option>
                            <option value='orderZA'>Sort Z-A</option>
                        </select>
                        <select onChange={handleSortWeight}>
                            <option value="" selected="selected" select disabled>Sort by weight</option>
                            <option value='weightAsc'>Ascendant</option>
                            <option value='weightDesc'>Descendant</option>
                        </select>
                        <select onChange={handleFilters}>
                            <option value="allBreeds" selected="selected">Breeds</option>
                            <option value='breedsApi'>API breeds</option>
                            <option value='breedsDB'>Created</option>
                        </select>
                </div>
                <div>
                    <Pagination />
                </div> 
            </div>
        );
}
