const userReducers = (state = {}, action) => {
  switch (action.type) {
    case "user/setUserInfo":
      return {
        isLogged: true,
        firebase_uid: action.data.firebase_uid,
        role: action.data.role,
        name: action.data.name,
        firstSurname: action.data.firstSurname,
        secondSurname: action.data.secondSurname,
        email: action.data.email
      };
    case "user/deleteUserInfo":
      return {};
    default:
      return state;
  }
};

export default userReducers;
