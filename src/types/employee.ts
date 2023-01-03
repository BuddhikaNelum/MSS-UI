import { UserType } from "enums/userType"

type TEmployeeCreate = {
  userType: UserType,
  email: string,
  name: string,
  phone: string,
  password: string
}

type TEmployee = {
  _id: string;
  name: string;
  role: string;
  department: string;
  email: string;
}

export type {
  TEmployeeCreate,
  TEmployee
}