export const loginUser = data => {
  return {
    type: "user/login",
    data
  };
};

export const logoutUser = () => {
  return {
    type: "user/logout"
  };
};
