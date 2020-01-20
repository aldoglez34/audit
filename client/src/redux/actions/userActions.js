export const setUserInfo = data => {
  return {
    type: "user/setUserInfo",
    data
  };
};

export const deleteUserInfo = () => {
  return {
    type: "user/deleteUserInfo"
  };
};
