import { TableCell, TableRow, Divider, Stack, IconButton } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import { TEmployee } from "types/employee";
interface IProps {
  row: any
  onViewDetails: (room: TEmployee) => void;
  onUpdateDetails: (room: TEmployee) => void;
}

const DataRow = ({ row, onViewDetails, onUpdateDetails }: IProps) => {

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}    >
      <TableCell scope="row">{row.id}</TableCell>
      <TableCell scope="row">{row.name}</TableCell>
      <TableCell scope="row">{row.email}</TableCell>
      <TableCell scope="row">{row.phone}</TableCell>
      <TableCell>{row.email}</TableCell>


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