import { UserType } from "enums/userType"

type TEmployeeCreate = {
  userType: UserType,
  email: string,
  name: string,
  phone: string,
  password: string
}

type TEmployee = {
  id: number,
  userType: UserType,
  email: string,
  name: string,
  phone: string,
}

export type {
  TEmployeeCreate,
  TEmployee
}