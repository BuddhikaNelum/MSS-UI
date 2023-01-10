import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Drawer, List, Typography, useTheme } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Menu from "./menu";
import RouteRegistry from "routes/route-registry";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from '@mui/icons-material/Person';
import { removeValue } from "utils/storage-util";
import { UserType } from "enums/userType";
import { useAppSelector } from "hooks/hooks";
import { selectCurrUser } from "features/app-slice";
import Logo from "assets/images/logo.jpeg";

const categories = [
  {
    id: "User Management",
    roles: [UserType.MANAGER],
    children: [
      {
        id: "Employees",
        icon: <PersonIcon />,
        active: true,
        path: RouteRegistry.app.paths.employees.path,
        roles: [UserType.MANAGER],
      },
    ],
  },
  {
    id: "Manage",
    roles: [UserType.MANAGER],
    children: [
      {
        id: "Departments",
        icon: <BusinessIcon />,
        active: true,
        path: RouteRegistry.app.paths.departments.path,
        roles: [UserType.MANAGER],
      },
      {
        id: "Jobs",
        icon: <AssignmentIcon />,
        active: true,
        path: RouteRegistry.app.paths.jobs.path,
        roles: [UserType.MANAGER],
      },
      {
        id: "Orders",
        icon: <AssignmentTurnedInIcon />,
        active: true,
        path: RouteRegistry.app.paths.orders.path,
        roles: [UserType.MANAGER],
      },
      {
        id: "Inventory",
        icon: <InventoryIcon />,
        active: false,
        path: RouteRegistry.app.paths.inventory.path,
        roles: [UserType.MANAGER],
      },
    ],
  },
];

const drawerWidth = 256;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  border: "0",
  backgroundColor: theme.palette.primary.main,
  width: drawerWidth,
  "& .MuiDrawer-paper": {
    overflow: "hidden",
  },
}));

const SideNav = () => {
  const mdTheme = useTheme();
  const user = useAppSelector(selectCurrUser);

  const handleLogout = () => {
    removeValue(process.env.REACT_APP_USER_INFO!);
    removeValue(process.env.REACT_APP_USER_SESSION!);
    window.location.reload();
  };

  return (
    <StyledDrawer variant="permanent" open={true}>
      <Box
        style={{
          backgroundColor: mdTheme.palette.primary.main,
          height: "100%",
          width: drawerWidth,
        }}
      >
        <Box
          sx={{
            height: "fit-content",
            width: "fit-content",
            marginX: "auto",
            paddingY: 2,
          }}
        >
          <img width="auto" height={100} src={Logo} alt="Logo" />

          {/* <Typography
            color="white"
            letterSpacing={1}
            fontWeight="bold"
            variant="h2"
          >
            <LockIcon />
            {' '}
            LOCK HOOD
          </Typography> */}
        </Box>
        <List disablePadding>
          {categories.map((menu) => (
            <React.Fragment key={menu.id}>
              <Menu menu={menu} user={user} />
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          backgroundColor: mdTheme.palette.primary.main,
          boxSizing: "border-box",
          padding: "15px",
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </StyledDrawer>
  );
};

export default SideNav;
