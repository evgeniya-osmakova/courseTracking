import { CheckedDays } from '@/types/Week';
import { z } from 'zod';

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

export const CourseSchema = z.object({
    id: z.string(),
    name: z.string(),
    currentWeek: z.number(),
    currentDay: z.number(),
    checkedList: z.record(
        z.string(),
        z.record(z.string(), z.array(z.number()))
    ),
    videoList: z.record(
        z.string(),
        z.record(
            z.string(),
            z.array(
                z.object({
                    name: z.string(),
                    src: z.string(),
                })
            )
        )
    ),
});

export const CourseListSchema = z.array(CourseSchema);
