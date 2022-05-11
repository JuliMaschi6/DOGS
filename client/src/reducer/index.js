const { GET_ALL_BREEDS,
    GET_BREED_DETAIL,
    GET_ALL_TEMPERAMENTS,
    FIND_BREED_NAME,
    CREATE_BREED,
    BREEDS_DB,
    CLEAN_BREED_DETAIL,
    ORDER_AZ,
    ORDER_ZA,
    ORDER_WEIGHT_ASC,
    ORDER_WEIGHT_DESC,
    BREEDS_API,
    FILTER_BY_TEMP
} = require('../actions-types/index');

const initialState = {
    breeds: [],
    temperaments: [],
    breedDetail: {},
    created: [],
    apiBreeds: [],
    allBreeds: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BREEDS:
          return{
            ...state,
            breeds: action.payload,
            allBreeds: action.payload
          }

        case GET_ALL_TEMPERAMENTS:
          return{
            ...state,
            temperaments: action.payload
          }

        case CLEAN_BREED_DETAIL:
          return{
            ...state,
            breedDetail: {}
          }
          
        case GET_BREED_DETAIL:
          return{
            ...state,
            breedDetail: action.payload
          }
        
        case CREATE_BREED:
          return{
              ...state
          }
    
        case FIND_BREED_NAME:
          return{
            ...state,
            breeds: action.payload
          }

        case FILTER_BY_TEMP:
          const filtered = state.allBreeds.filter((e) => e.temperament?.includes(action.payload.charAt(0).toUpperCase() + action.payload.slice(1)))
          let arr = []
          state.created.forEach(e => {
            e.temperaments.forEach(el => {
              if(el.name.includes(action.payload.charAt(0).toUpperCase() + action.payload.slice(1))){
                arr.push(e)
              }
            });
          })
          const all = filtered.concat(arr)
          return{
              ...state,
              breeds: all
          }
        
        case ORDER_AZ:
          let resultsAZ = state.breeds.sort(function(a, b){
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          });

          return {
            ...state,
            breeds: resultsAZ
          }

        case ORDER_ZA:
          let resultsZA = state.breeds.sort(function(a, b){
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            return 0;
          });

          return {
            ...state,
            breeds: resultsZA
          };
        
        case ORDER_WEIGHT_ASC:
          let orderAsc = state.allBreeds.sort(
            (a, b) =>
              b.weight.replace(/\s+/g, "").split("-")[1] -
              a.weight.replace(/\s+/g, "").split("-")[1]
          );
          orderAsc.reverse();
          return{
            ...state,
            allBreeds: orderAsc
          }
    
        case ORDER_WEIGHT_DESC:
          let orderDesc = state.breeds.sort((a, b) => {
              return(
                a.weight.replace(/\s+/g, "").split("-")[1] -
                b.weight.replace(/\s+/g, "").split("-")[1]
              )
          });
          orderDesc.sort().reverse();
          return{
            ...state,
            allBreeds: orderDesc
          }
        
        case BREEDS_DB:
          return {
            ...state,
            created: action.payload,
            breeds: action.payload
          }
          
        case BREEDS_API:
          return{
            ...state,
            breeds: action.payload
          }
        
        default:
          return {...state}
    }
}

export default rootReducer;
