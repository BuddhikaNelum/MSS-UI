import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { TUser } from 'types/auth';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  fill: theme.palette.primary.light
}));

interface IProps {
  menu: any,
  user?: TUser
}

const Menu = ({ menu, user }: IProps) => {

  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const renderSubMenuItems = () => {
    return menu.children.map(({ id, icon, active, path, roles }: any) => (
      <ListItemButton
        key={id}
        component={NavLink}
        to={path}
      >
        <StyledListItemIcon sx={{ marginLeft: '1rem' }}>{icon}</StyledListItemIcon>
        <ListItemText sx={{ marginRight: '1rem' }}>
          {id}
        </ListItemText>
      </ListItemButton>
    ))
  }
  console.log(menu, user);

  return (
    <>
      <ListItem onClick={toggleMenu}>
        <ListItemText>
          {menu.id}
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {renderSubMenuItems()}
        </List>
      </Collapse>
    </>
  );

}

export default Menu;