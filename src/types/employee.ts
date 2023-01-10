import { UserType } from "enums/userType";

type TEmployeeCreate = {
  userType: UserType;
  email: string;
  name: string;
  phone: string;
  password: string;
};

type TEmployeeSample = {
  _id: string;
  name: string;
  role: string;
  department: string;
  email: string;
};

type TEmployee = {
  id: number;
  userType: number;
  departmentId: number;
  department: any;
  createdOn: string;
  updatedOn: string;
  userRoles: any;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  phoneNumber: string;
};

export type { TEmployeeCreate, TEmployee, TEmployeeSample };
