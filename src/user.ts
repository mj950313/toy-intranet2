export const user = {
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
};

export const initialUser: UserType = {
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
};

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
