import { useEffect } from "react";
import {
  Box,
  Drawer,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import DrawerHeader from "components/drawer-header";
import {
  closeCreateDrawer,
  selectIsCreateDrawerOpen,
  setReload,
} from "features/departments-slice";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { useFormik } from "formik";
import * as yup from "yup";
import { setErrorSnackbar } from "features/app-slice";
import { THotelRoomCreate } from "types/hotelRoom";
import {
  useCreateHotelRoomMutation,
  useUpdateHotelRoomMutation,
} from "api/ordersAPISlice";
import { useLazyFilterHotelsQuery } from "api/inventoryAPISlice";
import { selectOrder } from "features/orders-slice";

const OrderCreate = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCreateDrawerOpen);
  const order = useAppSelector(selectOrder);

  const [triggerCreateHotelRoom, { isLoading: isCreateLoading }] =
    useCreateHotelRoomMutation();
  const [triggerUpdateHotelRoom, { isLoading: isUpdateLoading }] =
    useUpdateHotelRoomMutation();

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  const handleClose = () => dispatch(closeCreateDrawer());

  const handleCreateRoom = async (obj: THotelRoomCreate) => {
    triggerCreateHotelRoom(obj)
      .unwrap()
      .then((res) => {
        handleClose();
        dispatch(setReload(true));
      })
      .catch((err) => dispatch(setErrorSnackbar(err)));
  };

  const handleUpdateRoom = async (obj: THotelRoomCreate) => {
    triggerUpdateHotelRoom(obj)
      .unwrap()
      .then((res) => {
        handleClose();
        dispatch(setReload(true));
      })
      .catch((err) => dispatch(setErrorSnackbar(err)));
  };

  const validationSchema = yup.object({
    roomType: yup.number().required("Room type is required"),
    name: yup.string().required("Hotel name is required"),
    roomNumber: yup.number().required("Room number is required"),
    price: yup.number().required("Price is required"),
    hotel: yup.number().required("Hotel is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const obj = {};
    },
  });

  return (
    <Drawer anchor={"right"} open={isOpen} onClose={handleClose}>
      <Box sx={{ width: 500, overflow: "auto", padding: 3 }}>
        <DrawerHeader
          title={order ? `Update Order (${order._id})` : "Create Order"}
          onClose={handleClose}
        />

        <Box role="presentation">
          <Box display="flex" flexDirection="column" marginBottom={2}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="roomType"
                variant="outlined"
                fullWidth
                margin="normal"
                id="roomType"
                label="Room Type"
                // value={formik.values.roomType}
                select
                onChange={formik.handleChange}
                // error={formik.touched.roomType && Boolean(formik.errors.roomType)}
                // helperText={formik.touched.roomType && formik.errors.roomType}
                autoFocus
              >
                <MenuItem>Option 1</MenuItem>
              </TextField>

              <TextField
                name="roomNumber"
                variant="outlined"
                fullWidth
                margin="normal"
                id="roomNumber"
                label="Room Number"
                // value={formik.values.roomNumber}
                type="number"
                onChange={formik.handleChange}
                // error={formik.touched.roomNumber && Boolean(formik.errors.roomNumber)}
                // helperText={formik.touched.roomNumber && formik.errors.roomNumber}
              />

              <TextField
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                id="name"
                label="Name"
                // value={formik.values.name}
                onChange={formik.handleChange}
                // error={formik.touched.name && Boolean(formik.errors.name)}
                // helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                name="beds"
                variant="outlined"
                fullWidth
                margin="normal"
                id="beds"
                // value={formik.values.beds}
                inputProps={{ min: 1 }}
                label="Beds"
                type="number"
                onChange={formik.handleChange}
                // error={formik.touched.beds && Boolean(formik.errors.beds)}
                // helperText={formik.touched.beds && formik.errors.beds}
              />

              <TextField
                name="occupants"
                variant="outlined"
                fullWidth
                margin="normal"
                id="occupants"
                label="Occupants"
                // value={formik.values.occupants}
                inputProps={{ min: 1 }}
                type="number"
                onChange={formik.handleChange}
                // error={formik.touched.occupants && Boolean(formik.errors.occupants)}
                // helperText={formik.touched.occupants && formik.errors.occupants}
              />

              <TextField
                name="price"
                variant="outlined"
                fullWidth
                margin="normal"
                id="price"
                // value={formik.values.price}
                inputProps={{ min: 1 }}
                label="Price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Rs</InputAdornment>
                  ),
                }}
                type="number"
                onChange={formik.handleChange}
                // error={formik.touched.price && Boolean(formik.errors.price)}
                // helperText={formik.touched.price && formik.errors.price}
              />

              <TextField
                name="hotel"
                variant="outlined"
                fullWidth
                margin="normal"
                id="hotel"
                label="Hotel"
                // value={formik.values.hotel}
                select
                onChange={formik.handleChange}
                // error={formik.touched.hotel && Boolean(formik.errors.hotel)}
                // helperText={formik.touched.hotel && formik.errors.hotel}
                autoFocus
              >
                <MenuItem>Option 1</MenuItem>
              </TextField>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isCreateLoading || isUpdateLoading}
                color="primary"
                sx={{ marginTop: 2 }}
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

export default OrderCreate;
