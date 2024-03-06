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
  schedulesByDate: SchdulesByDateType[];
};

export type SchdulesByDateType = {
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
