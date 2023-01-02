type THotelRoomCreate = {
  id?: number;
  name: string,
  roomType: number,
  roomNumber: number,
  beds: number,
  occupants: number,
  price: number,
  hotelId: number,
}

type THotelRoom = {
  id?: number;
  name: string,
  roomType: number,
  roomNumber: number,
  beds: number,
  occupants: number,
  price: number,
  hotelId: number,
}

type THotelRoomOption = {
  roomType: number,
  roomTypeName: string,
  name: string,
  availableRooms: Array<{ id: number, price: number }>
}

export type {
  THotelRoomCreate,
  THotelRoom,
  THotelRoomOption
}