import {
  Chip,
  Divider,
  IconButton,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import { TJob } from "types/job";

interface IProps {
  row: TJob;
  onViewDetails: () => void;
}

const DataRow = ({ row, onViewDetails }: IProps) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell scope="row">{row.name}</TableCell>
      <TableCell scope="row">{row.department}</TableCell>
      <TableCell scope="row">{row.createdBy}</TableCell>
      <TableCell>
        <Chip label={row.status} color="success" variant="outlined" />
      </TableCell>
      <TableCell scope="row">{row.createdAt}</TableCell>
      <TableCell scope="row">{row.completedAt}</TableCell>

      <TableCell align="right">
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={1}
          alignItems="center"
          justifyContent="end"
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
};

export default DataRow;
