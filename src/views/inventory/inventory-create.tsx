import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Drawer, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { closeCreateDrawer, selectIsCreateDrawerOpen, setReload } from "features/inventory-slice";
import DrawerHeader from "components/drawer-header";
import { TInventoryItemCreateRequest } from "types/inventory";
import { useCreateInventoryItemMutation } from "api/inventoryAPISlice";
import { setErrorSnackbar, setSuccessSnackbar } from "features/app-slice";

const InventoryCreate = () => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIsCreateDrawerOpen);

  const [triggerCreateInventoryItem] = useCreateInventoryItemMutation();

  const handleClose = () => dispatch(closeCreateDrawer());

  const validationSchema = yup.object({
    name: yup.string().required("Item name is required"),
    quantity: yup.number().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleCreateInventoryItem(values);
    },
  });

  const handleCreateInventoryItem = async (values: { [key in keyof typeof formik.values]: any }) => {
    const obj: TInventoryItemCreateRequest = {
      name: values.name,
      quantity: values.quantity,
    };

    triggerCreateInventoryItem(obj)
      .unwrap()
      .then((_res) => {
        dispatch(setSuccessSnackbar("Inventory item created successfully"));
        dispatch(setReload(true));
        handleClose();
      })
      .catch((err) => dispatch(setErrorSnackbar(err)));
  };

  return (
    <Drawer anchor={"right"} open={isOpen} onClose={handleClose}>
      <Box sx={{ width: 500, overflow: "auto", padding: 3 }}>
        <DrawerHeader title={"Create Reservation"} onClose={handleClose} />

        <Box role="presentation">
          <Box display="flex" flexDirection="column" marginBottom={2}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                id="name"
                label="Item Name"
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoFocus
              />

              <TextField
                type="number"
                margin="normal"
                name="quantity"
                variant="outlined"
                fullWidth
                id="quantity"
                label="Quantity"
                onChange={formik.handleChange}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
              />

              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Create
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default InventoryCreate;
