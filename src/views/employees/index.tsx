import { useEffect } from "react";
import EmployeeCreate from "./employee-create";
import EmployeeList from "./employee-list";
import { useAppDispatch } from "hooks/hooks";
import { setCurrScreen } from "features/app-slice";
import { AppScreen } from "enums/screen";

const Employees = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrScreen(AppScreen.MANAGE_CLERK));
  }, []);

  return (
    <>
      <EmployeeList />
      <EmployeeCreate />
    </>
  );
}

export default Employees;