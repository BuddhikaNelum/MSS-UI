const validatePhoneNumber = (str?: string) => {
  if (str) {
    const regex = new RegExp('^[0-9]{10}$');
    return regex.test(str);
  } else {
    return false;
  }
}

export {
  validatePhoneNumber,
}