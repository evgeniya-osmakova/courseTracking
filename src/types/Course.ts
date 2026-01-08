import { z } from 'zod';

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

export type Course = z.infer<typeof CourseSchema>;

export const CourseListSchema = z.array(CourseSchema);
