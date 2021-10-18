import { GET_LEADS_REQUEST, GET_LEADS_SUCCESS } from "../constants";


export const getLeadsRequest = (data) => ({type: GET_LEADS_REQUEST, payload: data});
export const getLeadsSuccess = (data) => ({type: GET_LEADS_SUCCESS, payload: data});
