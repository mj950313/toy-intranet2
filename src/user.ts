export const users = [
  {
    id: "u1",
    email: "example@gmail.com",
    name: "myname",
    schedules: [
      {
        id: "",
        date: "2024-03-04",
        schedule: [
          { id: "s1", time: "06-09", title: "", description: "" },
          { id: "s2", time: "10-12", title: "", description: "" },
          { id: "s3", time: "15-19", title: "", description: "" },
        ],
      },
      {
        id: "",
        date: "2024-03-05",
        schedule: [
          { id: "s1", time: "06-09", title: "", description: "" },
          { id: "s2", time: "10-12", title: "", description: "" },
          { id: "s3", time: "15-19", title: "", description: "" },
        ],
      },
    ],
  },
];

export const initialUsers: UserType[] = [
  {
    id: "u1",
    email: "james@gmail.com",
    name: "james",
    schedules: [
      {
        id: "sc1",
        date: "2024-03-04",
        schedule: [
          {
            id: "s1",
            time: "06-09",
            title: "title1",
            description: "description1",
          },
          {
            id: "s2",
            time: "10-12",
            title: "title2",
            description: "description2",
          },
          {
            id: "s3",
            time: "15-19",
            title: "title3",
            description: "description3",
          },
        ],
      },
      {
        id: "sc2",
        date: "2024-03-05",
        schedule: [
          {
            id: "ss1",
            time: "07-09",
            title: "title1",
            description: "description1",
          },
          {
            id: "ss2",
            time: "12-19",
            title: "title2",
            description: "description2",
          },
        ],
      },
    ],
  },
  {
    id: "u2",
    email: "john@gmail.com",
    name: "john",
    schedules: [
      {
        id: "sc1",
        date: "2024-03-04",
        schedule: [
          {
            id: "s1",
            time: "09-18",
            title: "title1",
            description: "description1",
          },
        ],
      },
      {
        id: "sc2",
        date: "2024-03-05",
        schedule: [
          {
            id: "s1",
            time: "10-20",
            title: "title1",
            description: "description1",
          },
        ],
      },
    ],
  },
  {
    id: "u3",
    email: "chris@gmail.com",
    name: "chris",
    schedules: [
      {
        id: "sc1",
        date: "2024-03-04",
        schedule: [
          {
            id: "s1",
            time: "08-11",
            title: "title1",
            description: "description1",
          },
          {
            id: "s2",
            time: "13-20",
            title: "title2",
            description: "description2",
          },
        ],
      },
      {
        id: "sc2",
        date: "2024-03-05",
        schedule: [
          {
            id: "s1",
            time: "11-21",
            title: "title1",
            description: "description1",
          },
        ],
      },
      {
        id: "sc3",
        date: "2024-03-06",
        schedule: [
          {
            id: "s1",
            time: "09-12",
            title: "title1",
            description: "description1",
          },
          {
            id: "s2",
            time: "14-19",
            title: "title2",
            description: "description2",
          },
        ],
      },
    ],
  },
];

export type UserType = {
  id: string;
  email: string;
  name: string;
  schedules: SchedulesType[];
};

type SchedulesType = {
  id: string;
  date: string;
  schedule: ScheduleType[];
};

type ScheduleType = {
  id: string;
  time: string;
  title: string;
  description: string;
};
