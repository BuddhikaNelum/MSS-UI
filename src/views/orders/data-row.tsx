import { Chip, Divider, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import { THotelRoom } from "types/hotelRoom";
import { roomTypeOptions } from "./metadata";
import { RoomType } from "enums/roomType";

interface IProps {
  data: THotelRoom,
  onViewDetails: (room: THotelRoom) => void;
  onUpdateDetails: (room: THotelRoom) => void;
}

const DataRow = ({ data, onViewDetails, onUpdateDetails }: IProps) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}    >
      <TableCell>{data.roomNumber}</TableCell>
      <TableCell>{roomTypeOptions[RoomType[data.roomType]]}</TableCell>
      <TableCell align="right">{data.beds}</TableCell>
      <TableCell align="right">{data.occupants}</TableCell>
      <TableCell align="right">{data.price.toLocaleString()}</TableCell>
      
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