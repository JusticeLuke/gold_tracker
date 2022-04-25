const intialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = intialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
