import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Drawer,
  TextField,
  Button,
  MenuItem,
  Autocomplete,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DrawerHeader from "components/drawer-header";
import { selectIsCreateDrawerOpen, closeCreateDrawer, setReload } from "features/jobs-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { selectCurrUser, setErrorSnackbar, setSuccessSnackbar } from "features/app-slice";
import { TJobCreateRequest } from "types/job";
import { useCreateJobMutation } from "api/jobsAPISlice";
import { useLazyGetDepartmentsQuery } from "api/departmentsAPISlice";
import { useLazyGetInventoryQuery } from "api/inventoryAPISlice";

const JobCreate = () => {
  const dispatch = useAppDispatch();

  const [item, setItem] = useState<{ label: string; id: number } | undefined>();
  const [qty, setQty] = useState(1);
  const [itemSelected, setItemsSelected] = useState<{ id: number; label: string; qty: number }[]>([]);

  const isOpen = useAppSelector(selectIsCreateDrawerOpen);
  const currUser = useAppSelector(selectCurrUser);

  const [triggerCreateJob] = useCreateJobMutation();
  const [triggerGetDepartments, { data: departmentList }] = useLazyGetDepartmentsQuery();
  const [triggerGetInventory, { data: inventoryList }] = useLazyGetInventoryQuery();

  useEffect(() => {
    triggerGetDepartments();
    triggerGetInventory();
  }, []);

  const handleClose = () => dispatch(closeCreateDrawer());

  const getMorphedInventoryList = () => {
    const options: Readonly<{ label: string; id: number }[]> = (inventoryList || []).map((item) => ({
      label: item.name,
      id: item.id,
    }));

    return options;
  };

  const validationSchema = yup.object({
    name: yup.string().required("Job name is required"),
    description: yup.string().required("Job description is required"),
    departmentId: yup.string().required("Department is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      departmentId: "1",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (itemSelected.length) {
        const obj: TJobCreateRequest = {
          name: values.name,
          description: values.description,
          departmentId: parseInt(values.departmentId, 10),
          workMaterials: itemSelected.map((item) => ({ inventoryId: item.id, quantity: item.qty })),
          userId: currUser!.id,
        };

        handleCreateJob(obj);
      }
    },
  });

  const handleCreateJob = async (values: TJobCreateRequest) => {
    triggerCreateJob(values)
      .unwrap()
      .then((_res) => {
        dispatch(setSuccessSnackbar("Job created successfully"));
        dispatch(setReload(true));
        handleClose();
      })
      .catch((err) => {
        dispatch(setErrorSnackbar(err));
      });
  };

  const handleAddToList = () => {
    if (item && qty) {
      setItemsSelected([...itemSelected, { ...item, qty: qty }]);
      setItem(undefined);
      setQty(1);
    }
  };

  return (
    <Drawer anchor={"right"} open={isOpen} onClose={handleClose}>
      <Box sx={{ width: 500, overflow: "auto", padding: 3 }}>
        <DrawerHeader title={"Create Job"} onClose={handleClose} />

        <Box role="presentation">
          <Box display="flex" flexDirection="column" marginBottom={2}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="normal"
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                fullWidth
                multiline
                maxRows={4}
                margin="normal"
                name="description"
                variant="outlined"
                id="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />

              <TextField
                select
                variant="outlined"
                margin="normal"
                fullWidth
                id="departmentId"
                label="Department"
                name="departmentId"
                onChange={formik.handleChange}
                value={formik.values.departmentId}
                error={formik.touched.departmentId && Boolean(formik.errors.departmentId)}
                helperText={formik.touched.departmentId && formik.errors.departmentId}
              >
                {(departmentList || []).map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </TextField>

              <Box border={1} padding={1} marginBottom={2} marginTop={2} borderColor="secondary.light" borderRadius={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={getMorphedInventoryList()}
                    onChange={(_e, v) => {
                      if (v) {
                        setItem(v);
                      }
                    }}
                    value={item}
                    renderInput={(params) => <TextField {...params} margin="none" label="Select item" />}
                  />

                  <TextField
                    type="number"
                    variant="outlined"
                    margin="normal"
                    id="quantity"
                    label="Qty"
                    name="quantity"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                  />

                  <IconButton onClick={handleAddToList}>
                    <AddIcon />
                  </IconButton>
                </Box>

                {itemSelected.length ? (
                  <Box maxHeight={200}>
                    <TableContainer>
                      <Table size="small" stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Qty</TableCell>
                            <TableCell />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {itemSelected.map((row) => (
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                              <TableCell>{row.label}</TableCell>
                              <TableCell align="right">{row.qty}</TableCell>
                              <TableCell align="right">
                                <IconButton aria-label="delete" color="error">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ) : undefined}
              </Box>

              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ margin: "normal" }}>
                Create
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default JobCreate;
