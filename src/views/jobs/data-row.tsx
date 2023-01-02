import { Chip, Divider, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
  row: any;
  onViewDetails: () => void;
}

const DataRow = ({ row, onViewDetails }: IProps) => {

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}    >
      <TableCell scope="row">{row.company}</TableCell>
      <TableCell scope="row">{row.email}</TableCell>
      <TableCell scope="row">{row.phone}</TableCell>
      <TableCell>
        {row.isActive
          ? <Chip label="Active" color="success" variant="outlined" />
          : <Chip label="inactive" color="primary" variant="outlined" />
        }
      </TableCell>

      <TableCell align="right">
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
          alignItems='center'
          justifyContent='end'
        >
          <IconButton aria-label="delete">
            <EditIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={onViewDetails}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default DataRow;