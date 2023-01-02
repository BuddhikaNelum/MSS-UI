const getSnackBarError = (error: any) => {
  if (typeof error == 'string') {
    return error;
  } else if ('error' in error) {
    return error.error
  } else if ('data' in error) {
    let errorMsg: any = error.data
    if (errorMsg) {
      if ('responseMsg' in errorMsg) {
        return errorMsg.responseMsg
      }
      else if ('error' in errorMsg) {
        return errorMsg.error
      } else {
        return errorMsg
      }
    } else {
      return 'Something went wrong'
    }
  }
}

export { getSnackBarError }