import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Drawer, TextField, Button } from "@mui/material";
import { closeCreateDrawer, selectDepartment, selectIsCreateDrawerOpen, setReload } from "features/departments-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { setErrorSnackbar } from "features/app-slice";
import { useCreateDepartmentMutation } from "api/departmentsAPISlice";
import DrawerHeader from "components/drawer-header";
import { TDepartmentCreateRequest } from "types/department";

const DepartmentsCreate = () => {
  const dispatch = useAppDispatch();
  const [triggerCreateDepartment, { isLoading: isCreateLoading }] = useCreateDepartmentMutation();
  const [triggerUpdateDepartment, { isLoading: isUpdateLoading }] = useCreateDepartmentMutation();

  const isOpen = useAppSelector(selectIsCreateDrawerOpen);
  const hotel = useAppSelector(selectDepartment);

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  const handleClose = () => dispatch(closeCreateDrawer());

  const handleCreateHotel = async (obj: TDepartmentCreateRequest) => {
    triggerCreateDepartment(obj)
      .unwrap()
      .then((_res) => {
        handleClose();
        dispatch(setReload(true));
      })
      .catch((err) => dispatch(setErrorSnackbar(err)));
  };

  const handleUpdateHotel = async (obj: TDepartmentCreateRequest) => {
    // triggerUpdateHotelRoom(obj)
    //   .unwrap()
    //   .then((_res) => {
    //     handleClose();
    //     dispatch(setReload(true));
    //   })
    //   .catch((err) => dispatch(setErrorSnackbar(err)));
  };

  const validationSchema = yup.object({
    name: yup.string().required("Hotel name is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: hotel?.name ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const obj: TDepartmentCreateRequest = {
        // id: hotel?.id ?? undefined,
        name: values.name,
      };

      hotel?.id ? handleUpdateHotel(obj) : handleCreateHotel(obj);
    },
  });

  return (
    <Drawer anchor={"right"} open={isOpen} onClose={handleClose}>
      <Box sx={{ width: 500, overflow: "auto", padding: 3 }}>
        <DrawerHeader title={"Create Hotel"} onClose={handleClose} />

        <Box role="presentation">
          <Box display="flex" flexDirection="column" marginBottom={2}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                id="name"
                label="Hotel Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isCreateLoading || isUpdateLoading}
                color="primary"
                sx={{ margin: "normal" }}
              >
                Create
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DepartmentsCreate;
