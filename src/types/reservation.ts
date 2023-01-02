type TBookingCheck = {
  hotelId: number
  roomId: number
  checkIn: string
  checkOut: string
}

type TBookingCreate = {
  guestDto: {
    email: string
    title: string
    firstName: string
    lastName: string
    phoneNumber: string
  }
  hotelId: number
  roomId: number
  checkIn: string
  checkOut: string
  amount: number
  bookedUserType: number
  specialNotes: string
}

type TBooking = {
  referenceId: string,
  guestName: string,
  checkinDate: string,
  checkoutDate: string,
  roomNo: number,
  paymentStatus: number,
  bookingStatus: number
}

type TStayInfo = {
  hotelId: number
  roomId: number
  price: number,
  checkIn: string
  checkOut: string
}

type TPayLater = {
  email: string
  name: string
  paymentUrl: string
}

export type {
  TBookingCheck,
  TBookingCreate,
  TBooking,
  TStayInfo,
  TPayLater
}