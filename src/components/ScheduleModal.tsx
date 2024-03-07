import { SchedulesByDateType } from "../types/user";

type PropsType = {
  selectedSchedule: SchedulesByDateType;
};

export default function ScheduleModal({ selectedSchedule }: PropsType) {
  const { schedules } = selectedSchedule;

  if (schedules.length === 0) {
    return <p>일정이 없습니다.</p>;
  }

  return (
    <div>
      {schedules.map((schedule) => (
        <div key={schedule.id}>
          <p>{schedule.title}</p>
          <p>{schedule.time}</p>
          <p>{schedule.description}</p>
        </div>
      ))}
    </div>
  );
}
