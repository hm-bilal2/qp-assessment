import { User } from "../models/User";

export const validateUser = (user: User): Object | null => {
  if (!user.username) {
    return {
      message: "username not found",
    };
  }

  if (!isValidUserName(user.username)) {
    return {
      message: "Enter Valid username",
    };
  }

  return null;
};

const isValidUserName = (username: string): boolean => {
  const userNameRegex = /^[a-zA-Z0-9]*$/;
  return userNameRegex.test(username);
};
