import 'react-calendar/dist/Calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from 'react-redux';
import { StateType } from '../types/user';

const localizer = momentLocalizer(moment)

export default function CalendarPage() {
  const loginUser = useSelector((state: StateType) => state.user.loginUser);

  // 각 이벤트에 고유한 색상을 할당하기 위한 함수
  const eventStyleGetter = (event: { id: string; }) => {
    const colors = ['#0088FF', '#FF5733', '#FFC300', '#83E690', '#FF00FF']; // 사용할 색상 배열
    const id = event.id; // 이벤트의 id 가져오기
    console.log(event.id[0]);
    const colorIndex = id.charCodeAt(0) % colors.length; // id를 기반으로 색상 선택(아스키코드의 첫번째 % 색상 배열길이의 나머지로 색상선택 )
    const color = colors[colorIndex];
    const style = {
      backgroundColor: color,
      borderRadius: '5px',
      color: 'white',
      border: '1px solid',
      display: 'flex',
      alignItems: 'center',
    };
    return {
      style
    };
  };

  const events = loginUser ? loginUser.schedulesByDate.flatMap(schedule => (
    schedule.schedules.map(item => ({
      id: item.id,
      title: item.title,
      start: moment(`${schedule.date} ${item.time.split('-')[0]}`, 'YYYY-MM-DD HH:mm').toDate(),
      end: moment(`${schedule.date} ${item.time.split('-')[1]}`, 'YYYY-MM-DD HH:mm').toDate(),
      description: item.description
    }))
  )) : [];

  return (
    <div>
      <style>
        {`
          .rbc-btn-group {
            background-color: #f46804;
            border-radius: 5px;
          }
          .rbc-toolbar-label {
            font-size: 25px;
          }
          .rbc-time-view {
            background-color: #fff;
            border-radius: 5px;
          }
          .rbc-time-gutter rbc-time-column {

          }
          .rbc-day-bg {
            background-color: #fff;
          }
          .rbc-off-range-bg {
            background-color: #d1d1d1;
          }
          .rbc-header {
            background-color: #8c4100;
          }
        `}
      </style>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        tooltipAccessor="description"
        eventPropGetter={eventStyleGetter} // 이벤트 스타일을 설정하는 함수 전달
        style={{ height: 500 }}
        views={["month", "week", "day"]}
        events={events}
      />
    </div>
  );
}