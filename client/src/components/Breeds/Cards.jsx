import React, { useState } from 'react';
import './Cards.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBreeds } from '../../actions/index';
import Card from '../BreedCard/Card';

export default function Cards() {

    const dispatch = useDispatch();

    const breeds = useSelector(state => state.breeds)
    let allBreeds = [...breeds]
    console.table(allBreeds)
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
        console.table(pages)
        return (
            <div>
                <div className='buttons'>
                    {
                        currentPage === 1
                            ? <div> <input type='button' name='firtsPage' onClick={firstPage} value='1' /> <input type='button' name='next' onClick={nextPage} value='next' /> <input type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                            
                            : currentPage === 2
                                ? <div> <input type='button' name='firtsPage' onClick={firstPage} value='1' /> <input type='button' value={currentPage}/> <input type='button' name='next' onClick={nextPage} value='next' /> <input type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                 
                                : currentPage > 2 && currentPage < numPages-1
                                    ? <div> <input type='button' name='firtsPage' onClick={firstPage} value='1' /> <input type='button' name='back' onClick={previousPage} value='back' /> <input type='button' value={currentPage}/> <input type='button' name='next' onClick={nextPage} value='next' /> <input type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                    
                                    : currentPage === numPages
                                        ? <div> <input type='button' name='firtsPage' onClick={firstPage} value='1' /> <input type='button' name='back' onClick={previousPage} value='back' /> <input type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>
                                        
                                        : currentPage === numPages-1
                                            ? <div> <input type='button' name='firtsPage' onClick={firstPage} value='1' /> <input type='button' name='back' onClick={previousPage} value='back' /> <input type='button' value={currentPage}/> <input type='button' name='lastPage' onClick={lastPage} value={numPages} /> </div>

                                            : null
                    }
                </div>
                <div className='pageView'>
                    {
                        pages[currentPage-1].map( b => <Card key={b.id} img={b.img} name={b.name} weight={b.weight} temperaments={b.temperament} id={b.id} />)
                    }
                </div>
          </div>
        );
    }else {
        return(
          <div>No breeds found</div>
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

//     0     1     2     3     4
// [ {...},{...},{...},{...},{...} ]

//   breed

// arr = []

//                PAGE 1
// pages = [  [{...},{...},{...}] , ]
