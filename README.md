Later I will make the application freely available to view, but for now, to launch it you need to take the following steps:

- You need to have an acc at https://firebase.google.com/

- Create `.env` file with such data:

```
NEXT_PUBLIC_FIREBASE_API_KEY=" "
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=" "
NEXT_PUBLIC_FIREBASE_PROJECT_ID=" "
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=" "
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=" "
NEXT_PUBLIC_FIREBASE_APP_ID=" "
```

You also need to have a data in tour Storage with such structure:

```
type WeekDay = number

type CheckedDays = {
    [key: string]: WeekDay[]
}

type WeekNumber = string;
type DayNumber = string;

type Course = {
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
```
