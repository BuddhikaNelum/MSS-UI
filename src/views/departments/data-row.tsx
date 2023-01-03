import { TableCell, TableRow } from "@mui/material";
import { TDepartment } from "types/department";
interface IProps {
  row: TDepartment;
}

const DataRow = ({ row }: IProps) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{row._id}</TableCell>
      <TableCell>{row.department}</TableCell>
    </TableRow>
  );
};

export default DataRow;
