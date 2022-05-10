import React, { useState } from 'react';
import { getAllBreeds } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../BreedCard/Card';
import './pagination.css'
import imageDog from '../../img/kisspng-puppy-trasteos-en-medellin-sadness-german-shepherd-5ba46b1500f9f7.310635061537501973004.png'

export default function Pagination() {

    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breeds)
    let allBreeds = [...breeds]
    const numPages = Math.ceil(breeds.length/8)

    //Se ejecuta cada vez que se renderiza el componente ---> componentDidMount y componentDidUpdate
    React.useEffect(()=>{
        // console.log('soy el useEffect')
        dispatch(getAllBreeds())
    },[])

    const [currentPage,setCurrentPage] = useState(1)

    let pages = getPages(allBreeds,8);

    const firstPage = (e) => {
        setCurrentPage(
            1
        )
    }

    const lastPage = (e) => {
        setCurrentPage(
            numPages
        )
    }

    const nextPage = (e) => {
        setCurrentPage(
            currentPage + 1
        )
    }

    const previousPage = (e) => {
        setCurrentPage(
            currentPage - 1
        )
    }
    
    if(pages.length > 0){
        return (
            <div>
                <div className='pageView'>
                    {
                        pages[currentPage-1].map( b => <Card key={b.id} img={b.img} name={b.name} weight={b.weight} temperament={b.temperament} temperaments={b.temperaments} id={b.id} />)
                    }
                </div>
                <div className='btnContainer'>
                    {
                        currentPage === 1 && pages.length === 1
                            ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> </div>
                                                
                            :currentPage === 1
                                ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='next' onClick={nextPage} value='next' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                    
                                : currentPage === 2
                                    ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' value={currentPage}/> <input className='buttons' type='button' name='next' onClick={nextPage} value='next' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                         
                                    : currentPage > 2 && currentPage < numPages-1
                                        ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='back' onClick={previousPage} value='back' /> <input className='buttons' type='button' value={currentPage}/> <input className='buttons' type='button' name='next' onClick={nextPage} value='next' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                            
                                        : currentPage === numPages
                                            ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='back' onClick={previousPage} value='back' /> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                                                
                                            : currentPage === numPages-1
                                                ? <div> <input className='buttons' type='button' name='firtsPage' onClick={firstPage} value='1' /> <input className='buttons' type='button' name='back' onClick={previousPage} value='back' /> <input className='buttons' type='button' value={currentPage}/> <input className='buttons' type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                        
                                                : null
                    }
                </div>
          </div>
        );
    }else {
        return(
            <div className='containerNF'>
                <div className='notFound'>No breeds found</div>
                <div className='img'><img className='imgDog' src={imageDog}></img></div>
            </div>
        )
    }
}

function getPages(totalBreeds,pageLimit){
    let pages = []
    let arr = []
    while (totalBreeds.length > 0) {

        let breed = totalBreeds.shift();

        if(totalBreeds.length !== 0){

            if(arr.length <= pageLimit-1){
                arr = [...arr,breed];
            }
            else{
                pages = [...pages,arr];
                arr = [];
                arr = [...arr,breed];
            }
        }
        else{
            if(arr.length <= pageLimit-1){
                arr = [...arr,breed];
            }
            else{
                pages = [...pages,arr];
                arr = [];
                arr = [...arr,breed];
            }
            pages = [...pages,arr];
        }
    }
    return pages;
}