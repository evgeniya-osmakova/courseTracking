import { CheckedDays } from '@/types/Week';

type WeekNumber = string;
type DayNumber = string;

export type Course = {
    id: string,
    name: string,
    currentWeek: number,
    currentDay: number,
    checkedList: { [key: string]: CheckedDays},
    videoList: {
        [key: WeekNumber]: {
            [key: DayNumber]: {
                name: string,
                src: string
            }[]
        }
    },
}
