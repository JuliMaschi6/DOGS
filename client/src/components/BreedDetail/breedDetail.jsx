import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBreedDetail , cleanBreedDetail } from '../../actions/index';
import './breedDetail.css'
import imageLoader from '../../img/loader.gif'
import { Link } from 'react-router-dom';

export default function BreedDetail({match}){

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
            <div className="containerColor">
                
            <div className="containerD">
                <div className="imgDog">
                    <img className="dog" alt="dog" src={details.img}/>
                </div>
                <div className="data">
                    <h1 className="dataName">{details.name}</h1>
                    <p>Life span: {details.age}</p>
                    <p>Height: {details.height} cm</p>
                    <p>Weight: {details.weight} Kg</p>
                    <p>Temperaments: {details.temperament}</p>
                </div>
            </div>
            <div className="home">
                <Link to={'/home'}>
                    <button className="btnHome"> Home </button>
                </Link>
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
