import { endPoints, apiKey } from '../../components/api/acuuweather/config'
import axios from 'axios';




export const getGeopositionApi = (position) => {
    return axios.get(endPoints.geoposition + position)
}


export const getSuggestionApi = (query) => {
    return axios.get(endPoints.autocompleteSearch + query)
}


export const getFiveDaysWeatherApi = (cityKey) => {
    return axios.get(endPoints.locationKey + cityKey + `?apikey=${apiKey}`)
}


export const getCurrentConditionsApi = (cityKey)  => {
    return axios.get(endPoints.currentConditions + cityKey + `?apikey=${apiKey}`)
   
        
}
//SUGGESTIONS

export const getSuggestions = query => async dispatch => {

    try {
        const result = await getSuggestionApi(query)
        dispatch({ type: 'GET_SUGGESTIONS', data: result.data })
    } catch (error) {
        dispatch({ type: 'ERROR' })
    }

}

//5 DAYS WEATHER WEATHER**
const dispatchGetWeather = (data) => {
    return { type: 'GET_FIVE_DAYS_WEATHER', data: data }
}
export const getFiveDaysWeather = (data) => async dispatch => {

    dispatch(loading())

    try {
        const result = await getFiveDaysWeatherApi(data.cityKey)
        const getCurrentRes = await getCurrentConditionsApi(data.cityKey);
        dispatch(dispatchCurrentConditions({ cityKey: data.cityKey, weather: getCurrentRes.data[0] }))
        dispatch(dispatchGetWeather({ weather: { ...result.data, cityKey: data.cityKey }, cityName: data.value }))
    } catch (error) {
        dispatch(dispatchError(error))
    }


}

//CURRENT CONDITIONS
const dispatchCurrentConditions = (data) => {
    return { type: 'GET_CURRENT_CONDITIONS', data: data }
}
export const getCurrentConditions = cityKey => async dispatch => {

    try {
        const result = await getCurrentConditionsApi(cityKey);
        dispatch(dispatchCurrentConditions(result.data))
    } catch (error) {
        dispatch(dispatchError(error))
    }

}


//GEOLOCATION
export const getGeoposition = data => async dispatch => {
    dispatch(loading())
    try {
        const positionRes = await getGeopositionApi(data);
        const getCurrentRes = await getCurrentConditionsApi(positionRes.data.Key);
        const fiveDaysRes = await getFiveDaysWeatherApi(positionRes.data.Key);
        dispatch(dispatchCurrentConditions({ cityKey: positionRes.data.Key, weather: getCurrentRes.data[0] }))
        dispatch(dispatchGetWeather({ weather: { ...fiveDaysRes.data, cityKey: positionRes.data.Key }, cityName: positionRes.data.LocalizedName }))
    } catch (error) {
        dispatch(dispatchError('Error'))
    }

}


//ADD TO FAVORITES
const dispatchAddToFavorites = (data) => {
    return { type: 'ADD_TO_FAVORITES', data: data }
}
export const addToFavorites = data => {
    return dispatch => {
        dispatch(dispatchAddToFavorites(data));
    }
}

//REMOVE FROM FAVORITES
const dispatchRemoveFromFavorites = (data) => {
    return { type: 'REMOVE_FROM_FAVORITES', data: data }
}
export const removeFromFavorites = data => dispatch => {

    dispatch(dispatchRemoveFromFavorites(data));

}

//LOADING
const loading = () => {
    return { type: 'LOADING' }
}

//ERROR
const dispatchError = (data) => {
    return { type: 'ERROR', data: data }
}
export const getError = data => dispatch => {

    dispatch(dispatchError(data));

}

//UNITS
const dispatchUnitsMode = () => {
    return { type: 'CHANGE_UNITS' }
}
export const changeUnitsMode = () => dispatch => {

    dispatch(dispatchUnitsMode());

}

//UNITS
const dispatchNightMode = () => {
    return { type: 'CHANGE_NIGHT_MODE' }
}
export const changeNightMode = () => dispatch => {
    dispatch(dispatchNightMode());
}

