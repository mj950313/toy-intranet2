import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import { StateType } from "../types/user";
import ScheduleModal from "../components/ScheduleModal";
import { useState } from "react";
import { formatTableDate } from "../util/date";
import CustomToolbar from "../components/Calendar/CustomToolbar.tsx";
import CalendarStyles from "../components/Calendar/CalendarStyles.tsx";
import "moment/locale/ko";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const loginUser = useSelector((state: StateType) => state.user.loginUser);

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");

  const selectedSchedule = loginUser?.schedulesByDate.find(
    (schedule) => schedule.date === date
  );

  // 각 이벤트에 고유한 색상을 할당하기 위한 함수
  const eventStyleGetter = (event: { id: string }) => {
    const colors = [
      "rgba(0, 136, 255)",
      "rgba(255, 87, 51)",
      "#a7c957",
      "rgb(255, 143, 171)",
      "rgba(244, 104, 4)",
    ]; // 사용할 색상 배열
    const id = event.id; // 이벤트의 id 가져오기
    const colorIndex = id.charCodeAt(0) % colors.length; // id를 기반으로 색상 선택(아스키코드의 첫번째 % 색상 배열길이의 나머지로 색상선택 )
    const color = colors[colorIndex];
    const style = {
      backgroundColor: color,
      borderRadius: "5px",
      color: "white",
      border: "1px solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
    return {
      style,
    };
  };
  //로그인한 유저의 데이터를 가공해서 전달
  const events = loginUser
    ? loginUser.schedulesByDate.flatMap((schedule) =>
        schedule.schedules.map((item) => ({
          id: item.id,
          title: `${item.title} (${moment(item.time.split("-")[0], "HH").format(
            "HH"
          )} - ${moment(item.time.split("-")[1], "HH").format("HH")})`,
          start: moment(
            `${schedule.date} ${item.time.split("-")[0]}`,
            "YYYY-MM-DD HH:mm"
          ).toDate(),
          end: moment(
            `${schedule.date} ${item.time.split("-")[1]}`,
            "YYYY-MM-DD HH:mm"
          ).toDate(),
          description: item.description,
        }))
      )
    : [];

  return (
    <>
      <div>
        <CalendarStyles />
        <Calendar
          localizer={localizer} //특정 지역에 맞게 번역해주고 날짜 형식 설정을 관리하는 객체
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          tooltipAccessor="description" //이벤트를 클릭이나 호버했을 때 나타나는 툴팁에 표시될 내용을 지정하는 데 사용함.
          eventPropGetter={eventStyleGetter} // 이벤트 스타일을 설정하는 함수 전달
          style={{ height: 900 }}
          views={["month", "week"]}
          events={events}
          selectable
          onSelectSlot={(slotInfo) => {
            setDate(formatTableDate(slotInfo.slots[0]));
            setIsOpen(true);
          }}
          components={{
            toolbar: CustomToolbar, // 커스텀 툴바를 사용합니다.
          }}
        />
      </div>
      {isOpen && (
        <ScheduleModal
          selectedSchedule={
            selectedSchedule || { id: "", date: "", schedules: [] }
          }
          date={date}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
