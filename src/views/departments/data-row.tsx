import { Divider, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import { THotel } from "types/hotel";
interface IProps {
  row: THotel,
  onViewDetails: (hotel: THotel) => void;
  onUpdateDetails: (hotel: THotel) => void;
}

const DataRow = ({ row, onViewDetails, onUpdateDetails }: IProps) => {

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}    >
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.contact}</TableCell>
      <TableCell>{row.checkinFrom}</TableCell>
      <TableCell>{row.checkoutBefore}</TableCell>

      <TableCell align="right">
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
          alignItems='center'
          justifyContent='end'
        >
          <IconButton aria-label="delete" onClick={() => onUpdateDetails(row)}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={() => onViewDetails(row)}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
      </TableCell>

    </TableRow>
  );
}

export default DataRow;