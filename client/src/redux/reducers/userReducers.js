const userReducers = (state = { isLogged: false }, action) => {
  switch (action.type) {
    case "user/login":
      return {
        isLogged: true,
        firebase_uid: action.data.firebase_uid,
        role: action.data.role,
        name: action.data.name,
        firstSurname: action.data.firstSurname,
        secondSurname: action.data.secondSurname,
        email: action.data.email
      };
    case "user/logout":
      return {
        isLogged: false
      };
    default:
      return state;
  }
};

export default userReducers;
