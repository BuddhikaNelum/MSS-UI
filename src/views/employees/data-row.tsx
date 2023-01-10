import { TableCell, TableRow, Divider, Stack, IconButton } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import { TEmployee } from "types/employee";
import { employeeTypeOptions } from "./metadata";
import { UserType } from "enums/userType";
interface IProps {
  row: TEmployee
  onViewDetails: (room: TEmployee) => void;
  onUpdateDetails: (room: TEmployee) => void;
}

const DataRow = ({ row, onViewDetails, onUpdateDetails }: IProps) => {

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}    >
      <TableCell>{row.userName}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{employeeTypeOptions[UserType[row.userType]]}</TableCell>
    </TableRow>
  );
}

export default DataRow;