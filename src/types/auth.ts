import { UserType } from "enums/userType";

type TSignUpRequest = {
  email: string;
  name: string;
  phone: string;
  businessRegNo: string;
  userType: UserType,
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