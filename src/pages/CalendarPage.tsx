import 'react-calendar/dist/Calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from 'react-redux';
import { StateType } from '../types/user';

const localizer = momentLocalizer(moment)
console.log(localizer);
export default function CalendarPage () {
  const loginUser = useSelector((state) => state.user.loginUser) // useSelector를 사용하여 사용자 데이터 가져오기

  // const userdate = users.schedulesByDate.map(item => item.date);
  // // const userTime = users.schedulesByTime.map(item => item.time);

  // const firstTwoDigits = data.substring(0, 2); //시간 앞 두자리

  // const secondparts = data.split("-");
  // const secondTwoDigits = secondparts.slice(3); //시간 뒤 두자리

  // const userStartTime = firstTwoDigits
  // const userEndTime = secondTwoDigits


  // {result.map((userDetails, index) => (
  //   <div key={index}>
  //     {userDetails.map((detail, index) => (
  //       <div key={index}>
  //         <p>Age: {detail.age}</p>
  //         <p>City: {detail.city}</p>
  //       </div>
  //     ))}
  //   </div>
  // ))}


  
  const events = users.map(user => ({
    start: moment(user.startTime).toDate(), // 사용자의 시작 시간을 이벤트의 시작 시간으로 사용
    end: moment(user.endTime).toDate(), // 사용자의 종료 시간을 이벤트의 종료 시간으로 사용
    title: user.name, // 사용자의 이름을 이벤트 제목으로 사용
  }));
  console.log(events);
  // const events = [{
  //   start: moment("2024-03-08T08:00:00").toDate(),
  //   end: moment("2024-03-10T09").toDate(),
  //   title: "MRI Registration",
  // }]

  return (
    <div>
        <div>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={["month", "week", "day"]}
          events={events}
        />
        </div>
    </div>
  );
}