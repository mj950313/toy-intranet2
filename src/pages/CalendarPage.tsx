import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import { StateType } from "../types/user";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const users = useSelector((state: StateType) => state.user.users);

  return (
    <div>
      <div>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          views={["month", "week", "day"]}
        />
      </div>
    </div>
  );
}
