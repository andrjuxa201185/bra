// import {actionTypes} from './plaidActions';
// import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
// import Api from "../../service/api";
//
// const {
//   SET_INFO,
// } = actionTypes;
//
// const initialState = {
//   plaidData: null,
//   plaidDataStatus: Api.initialStatus,
// };
//
// export default function plaidInfo(state = initialState, action) {
//   const {type, payload} = action;
//   switch (type) {
//     case SET_INFO[REQUEST]:
//       return {
//         ...state,
//         plaidDataStatus: Api.requestStatus,
//       };
//     //case UPDATE_DEEP[SUCCESS]:
//     case SET_INFO[SUCCESS]:
//       return {
//         ...state,
//         plaidData: payload,
//         plaidDataStatus: Api.successStatus,
//       };
//     case SET_INFO[FAILURE]:
//       return {
//         ...state,
//         plaidDataStatus: Api.failStatus,
//       };
//     default:
//       return state;
//   }
// }
//
