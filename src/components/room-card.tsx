import { Box, Card, CardContent, CardMedia, colors, Divider, Stack, Typography, useTheme } from "@mui/material";
import KingBedIcon from '@mui/icons-material/KingBed';
import PersonIcon from '@mui/icons-material/Person';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import PaidIcon from '@mui/icons-material/Paid';

interface IProps {
  isSelected: boolean;
}

const RoomCard = ({ isSelected }: IProps) => {
  const mdTheme = useTheme();

  const bgColor = isSelected ? mdTheme.palette.primary[200] : colors.common.white;

  return (
    <Card sx={{ display: 'flex', cursor: 'pointer', border: `1px solid ${mdTheme.palette.grey[300]}`, backgroundColor: bgColor }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, alignItems: 'center' }}>
        <CardContent sx={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            alignItems='center'
          >
            <AirlineSeatIndividualSuiteIcon fontSize="small" />
            <Typography component="div" variant="body1">
              Premium Double Room
            </Typography>
          </Stack>

          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            alignItems='center'
          >
            <KingBedIcon fontSize="small" />
            <Typography component="div" variant="body1">
              1
            </Typography>
          </Stack>

          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            alignItems='center'
          >
            <PersonIcon fontSize="small" />
            <Typography component="div" variant="body1">
              2
            </Typography>
          </Stack>

          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            alignItems='center'
          >
            <PaidIcon fontSize="small" />
            <Typography component="div" variant="body1">
              $100
            </Typography>
          </Stack>

        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 220 }}
        image="https://www.momondo.com/rimg/himg/2e/00/a3/ice-363070-96813521-698241.jpg"
        alt="Live from space album cover"
      />
    </Card >
  );

}

export default RoomCard;