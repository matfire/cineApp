import {createStore} from 'redux'


const INITIAL_STATE = {
    user: {}
}

const cineReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

const store = createStore(cineReducer)

export default store