import { styled } from "@material-ui/styles";
import { AppBar, Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LuggageIcon from '@mui/icons-material/Luggage';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { selectCurrScreen } from 'features/app-slice';
import { AppScreen } from "enums/screen";
import { topBarTitle } from "./metadata";
import { openCreateHotelDrawer } from "features/inventory-slice";
import { openCreateHotelReservation } from "features/orders-slice";
import { openCreateEmployee } from "features/employees-slice";
import { openCreateRoomDrawer } from "features/departments-slice";

const TopBar = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const currScreen = useAppSelector(selectCurrScreen);

  const getTitle = () => {
    switch (currScreen) {
      case AppScreen.RESERVATIONS:
        return topBarTitle[currScreen];
      case AppScreen.MANAGE_HOTELS:
        return topBarTitle[currScreen];
      case AppScreen.HOTEL_ROOMS:
        return topBarTitle[currScreen];
      case AppScreen.MANAGE_CLERK:
        return topBarTitle[currScreen];
      case AppScreen.JOBS:
        return topBarTitle[currScreen];
      default:
        break;
    }
  }

  const getIcon = () => {
    switch (currScreen) {
      case AppScreen.RESERVATIONS:
        return <EventAvailableIcon />;
      case AppScreen.MANAGE_HOTELS:
      case AppScreen.HOTEL_ROOMS:
        return <BedOutlinedIcon />;
      case AppScreen.MANAGE_CLERK:
        return <BadgeOutlinedIcon />;
      case AppScreen.JOBS:
        return <LuggageIcon />;
      default:
        break;
    }
  }

  const AppToolbar = styled(Toolbar)(() => ({
    backgroundColor: theme.palette.primary.main
  }));

  const handlePrimaryAction = () => {
    switch (currScreen) {
      case AppScreen.RESERVATIONS:
        dispatch(openCreateHotelReservation());
        break;
      case AppScreen.MANAGE_HOTELS:
        dispatch(openCreateHotelDrawer());
        break;
      case AppScreen.HOTEL_ROOMS:
        dispatch(openCreateRoomDrawer());
        break;
      case AppScreen.MANAGE_CLERK:
        dispatch(openCreateEmployee());
        break;
      case AppScreen.JOBS:
        break;
      default:
        break;
    }
  }

  return (
    <AppBar position="static">
      <AppToolbar sx={{ paddingY: 0 }}>
        {getIcon()}
        <Typography
          variant="h6"
          noWrap
          sx={{
            ml: 1,
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          {getTitle()}
        </Typography>

        <Box sx={{ marginLeft: 'auto' }}>
          <Button sx={{ color: '#fff' }} variant='outlined' onClick={handlePrimaryAction} color='secondary'>
            New Record
          </Button>
        </Box>
      </AppToolbar>
    </AppBar>
  )
}

export default TopBar;