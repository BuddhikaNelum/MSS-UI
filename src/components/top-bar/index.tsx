import { styled } from "@material-ui/styles";
import { AppBar, Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from "@mui/icons-material/Person";
import { selectCurrScreen } from "features/app-slice";
import { AppScreen } from "enums/screen";
import { topBarTitle } from "./metadata";
import { openCreateDrawer as openCreateInventoryDrawer } from "features/inventory-slice";
import { openCreateDrawer as openCreateJobDrawer } from "features/jobs-slice";
import { openCreateDrawer as openCreateOrderDrawer } from "features/orders-slice";
import { openCreateDrawer as openCreateEmployeeDrawer } from "features/employees-slice";
import { openCreateDrawer as openCreateDepartmentDrawer } from "features/departments-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";

const TopBar = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const currScreen = useAppSelector(selectCurrScreen);

  console.log("currScreen", currScreen);
  

  const getTitle = () => {
    debugger;
    switch (currScreen) {
      case AppScreen.DASHBOARD:
        return topBarTitle[currScreen];
      case AppScreen.DEPARTMENTS:
        return topBarTitle[currScreen];
      case AppScreen.INVENTORY:
        return topBarTitle[currScreen];
      case AppScreen.EMPLOYEES:
        return topBarTitle[currScreen];
      case AppScreen.ORDERS:
        return topBarTitle[currScreen];
      case AppScreen.JOBS:
        return topBarTitle[currScreen];
      default:
        break;
    }
  };

  const getIcon = () => {
    switch (currScreen) {
      case AppScreen.DASHBOARD:
        return <DashboardIcon />;
      case AppScreen.DEPARTMENTS:
        return <BusinessIcon />;
      case AppScreen.INVENTORY:
        return <InventoryIcon />;
      case AppScreen.EMPLOYEES:
        return <PersonIcon />;
      case AppScreen.ORDERS:
        return <AssignmentTurnedInIcon />;
      case AppScreen.JOBS:
        return <AssignmentIcon />;
      default:
        break;
    }
  };

  const AppToolbar = styled(Toolbar)(() => ({
    backgroundColor: theme.palette.primary.main,
  }));

  const handlePrimaryAction = () => {
    switch (currScreen) {
      case AppScreen.DEPARTMENTS:
        dispatch(openCreateDepartmentDrawer());
        break;
      case AppScreen.INVENTORY:
        dispatch(openCreateInventoryDrawer());
        break;
      case AppScreen.EMPLOYEES:
        dispatch(openCreateEmployeeDrawer());
        break;
      case AppScreen.ORDERS:
        dispatch(openCreateOrderDrawer());
        break;
      case AppScreen.JOBS:
        dispatch(openCreateJobDrawer());
        break;
      default:
        break;
    }
  };

  const isNewRecordBtnEnabled = currScreen !== AppScreen.ORDERS;

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
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {getTitle()}
        </Typography>

        {currScreen === 0 ? <></> : 
        <Box sx={{ marginLeft: 'auto' }}>
          <Button sx={{ color: '#fff' }} variant='outlined' onClick={handlePrimaryAction} color='secondary'>
            New Record
          </Button>
        </Box>
        }
      </AppToolbar>
    </AppBar>
  );
};

export default TopBar;
