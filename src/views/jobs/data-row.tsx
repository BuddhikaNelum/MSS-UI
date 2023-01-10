import { Chip, Divider, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import { TJob } from "types/job";
import { formatDateTime } from "utils/date-util";

interface IProps {
  row: TJob;
  onViewDetails: (job: TJob) => void;
}

const DataRow = ({ row, onViewDetails }: IProps) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell scope="row">{row.id}</TableCell>
      <TableCell scope="row">{row.name}</TableCell>
      <TableCell scope="row">{row.department.name}</TableCell>
      <TableCell>
        <Chip size="small" label={row.jobStatus === 0 ? "Pending" : "Accepted"} color={row.jobStatus === 0 ? "secondary" : "success"} />
      </TableCell>
      <TableCell scope="row">{formatDateTime(row.createdAt)}</TableCell>
      <TableCell scope="row">{row.completedAt}</TableCell>

      <TableCell align="right">
        <IconButton aria-label="delete" onClick={() => onViewDetails(row)}>
          <ArrowForwardIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DataRow;
