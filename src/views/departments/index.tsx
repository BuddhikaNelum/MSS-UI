import { useEffect } from "react";
import { useAppDispatch } from "hooks/hooks";
import { setCurrScreen } from "features/app-slice";
import { AppScreen } from "enums/screen";
import DepartmentList from "./department-list";
import DepartmentsCreate from "./department-create";
import DepartmentDetails from "./department-details";

const ManageDepartments = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrScreen(AppScreen.MANAGE_HOTELS));
  }, []);

  return (
    <>
      <DepartmentList />
      <DepartmentsCreate />
      <DepartmentDetails />
    </>
  );
}

export default ManageDepartments;