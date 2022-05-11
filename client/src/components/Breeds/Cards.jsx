import React, { useState } from 'react';
import './Cards.css';
import Pagination from '../Pagination/pagination';
import FilterTemps from '../FilterTemps/FilterByTemp';

export default function Cards() {
        return (
            <div>
                <div className='options'>
                    <div>
                        <FilterTemps />
                    </div>
                </div>
                <div>
                    <Pagination />
                </div> 
            </div>
        );
}
