import {actionTypes} from './cashAccountActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
    SELL,
    INVEST,
} = actionTypes;

const initialState = {
    data: null,
    dataStatus: Api.initialStatus,
};

export default function cashAccount(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SELL[REQUEST]:
            return {
                ...state,
                dataStatus: Api.requestStatus,
            };
        case SELL[SUCCESS]:
            return {
                ...state,
                data: payload,
                dataStatus: Api.successStatus,
            };
        case SELL[FAILURE]:
            return {
                ...state,
                dataStatus: Api.failStatus,
            };
        case INVEST[REQUEST]:
            return {
                ...state,
                dataStatus: Api.requestStatus,
            };
        case INVEST[SUCCESS]:
            return {
                ...state,
                data: payload,
                dataStatus: Api.successStatus,
            };
        case INVEST[FAILURE]:
            return {
                ...state,
                dataStatus: Api.failStatus,
            };
        default:
            return state;
    }
}

