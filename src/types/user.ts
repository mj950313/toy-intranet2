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
