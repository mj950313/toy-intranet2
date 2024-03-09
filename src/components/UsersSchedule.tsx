import { UserType } from "../types/user";
import { times } from "../util/time";

type PropsType = {
  users: UserType[];
  date: string;
};

export default function UsersSchedule({ users, date }: PropsType) {
  console.log(users);
  console.log(date);

  return (
    <section>
      <div className="bg-blue-300 grid grid-cols-4 gap-4">
        {users.map((user) => (
          <div key={user.id}>
            <p className="text-center">{user.name}</p>
            <div className="w-full h-[400px] bg-white p-4 overflow-y-scroll">
              {times.map((time) => (
                <p className="h-6">{time}</p>
              ))}
              {users.map((user, index) => {
                const currentSchedule = user.schedulesByDate.find(
                  (s) => s.date === date
                );

                const scheduleTime = currentSchedule?.schedules.map(
                  (s) => s.time
                );

                const timeRange = scheduleTime?.map((t) => {
                  const [start, end] = t.split("-").map(Number);
                  return { start, end };
                });

                return (
                  <div
                    key={user.id}
                    className={`flex border ${
                      index !== users.length - 1 && "border-b-0"
                    }`}
                  >
                    <div className="flex w-full">
                      {times.map((time, index) => {
                        const isInTimeRange = timeRange?.some(
                          (range) => index >= range.start && index < range.end
                        );

                        return (
                          <div
                            key={time}
                            className={`border-r flex-1 ${
                              isInTimeRange && "bg-myorange"
                            } ${index === times.length - 1 && "border-r-0"}`}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
