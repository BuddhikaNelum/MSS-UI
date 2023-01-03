import { AppScreen } from "enums/screen"

type TAppScreen = Record<AppScreen, number>;

const topBarTitle: { [key in keyof TAppScreen]: string } = {
  [AppScreen.DEPARTMENTS]: "Departments",
  [AppScreen.INVENTORY]: "Inventory",
  [AppScreen.EMPLOYEES]: "Employees",
  [AppScreen.ORDERS]: "Orders",
  [AppScreen.JOBS]: "Jobs"
}

export {
  topBarTitle
}