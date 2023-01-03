import { useEffect } from "react";
import { useAppDispatch } from "hooks/hooks";
import { setCurrScreen } from "features/app-slice";
import { AppScreen } from "enums/screen";
import OrderList from "./order-list";
import OrderDetails from "./order-details";
import OrderCreate from "./order-create";

const ManageOrders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrScreen(AppScreen.EMPLOYEES));
  }, []);

  return (
    <>
      <OrderList />
      <OrderCreate />
      <OrderDetails />
    </>
  );
}

export default ManageOrders;