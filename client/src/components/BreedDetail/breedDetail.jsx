import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBreedDetail , cleanBreedDetail } from '../../actions/index';
import './breedDetail.css'

export default function breedDetail({match}){

    const dispatch = useDispatch();

    let details = useSelector(state => state.breedDetail)

    useEffect(()=>{
        dispatch(getBreedDetail(match.params.id))

        return () => {
            dispatch(cleanBreedDetail())
        }
    },[dispatch])

    console.log(details)

    return (
        <div className="containerD">
            <div className="imgDog">
                <img className="dog" src={details.img}/>
            </div>
            <div className="data">
                <h1>{details.name}</h1>
                <h5>Life span: {details.age}</h5>
                <h5>Height: {details.height} cm</h5>
                <h5>Weight: {details.weight} Kg</h5>
                <h4>Temperaments: {details.temperament}</h4>
            </div>
        </div>
    )
};
