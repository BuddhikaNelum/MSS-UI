import { UserType } from "enums/userType";
import { TUser } from "types/auth";

const getCurrentUser = (needDecrypt?: boolean): TUser | undefined => {
  try {
    const data = getValue(process.env.REACT_APP_USER_INFO!);
    const user = data ? JSON.parse(data) : undefined;
    user.userType = parseInt(user?.userType)
    return user
  } catch (error) {
    console.log("getCurrentUser -> error", error);
    return undefined;
  }
};

const setCurrentUser = (user: TUser, needEncrypt?: boolean) => {
  try {
    setValue(process.env.REACT_APP_USER_INFO!, JSON.stringify(user));
  } catch (error) {
    console.log("setCurrentUser -> error", error);
  }
};

const setValue = (key: string, value: any, needEncrypt?: boolean) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.log("error", e);
  }
};

const getValue = (key: string, needDecrypt?: boolean) => {
  try {
    let prepValue = localStorage.getItem(key);
    return prepValue;
  } catch (e) {
    console.log("getValue -> error", e);
    return null;
  }
};

const removeValue = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.log("removeValue -> error", e);
  }
};

export {
  getCurrentUser,
  setCurrentUser,
  setValue,
  getValue,
  removeValue,
};