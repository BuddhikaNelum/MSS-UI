import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface IProps {
  image: string;
  title: string;
  description: string;
}

const useStyles = makeStyles({
  featureCard: {
    width: '40%',
    padding: '1.5em',
    overflow: 'hidden',
    boxSizing: 'border-box'
  },
  featureImg: {
    objectFit: 'cover',
    width: '100%'
  }
})

const FeatureCard = ({ image, title, description }: IProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.featureCard}>
      <img src={image} alt='' className={classes.featureImg} />
      <Typography variant="h5" marginTop={2} fontStyle='italic' gutterBottom component="div">
        {title}
      </Typography>

      <Typography variant="body2" fontStyle='italic' gutterBottom>
        {description}
      </Typography>
    </Box>
  );

}

export default FeatureCard;