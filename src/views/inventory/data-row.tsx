import { Chip, TableCell, TableRow } from "@mui/material";
import { BookingStatus } from "enums/bookingStatus";
import { TBooking } from "types/reservation";
import { formatDateTime } from "utils/date-util";
interface IProps {
  row: TBooking;
  onViewDetails: () => void;
}

const DataRow = ({ row }: IProps) => {

  return (
    <TableRow
      key={row.referenceId}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {`${row.referenceId}`}
      </TableCell>
      <TableCell>{row.guestName}</TableCell>
      <TableCell>{row.roomNo}</TableCell>
      <TableCell>{formatDateTime(row.checkinDate)}</TableCell>
      <TableCell>{formatDateTime(row.checkoutDate)}</TableCell>

      <TableCell align="center">
        {
          BookingStatus.ACTIVE === row.bookingStatus
            ? <Chip label="Active" color="success" variant="filled" />
            : <Chip label="Inactive" color="error" variant="filled" />
        }
      </TableCell>

      <TableCell align="center">
        {
          BookingStatus.ACTIVE === row.paymentStatus
            ? <Chip label="Active" color="success" variant="filled" />
            : <Chip label="Inactive" color="error" variant="filled" />
        }
      </TableCell>
    </TableRow>
  );
}

export default DataRow;