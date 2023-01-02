type THotelCreate = {
  id?: number;
  name: string,
  address: string,
  contact: string,
  userId: number
}

type THotel = {
  id: number;
  name: string;
  adress: string;
  contact: string;
  checkinFrom: string;
  checkoutBefore: string;
  createdBy: number;
}

export type {
  THotelCreate,
  THotel,
}