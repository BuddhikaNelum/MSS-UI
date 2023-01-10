import { Divider, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import { TInventoryItem } from "types/inventory";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface IProps {
  row: TInventoryItem;
  onViewDetails: () => void;
}

const DataRow = ({ row, onViewDetails }: IProps) => {
  return (
    <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell align="right">{row.quantity}</TableCell>
      <TableCell align="right">
        <IconButton size="small" aria-label="delete" onClick={onViewDetails}>
          <ArrowForwardIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DataRow;
