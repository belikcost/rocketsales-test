import { GET_LEADS_SUCCESS } from "../constants";

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case GET_LEADS_SUCCESS:
            return {...state, leads: action.payload};
        default:
            return state;
    }
}