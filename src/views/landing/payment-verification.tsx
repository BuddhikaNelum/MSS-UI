import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Backdrop,
  Fade,
  Modal,
  colors,
  useTheme,
  Button,
  CircularProgress,
  Fab
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { useLazyVerifyPaymentQuery } from 'api/jobsAPISlice';
import CancelIcon from '@mui/icons-material/Cancel';
import { useLocation, useSearchParams } from 'react-router-dom';

const PaymentVerification = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [refId, setRefId] = useState<string | undefined>();

  useEffect(() => {
    const refId = searchParams.get('referenceId');
    if (refId) {
      setOpen(true);
      setRefId(refId)
    }
  }, []);

  useEffect(() => {
    if (open && refId) {
      handleVerifyPayment(refId)
    }
  }, [open, refId]);

  const [triggerPaymentVerification, { isSuccess, data, isLoading, isError }] = useLazyVerifyPaymentQuery()

  const handleVerifyPayment = async (refId) => triggerPaymentVerification(refId);

  const handleClose = () => {
    setOpen(false)
    setRefId(undefined)
  }

  const layoutSx = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    bgcolor: colors.common.white,
    p: 4,
    maxHeight: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const buttonSx = {
    ...(isSuccess && {
      bgcolor: colors.green[500],
      '&:hover': {
        bgcolor: colors.green[700],
      },
    }),
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={layoutSx}>
          <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
              aria-label="save"
              color="primary"
              sx={buttonSx}
            >
              {
                isSuccess
                  ? <CheckIcon fontSize='large' />
                  : isError
                    ? <CancelIcon fontSize='large' />
                    : <MonetizationOnOutlinedIcon fontSize='large' />
              }
            </Fab>
            {isLoading && (
              <CircularProgress
                size={68}
                sx={{
                  color: colors.green[500],
                  position: 'absolute',
                  top: -6,
                  left: -6,
                  zIndex: 1
                }}
              />
            )}
          </Box>

          {
            isLoading &&
            <Typography id="transition-modal-title" variant="h5" component="h2" marginTop={1}>
              Payment is being verified!
            </Typography>
          }

          {
            isError &&
            <Typography id="transition-modal-title" variant="h5" component="h2" marginTop={1}>
              Payment verification failed!
            </Typography>
          }

          {
            isSuccess &&
            <>
              <Typography id="transition-modal-title" variant="h5" component="h2" marginY={0}>
                Success!
              </Typography>

              <Typography id="transition-modal-title" variant="caption" component="h2" marginBottom={1}>
                Enjoy your stay.
              </Typography>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 1, width: '200px' }}
                onClick={handleClose}
              >
                Ok
              </Button>
            </>
          }
        </Box>
      </Fade>
    </Modal>
  );

}

export default PaymentVerification;