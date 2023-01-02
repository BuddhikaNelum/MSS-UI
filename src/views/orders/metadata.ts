import { RoomType } from "enums/roomType";

export const roomTypeOptions: { -readonly [key in keyof typeof RoomType]: string } = {
    PREMIUM_SINGLE_ROOM: 'Premium Single Room',
    PREMIUM_DOUBLE_ROOM: 'Premium Double Room',
    PREMIUM_TRIPLE_ROOM: 'Premium Triple Room',
    PREMIUM_KING_ROOM: 'Premium King Room',
    JUNIOR_SUIT: 'Junior Suit',
    PREMIUM_SUIT: 'Premium Suit',
};