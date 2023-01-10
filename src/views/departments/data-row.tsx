import { TableCell, TableRow } from "@mui/material";
import { TDepartmentSample } from "types/department";
interface IProps {
  row: TDepartmentSample;
}

const DataRow = ({ row }: IProps) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.name}</TableCell>
    </TableRow>
  );
};

export default DataRow;
