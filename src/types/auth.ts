import { UserType } from "enums/userType";

type TUser = {
  id: number;
  email: string;
  userName: string;
  userType: number;
  token: string;
};

type TSignUpRequest = {
  userType: UserType;
  email: string;
  username: string;
  phoneNumber: string;
  departmentId: number;
  password: string;
};

type TSignInRequest = {
  email: string;
  password: string;
};

type TSignInResponse = TUser;

export type { TSignUpRequest, TSignInRequest, TSignInResponse, TUser };
