import { UserType } from "enums/userType";

type TSignUpRequest = {
  userType: UserType,
  email: string;
  username: string;
  phoneNumber: string;
  departmentId: number;
  password: string;
}

type TSignInRequest = {
  email: string;
  password: string;
}

type TSignInResponse = {
  name: string;
  businessRegNo: string;
  userType: UserType,
  userId: number;
  token: string;
}

type TUser = {
  name: string;
  userType: UserType;
  userId: number;
  businessRegNo: string;
}

export type {
  TSignUpRequest,
  TSignInRequest,
  TSignInResponse,
  TUser,
}