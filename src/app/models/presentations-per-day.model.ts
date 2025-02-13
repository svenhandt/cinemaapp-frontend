import { Presentation } from "./presentation.model"

export interface PresentationsPerDay {
    dayOfWeek: string
    presentations: Presentation[]
}