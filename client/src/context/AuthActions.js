export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  playload: user,
});

export const LoginFail = (error) => ({
  type: "LOGIN_FAIL",
  playload: error,
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  playload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  playload: userId,
});
