export type StateType = {
  user: {
    users: UserType[];
    loginUser: UserType | null;
    changed: boolean;
  };
};

export type ReducerStateType = {
  users: UserType[];
  loginUser: UserType | null;
  changed: boolean;
};

export type UserType = {
  id: string;
  email: string;
  name: string;
  salary: number;
  schedulesByDate: SchedulesByDateType[];
};

export type SchedulesByDateType = {
  id: string;
  date: string;
  schedules: ScheduleType[];
};

export type ScheduleType = {
  id: string;
  time: string;
  title: string;
  description: string;
};
