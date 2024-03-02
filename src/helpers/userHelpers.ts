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

  if (!isValidPassword(user.password)) {
    return {
      message:
        "Enter a valid password! password should contain at least 6 characters, at least one digit, at least one uppercase character and at least one special character",
    };
  }

  return null;
};

const isValidUserName = (username: string): boolean => {
  const userNameRegex = /^[a-zA-Z0-9]*$/;
  return userNameRegex.test(username);
};

const isValidPassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/;
  return passwordRegex.test(password);
};
