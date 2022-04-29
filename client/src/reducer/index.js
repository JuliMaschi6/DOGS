const { GET_ALL_BREEDS,
    GET_BREED_DETAIL,
    GET_ALL_TEMPERAMENTS,
    CREATE_BREED,
    FIND_BREED_NAME,
    FILTER_TEMPERAMENT,
    ORDER_AZ,
    ORDER_ZA,
    ORDER_WEIGHT_ASC,
    ORDER_WEIGHT_DESC 
} = require('../actions-types/index');

const initialState = {
    breeds: [],
    temperaments: [],
    breedDetail: {},
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BREEDS:
          return{
            ...state,
            breeds: action.payload
          }

        case GET_ALL_TEMPERAMENTS:
          return{
            ...state,
            temperaments: action.payload
          }
          
        case GET_BREED_DETAIL:
          return{
            ...state,
            breedDetail: action.payload
          }
        
        case CREATE_BREED:
          return{
              ...state,
              breeds: [...state.products , action.payload]
          }
    
        case FIND_BREED_NAME:
          return{
            ...state,
            breeds: action.payload
          }
        
        case FILTER_TEMPERAMENT:
            return{
                ...state,
                breeds: action.payload
            }
            
        case ORDER_AZ:
            return{
                ...state,
                breeds: state.breeds.sort()
            }
        case ORDER_ZA:
            return{
                ...state,
                breeds: state.breeds.reverse()
            }
        
        case ORDER_WEIGHT_ASC:
            function sortArray(x, y){
                if (x.weight < y.weight) {return -1;}
                if (x.weight > y.weight) {return 1;}
                return 0;
            }
            return{
                ...state,
                breeds: state.breeds.sort(sortArray)
            }

        case ORDER_WEIGHT_DESC:
            function reverseArray(x, y){
                if (x.weight < y.weight) {return -1;}
                if (x.weight > y.weight) {return 1;}
                return 0;
            }
            return{
                ...state,
                breeds: state.breeds.reverse(reverseArray)
            }
        
        default:
          return {...state}
    }
}


export default rootReducer;