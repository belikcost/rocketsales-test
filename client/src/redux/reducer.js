import { GET_LEADS_FAIL, GET_LEADS_REQUEST, GET_LEADS_SUCCESS } from "../constants";

const initialState = {
    leadsLoad: true,
    leadsFail: false,
    leads: []
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_LEADS_REQUEST:
            return { ...state, leadsLoad: true };
        case GET_LEADS_FAIL:
            return { ...state, leadsLoad: false, leadsFail: true };
        case GET_LEADS_SUCCESS:
            return { ...state, leadsLoad: false, leads: action.payload };
        default:
            return state;
    }
}