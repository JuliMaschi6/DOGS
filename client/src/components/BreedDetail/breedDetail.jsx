import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBreedDetail , cleanBreedDetail } from '../../actions/index';
import './breedDetail.css'
import imageLoader from '../../img/loader.gif'
import { Link } from 'react-router-dom';

export default function breedDetail({match}){

    const dispatch = useDispatch();

    let details = useSelector(state => state.breedDetail)

    useEffect(()=>{
        dispatch(getBreedDetail(match.params.id))
        return () => {
            dispatch(cleanBreedDetail())
        }
    },[dispatch])

    if(Object.keys(details).length !== 0){
        return (
            <div>
                <div className="home">
                <Link to={'/home'}>
                    <button className="btnHome"> Home </button>
                </Link>
            </div>
            <div className="containerD">
                <div className="imgDog">
                    <img className="dog" src={details.img}/>
                </div>
                <div className="data">
                    <h1>{details.name}</h1>
                    <h5>Life span: {details.age} years</h5>
                    <h5>Height: {details.height} cm</h5>
                    <h5>Weight: {details.weight} Kg</h5>
                    <h4>Temperaments: {details.temperament}</h4>
                </div>
            </div>
            </div>
        )
    }else{
        return (
            <div className='containerNF'>
                <div className='notFound'>Loading...</div>
                <div className='img'><img className='imgDog' alt="loading" src={imageLoader} /></div>
            </div>
        )
    }
    
};
