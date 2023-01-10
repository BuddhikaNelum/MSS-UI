import moment from "moment";

const FE_DATE_FORMAT = "YYYY-MM-DD hh:mm";

const formatDateTime = (str: string) => {
  return moment(str).format(FE_DATE_FORMAT)
}

export {
  formatDateTime
}