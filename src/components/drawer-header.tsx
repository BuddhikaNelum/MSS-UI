import { Box, IconButton, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

interface IProps {
  title: string;
  onClose: () => void;
}

function DrawerHeader({ title, onClose }: IProps) {

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' marginBottom={1}>
      <Typography variant='h5'>{title}</Typography>

      <IconButton onClick={onClose}>
        <CloseOutlinedIcon />
      </IconButton>
    </Box>
  );
}

export default DrawerHeader;