import { Suspense, useState } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  featuresLayout: {
    backgroundColor: '#ffedd5',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    width: '100vw'
  },
  contentLayout: {
    width: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  topBarAndBannerLayout: {
    backgroundColor: '#041934'
  },
  footer: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    backgroundColor: '#041934',
    color: '#ffedd555'
  },
  imgBanner: {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    marginBottom: '6rem'
  },
  featureHead: {
    width: '40%',
    padding: '1.5rem',
    boxSizing: 'border-box'
  }
})

const Landing = () => {
  const [newReservationPop, setNewReservationPop] = useState<boolean>(false);
  const [stayInfo, setStayInfo] = useState<any>();

  const classes = useStyles();

  const handleCloseNewReservation = () => {
    setNewReservationPop(false)
    setStayInfo(false)
  }

  const handleInitiateReservation = (stayInfo: any) => {
    setNewReservationPop(!newReservationPop);
    setStayInfo(stayInfo)
  }

  return (
    <Suspense fallback={<div className="loading" />}>
      <Box>
        
      </Box>
    </Suspense>
  );

}

export default Landing;