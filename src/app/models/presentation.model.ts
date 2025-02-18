import { Room } from "./room.model"

export interface Presentation {
    id: number
    filmName: string
    startTime: string
    price: number
    room: Room
}