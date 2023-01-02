import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  const StyledRootLayout = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }));

  return (
    <StyledRootLayout>
      <Box>
        <Outlet />
      </Box>
    </StyledRootLayout>
  );

}

export default UserLayout;