import { UserType } from "enums/userType";

type TRoomType = Omit<typeof UserType, "CUSTOMER" | "TRAVEL_AGENCY">;

export const employeeTypeOptions: { [key in keyof TRoomType]: string } = {
  MANAGER: "Manager",
  SUPERVISOR: "Supervisor",
  EMPLOYEE: "Employee",
};
