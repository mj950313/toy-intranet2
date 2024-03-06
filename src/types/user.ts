export type StateType = {
  user: {
    users: UserType[];
    loginUser: UserType | null;
  };
};

export type UserType = {
  id: string;
  email: string;
  name: string;
  salary: number;
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
