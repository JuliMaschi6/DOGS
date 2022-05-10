import axios from 'axios';

const { 
    GET_ALL_BREEDS,
    GET_BREED_DETAIL,
    GET_ALL_TEMPERAMENTS,
    FIND_BREED_NAME,
    CREATE_BREED,
    CLEAN_BREED_DETAIL,
    ORDER_AZ,
    ORDER_ZA,
    ORDER_WEIGHT_ASC,
    ORDER_WEIGHT_DESC,
    BREEDS_DB,
    BREEDS_API,
    FILTER_BY_TEMP
} = require('../actions-types/index');


export function getAllBreeds() {
    return async function (dispatch) {
        const results = await axios.get('http://localhost:3001/dogs');
        dispatch({
            type: GET_ALL_BREEDS,
            payload: results.data
        })
    }
};

export function getAllTemperaments() {
    return async function (dispatch) {
        const results = await axios.get('http://localhost:3001/temperament');
        dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: results.data
        })
    }
};

export function findBreedByName(value) {
    return async function (dispatch) {
        const results = await axios.get(`http://localhost:3001/dogs?name=${value}`);
        dispatch({
            type: FIND_BREED_NAME,
            payload: results.data
        })
    }
};

export function getBreedDetail(id) {
    return async function (dispatch) {
        try{
            const results = await axios.get(`http://localhost:3001/dogs/${id}`);
            dispatch({
                type: GET_BREED_DETAIL,
                payload: results.data
            })
        }
        catch(e){
            console.log(e)
        }
    }
};

export function createBreed(data) {
    return async function (dispatch) {
        try{
            const results = await axios.post('http://localhost:3001/dog',data);
            console.log('soy la data: ',results.data)
            dispatch( {
                type: CREATE_BREED,
                payload: results.data
            })
        }
        catch(e){
            console.log(e)
        }
    }
};

export function filterByTemp(temper) {
    return {
        type: FILTER_BY_TEMP,
        payload: temper,
    }
};

export function orderByAZ() {
    return {
        type: ORDER_AZ,
    }
};

export function orderByZA() {
    return {
        type: ORDER_ZA,
    }
};

export function weightASC() {
    return {
        type: ORDER_WEIGHT_ASC,
    }
};

export function weightDESC() {
    return {
        type: ORDER_WEIGHT_DESC,
    }
};

export function cleanBreedDetail() {
        return {
            type: CLEAN_BREED_DETAIL,
        }
    };

export function getBreedsDB() {
    return async function (dispatch) {
        const results = await axios.get('http://localhost:3001/dogs/dogsDB');
        dispatch({
            type: BREEDS_DB,
            payload: results.data
        })
    }
};

export function getBreedsApi() {
    return async function (dispatch) {
        const results = await axios.get('http://localhost:3001/dogs/dogsApi');
        dispatch({
            type: BREEDS_API,
            payload: results.data
        })
    }
};