import { AppScreen } from "enums/screen"

type TAppScreen = Record<AppScreen, number>;

const topBarTitle: { [key in keyof TAppScreen]: string } = {
  [AppScreen.RESERVATIONS]: "Reservations",
  [AppScreen.MANAGE_HOTELS]: "Manage Hotels",
  [AppScreen.HOTEL_ROOMS]: "Manage Hotel Rooms",
  [AppScreen.MANAGE_CLERK]: "Manage Clerks",
  [AppScreen.JOBS]: "Jobs"
}

export {
  topBarTitle
}