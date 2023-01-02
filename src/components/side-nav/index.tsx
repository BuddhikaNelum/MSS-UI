import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Drawer, List, useTheme } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Menu from './menu';
import RouteRegistry from 'routes/route-registry';
import LuggageIcon from '@mui/icons-material/Luggage';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Logo from 'assets/images/logo.png';
import { removeValue } from 'utils/storage-util';
import { UserType } from 'enums/userType';
import { useAppSelector } from 'hooks/hooks';
import { selectCurrUser } from 'features/app-slice';

const categories = [
  {
    id: 'User Management',
    roles: [UserType.MANAGER, UserType.CLERK],
    children: [
      { id: 'Reservations', icon: <EventAvailableIcon />, active: true, path: RouteRegistry.app.paths.employees.path, roles: [UserType.MANAGER, UserType.CLERK] },
    ],
  },
  {
    id: 'Manage',
    roles: [UserType.MANAGER],
    children: [
      { id: 'Departments', icon: <BedOutlinedIcon />, active: true, path: RouteRegistry.app.paths.departments.path, roles: [UserType.MANAGER] },
      { id: 'Jobs', icon: <BedOutlinedIcon />, active: true, path: RouteRegistry.app.paths.jobs.path, roles: [UserType.MANAGER] },
      { id: 'Orders', icon: <BadgeOutlinedIcon />, active: true, path: RouteRegistry.app.paths.orders.path, roles: [UserType.MANAGER] },
      { id: 'Inventory', icon: <LuggageIcon />, active: false, path: RouteRegistry.app.paths.inventory.path, roles: [UserType.MANAGER] },
    ],
  },
];

const drawerWidth = 256;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  border: '0',
  backgroundColor: theme.palette.primary.main,
  width: drawerWidth,
  '& .MuiDrawer-paper': {
    overflow: 'hidden'
  }
}));

const SideNav = () => {
  const mdTheme = useTheme();
  const user = useAppSelector(selectCurrUser);

  const handleLogout = () => {
    removeValue(process.env.REACT_APP_USER_INFO!)
    removeValue(process.env.REACT_APP_USER_SESSION!)
    window.location.reload()
  }

  return (
    <StyledDrawer variant='permanent' open={true}>
      <Box style={{ backgroundColor: mdTheme.palette.primary.main, height: '100%', width: drawerWidth }}>
        <Box sx={{ height: 'fit-content', width: 'fit-content', marginX: 'auto' }}>
          <img width={100} height={100} src={Logo} alt="Logo" />
        </Box>
        <List disablePadding>
          {categories.map((menu) => (
            <React.Fragment key={menu.id}>
              <Menu menu={menu} user={user} />
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box sx={{ backgroundColor: mdTheme.palette.primary.main, boxSizing: 'border-box', padding: '15px' }}>
        <Button fullWidth variant="outlined" color='secondary' onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </StyledDrawer>
  );
}

export default SideNav;