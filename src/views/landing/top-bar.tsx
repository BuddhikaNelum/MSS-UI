import { Box, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Logo from 'assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import RouteRegistry from 'routes/route-registry';

const StyledContainedButton = styled(Button)({
  '&.MuiButtonBase-root': {
    backgroundColor: '#bd935c',
  }
});

const StyledTextButton = styled(Button)({
  '&.MuiButtonBase-root': {
    color: '#bd935c',
  }
});

const useStyles = makeStyles({
  logo: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

const TopBar = () => {
  const classes = useStyles();
  const navigate = useNavigate()

  return (
    <Box display='flex' alignItems='center'>
      {/* links */}
      <Stack spacing={3} direction="row">
        <StyledTextButton variant="text">Holiday</StyledTextButton>
        <StyledTextButton variant="text">Activities</StyledTextButton>
      </Stack>

      {/* logo */}
      <img className={classes.logo} src={Logo} alt="Logo" />

      {/* main actions */}
      <Stack spacing={2} direction="row">
        <StyledTextButton variant="text">Reservations</StyledTextButton>
        <StyledContainedButton variant="contained" onClick={() => navigate(RouteRegistry.user.paths.signIn.path)}>Login</StyledContainedButton>
      </Stack>
    </Box>
  );

}

export default TopBar;