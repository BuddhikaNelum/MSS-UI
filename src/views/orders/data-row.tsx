import { Chip, Divider, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import { TOrder } from "types/order";
import { formatDateTime } from "utils/date-util";

interface IProps {
  data: TOrder;
  onViewDetails: (room: TOrder) => void;
  onUpdateDetails: (room: TOrder) => void;
}

const DataRow = ({ data, onViewDetails, onUpdateDetails }: IProps) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{data.id}</TableCell>
      <TableCell>{data.job.name}</TableCell>
      <TableCell>
        <Chip
          size="small"
          label={data.orderCompleted ? "Completed" : "Pending"}
          color={data.orderCompleted ? "success" : "secondary"}
        />
      </TableCell>
      <TableCell>{formatDateTime(data.orderdAt)}</TableCell>
      <TableCell>{data.orderCompleted ? formatDateTime(data.orderCompletedAt) : "-"}</TableCell>

      <TableCell align="right">
        <IconButton aria-label="delete" onClick={() => onViewDetails(data)}>
          <ArrowForwardIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DataRow;
