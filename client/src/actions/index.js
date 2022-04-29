import axios from 'axios';

const { 
    GET_ALL_BREEDS,
    GET_BREED_DETAIL,
    GET_ALL_TEMPERAMENTS,
    CREATE_BREED,
    FIND_BREED_NAME,
    FILTER_TEMPERAMENT,
    ORDER_AZ,
    ORDER_ZA,
    ORDER_WEIGHT_ASC,
    ORDER_WEIGHT_DESC
} = require('../action-types');


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
        const results = await axios.get('http://localhost:3001/temperaments');
        dispatch({
            type: GET_ALL_TEMPERAMENTS,
            payload: results.data
        })
    }
};

export function findBreedsByName(value) {
    return async function (dispatch) {
        const results = await axios.get(`http://localhost:3001/dogs/${value}`);
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
        const results = await axios.post('http://localhost:3001/dog',data);
        const action = {type: CREATE_BREED , payload: results.data}
        return action
    }
};

export function filterByTemp(valueTemper) {
    return {
        type: FILTER_TEMPERAMENT,
        payload: valueTemper,
    }
};

export function orderByAZ(data) {
    return {
        type: ORDER_AZ,
        payload: data,
    }
};

export function orderByZA(data) {
    return {
        type: ORDER_ZA,
        payload: data,
    }
};

export function weightASC(data) {
    return {
        type: ORDER_WEIGHT_ASC,
        payload: data,
    }
};

export function weightDESC(data) {
    return {
        type: ORDER_WEIGHT_DESC,
        payload: data,
    }
};