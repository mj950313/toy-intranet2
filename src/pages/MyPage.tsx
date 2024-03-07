import React, { useState } from 'react';
import { UserType, SchedulesByDateType, ScheduleType, StateType } from '../types/user';
import { useSelector } from 'react-redux';

const MyPage: React.FC = () => {
  const loginUser: UserType | null = useSelector((state: StateType) => state.user.loginUser);
  const [showCorrectionForm, setShowCorrectionForm] = useState<boolean>(false);
  const [correctionReason, setCorrectionReason] = useState<string>('');
  
  

  // 정정 신청 창을 토글합니다.
  const toggleCorrectionForm = () => {
    setShowCorrectionForm(!showCorrectionForm);
  };

  // 정정 신청 사유를 변경합니다.
  const handleCorrectionReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectionReason(event.target.value);
  };

  // 정정 신청을 제출합니다.
  const handleSubmitCorrection = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 여기서 정정 신청을 서버에 전송하는 로직을 추가할 수 있습니다.
    // 서버에 전송 후에는 정정 신청 창을 닫을 수 있도록 setShowCorrectionForm(false)를 호출할 수 있습니다.
  };

  // 각 스케줄의 시간을 기반으로 총 일한 시간을 계산합니다.
  const calculateWorkedHours = (schedules: ScheduleType[]): number => {
    let totalHours = 0;
    schedules.forEach(schedule => {
      const [startHour, endHour] = schedule.time.split('-').map(time => parseInt(time));
      totalHours += endHour - startHour; // 시작 시간과 종료 시간의 차이를 더합니다.
    });
    return totalHours;
  };

  // 월별로 필터링된 스케줄 데이터를 반환합니다.
  const filterSchedulesByMonth = (schedules: SchedulesByDateType[], month: number): ScheduleType[] => {
    const filteredSchedules: ScheduleType[] = [];
    schedules.forEach(scheduleByDate => {
      const [year, monthStr] = scheduleByDate.date.split('-');
      const scheduleMonth = parseInt(monthStr);
      if (parseInt(year) === new Date().getFullYear() && scheduleMonth === month) {
        // 선택한 년도와 월에 해당하는 스케줄 데이터를 필터링합니다.
        filteredSchedules.push(...scheduleByDate.schedules);
      }
    });
    return filteredSchedules;
  };
  
  // 스케줄 데이터를 일주일별로 필터링하는 함수
  const filterSchedulesByWeek = (schedules: SchedulesByDateType[]): SchedulesByDateType[] => {
  const filteredSchedules: SchedulesByDateType[] = [];
  const currentDate = new Date();

  // 현재 날짜를 기준으로 일주일 전의 날짜를 구합니다.
  const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  // 일주일 전부터 현재 날짜까지의 스케줄 데이터를 필터링합니다.
  schedules.forEach(scheduleByDate => {
    const scheduleDate = new Date(scheduleByDate.date);
    if (scheduleDate >= oneWeekAgo && scheduleDate <= currentDate) {
      filteredSchedules.push(scheduleByDate);
    }
  });
  return filteredSchedules;
};

  // 로그인한 사용자의 일주일간의 스케줄 정보
  const userSchedulesForWeek = loginUser ? filterSchedulesByWeek(loginUser.schedulesByDate) : [];

  // 로그인한 사용자의 스케줄 정보
  const userSchedules = loginUser ? loginUser.schedulesByDate : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">MyPage</h1>

      {/* 로그인 사용자 정보 표시 */}
      {loginUser && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">Welcome, {loginUser.name}</h2>
          <p className="text-gray-600">Email: {loginUser.email}</p>
        </div>
      )}

      {/* 스케줄 보드 표시 */}
      <div className="bg-white shadow-md rounded mb-4 p-4">
      <h2 className="text-xl font-semibold mb-2">Schedule Board</h2>
      {/* 일주일간의 스케줄 정보 표시 */}
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2"></th>
            {userSchedulesForWeek.map((scheduleByDate) => (
              <th key={scheduleByDate.date} className="border px-4 py-2">
                {scheduleByDate.date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 24 }).map((_, hourIndex) => (
            <tr key={hourIndex}>
              <td className="border px-4 py-2">{`${hourIndex}:00`}</td>
              {userSchedulesForWeek.map((scheduleByDate) => {
                const scheduleForHour = scheduleByDate.schedules.find(schedule => {
                  const [startHour] = schedule.time.split('-').map(time => parseInt(time));
                  return startHour === hourIndex;
                });
                return (
                  <td key={scheduleByDate.date} className="border px-4 py-2">
                    {scheduleForHour ? (
                      <div>
                        <span className="font-semibold">{scheduleForHour.time}</span> - {scheduleForHour.title}
                      </div>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>


      {/* 급여 내역 확인 레이아웃 추가 */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Payroll Details</h2>
        {/* 로그인한 사용자의 급여 및 일한 시간 정보 표시 */}
        {loginUser && (
          <div key={loginUser.id} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{loginUser.name}</h3>
            <p className="text-gray-700">
              일한 시간: {calculateWorkedHours(filterSchedulesByMonth(userSchedules, new Date().getMonth() + 1))} 시간
            </p>
            <p className="text-gray-700">
              급여: {loginUser.salary.toLocaleString()}₩ 
              {/* 내장함수 toLocaleString 사용 1000단위로 쉼표 */}
            </p>
          </div>
        )}

        {/* 급여 정정 신청 토글 */}
        <button onClick={toggleCorrectionForm} className="bg-myorange text-white font-semibold px-4 py-2 rounded">
          급여 정정 신청
        </button>
        {/* 정정 신청 폼 */}
        {showCorrectionForm && (
          <form onSubmit={handleSubmitCorrection} className="mt-4">
            <input
              type="text"
              placeholder="Reason for correction"
              className="border border-gray-300 px-4 py-2 mt-2 rounded"
              value={correctionReason}
              onChange={handleCorrectionReasonChange}
            />
            <button type="submit" className="bg-myorange text-white font-semibold px-4 py-2 mt-2 rounded">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default MyPage;
