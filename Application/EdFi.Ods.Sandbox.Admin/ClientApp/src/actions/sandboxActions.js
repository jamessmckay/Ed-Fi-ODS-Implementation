// thunk gives us the ability to do an async call against an endpoint inside of the action
// this allows us to use the reducer only to update the state

// import api from './api';
// import { ACTION_TYPES } from '../constants/action_types';

// export const fetchAll = () => (dispatch) => {
//   api
//     .sandbox()
//     .fetchAll()
//     .then((response) => {
//       console.log(response);

//       dispatch({
//         type: ACTION_TYPES.FETCH,
//         payload: response.data,
//       });
//     })
//     .catch((error) => console.log(error));
// };
