import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import SideNav from 'components/side-nav';
import TopBar from 'components/top-bar';

const AppLayout = () => {
  const mdTheme = useTheme();

  const ContentWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    width: 'calc(100vw - 256px)',
    height: '100vh',
    flexDirection: 'column',
  }))

  return (
    <Box display={"flex"}>
      <SideNav />
      <ContentWrapper>
        <TopBar />

        <Box flexGrow={1} sx={{
          maxHeight: 'calc(100vh - 64px - 3rem)',
          height: '100vh',
          padding: '1rem', 
          margin: '1rem',
          borderRadius: '0.5em',
          backgroundColor: mdTheme.palette.grey[50],
          overflow: 'auto'
        }}>
          <Outlet />
        </Box>
      </ContentWrapper>
    </Box>
  );

}

export default AppLayout;