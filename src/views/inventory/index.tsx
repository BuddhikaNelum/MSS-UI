import { useEffect } from "react";
import { useAppDispatch } from "hooks/hooks";
import { setCurrScreen } from "features/app-slice";
import { AppScreen } from "enums/screen";
import InventoryCreate from "./inventory-create";
import InventoryList from "./inventory-list";
import InventoryDetails from "./inventory-details";

const ManageInventory = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrScreen(AppScreen.RESERVATIONS));
  }, []);

  return (
    <>
      <InventoryList />
      <InventoryCreate />
      <InventoryDetails />
    </>
  );
}

export default ManageInventory;