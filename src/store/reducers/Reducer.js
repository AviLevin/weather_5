
const initialState = {
    currentConditions: {},
    fiveDaysWeather: {},
    suggestions: [],
    cityName: '',
    loading: true,
    favorites: JSON.parse(localStorage.getItem('favorite-cities')) ? JSON.parse(localStorage.getItem('favorite-cities')): [],
    error: null,
    imperialUnitsMode: true,
    nightMode: false,
}

const mainReducer = (state = initialState, action) => {
    //const newState = { ...state };

    switch (action.type) {
        case 'SET_SEARCH_VALUE':
            return {
                ...state,
                searchValue: action.data
            }
        case 'GET_SUGGESTIONS':
            return {
                ...state,
                suggestions: action.data
            }
        case 'GET_FIVE_DAYS_WEATHER':
            return {
                ...state,
                fiveDaysWeather: action.data.weather,
                cityName: action.data.cityName,
                loading: false
            }
        case 'GET_CURRENT_CONDITIONS':
            return {
                ...state,
                currentConditions: action.data
            }
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'ERROR':
            return {
                ...state,
                error: action.data
            }
        case 'CHANGE_UNITS':
            return {
                ...state,
                imperialUnitsMode: !state.imperialUnitsMode
            }
        case 'CHANGE_NIGHT_MODE':
            return {
                ...state,
                nightMode: !state.nightMode
            }
        case 'ADD_TO_FAVORITES':
            state.favorites.push(action.data)
            localStorage.setItem('favorite-cities',JSON.stringify(state.favorites));
            return {
                ...state
            }
        case 'REMOVE_FROM_FAVORITES':
            let index = state.favorites.findIndex(city => city.cityKey === action.data)
            state.favorites.splice(index, 1);
            localStorage.setItem('favorite-cities',JSON.stringify(state.favorites));
            return {
                ...state
            }

        default:
            return state;
    }
}

export default mainReducer