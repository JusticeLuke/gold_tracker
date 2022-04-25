import { GET_PARTYS } from "../actions/Types";

const intialState = {
  partys: [],
};

export default function (state = intialState, action: any) {
  switch (action.type) {
    case GET_PARTYS:
      return {
        ...state,
        partys: action.payload,
      };
    default:
      return state;
  }
}
