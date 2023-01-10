import { useEffect } from "react";
import { useAppDispatch } from "hooks/hooks";
import { setCurrScreen } from "features/app-slice";
import { AppScreen } from "enums/screen";
import OrderList from "./order-list";
import OrderDetails from "./order-details";

const ManageOrders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrScreen(AppScreen.ORDERS));
  }, []);

  return (
    <>
      <OrderList />
      <OrderDetails />
    </>
  );
}

export default ManageOrders;