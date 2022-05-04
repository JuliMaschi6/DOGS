import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBreedDetail } from '../../actions/index';

export default function breedDetail({match}){

    const dispatch = useDispatch();

    const details = useSelector(state => state.breedDetail)

    React.useEffect(()=>{
        dispatch(getBreedDetail(match.params.id))
    },[])

    return (
        <div>
            <img src={details.img}/>
            <h1>{details.name}</h1>
            <h4>{details.temperament}</h4>
            <h5>{details.age}</h5>
            <h5>{details.height}</h5>
            <h5>{details.weight}</h5>
        </div>
    )
};
