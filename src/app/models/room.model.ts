import { SeatRow } from "./seat-row.model"

export interface Room {
    id: number
    name: string
    seatRows: SeatRow[]
}