import { PresentationsPerDay } from "./presentations-per-day.model"

export interface Film {
    id: string
    name: string
    presentationsPerDay: PresentationsPerDay[]
}