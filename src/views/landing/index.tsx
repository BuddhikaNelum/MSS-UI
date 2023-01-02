import { Suspense, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FeatureCard from './feature-card';
import TopBar from './top-bar';
import CreateReservation from './create-reservation';
import CheckReservation from './check-reservation';

import ImgSpa from 'assets/images/spa.jpg';
import ImgBuffet from 'assets/images/buffet.jpg';
import ImgMocktail from 'assets/images/mocktail.jpg';
import ImgBedroom from 'assets/images/bedroom.jpg';
import Banner from 'assets/images/banner.jpg';
import PaymentVerification from './payment-verification';

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
        <div className={classes.topBarAndBannerLayout}>
          <Box className={classes.contentLayout} position='relative'>
            <TopBar />
            <img src={Banner} alt="Banner" className={classes.imgBanner} />

            <CheckReservation onInitiateReservation={handleInitiateReservation} />
          </Box>
        </div>

        <div className={classes.featuresLayout}>
          <Box display='flex' flexWrap='wrap' justifyContent='center' gap={2} className={classes.contentLayout}>
            <Typography className={classes.featureHead} fontSize='3rem' fontWeight='bold'>Treat Yourself</Typography>
            <Typography className={classes.featureHead}>To make your stay special - and even more memorable - we've created vacation packages desined to let you dive in and explore the very best of 'The Inifinity'.</Typography>

            <FeatureCard image={ImgSpa} title={'Spa Credit Package'} description={'Relax and unwind art with "Infinity Spa" with a daily $25 spa credit!'} />
            <FeatureCard image={ImgBuffet} title={'Food & Beverage Credit Package'} description={'Savor something tasty at the "Infinity Club Restaurant" or choose to relax in your room with In-Room.'} />
            <FeatureCard image={ImgBedroom} title={'Stay Longer, Save More'} description={'Visit "The Infinity" for as long as you wish. The longer you stay, the more you save!'} />
            <FeatureCard image={ImgMocktail} title={'Friends Getaway'} description={'Get the friends together for an escape to "Infinity Cuisine" including a discount at lunch & dinner!'} />
          </Box>
        </div>

        <div className={classes.footer}>
          <Box className={classes.contentLayout} position='relative'>
            <Typography variant='body1'>&copy; Infinity Group Hotels</Typography>
          </Box>
        </div>

        <CreateReservation open={newReservationPop} stayInfo={stayInfo} onClose={handleCloseNewReservation}  />

        <PaymentVerification />
      </Box>
    </Suspense>
  );

}

export default Landing;