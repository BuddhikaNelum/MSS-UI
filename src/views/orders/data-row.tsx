import { Divider, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import { TOrder } from "types/order";

interface IProps {
  data: TOrder,
  onViewDetails: (room: TOrder) => void;
  onUpdateDetails: (room: TOrder) => void;
}

const DataRow = ({ data, onViewDetails, onUpdateDetails }: IProps) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}    >
      <TableCell>{data._id}</TableCell>
      <TableCell>{data.status}</TableCell>
      <TableCell>{data.createdAt}</TableCell>
      <TableCell>{data.completedAt}</TableCell>
      
      <TableCell align="right">
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
          alignItems='center'
          justifyContent='end'
        >
          <IconButton aria-label="delete" onClick={() => onUpdateDetails(data)}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={() => onViewDetails(data)}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
      </TableCell>

    </TableRow>
  );
}

export default DataRow;