import React, { useState } from "react";
import {
  UserType,
  SchedulesByDateType,
  ScheduleType,
  StateType,
} from "../types/user";
import { useSelector } from "react-redux";
import CountUp from 'react-countup';

const MyPage: React.FC = () => {
  const loginUser: UserType | null = useSelector(
    (state: StateType) => state.user.loginUser
  );
  const [showCorrectionForm, setShowCorrectionForm] = useState<boolean>(false);
  const [correctionReason, setCorrectionReason] = useState<string>('');

  // 정정 신청 창을 토글합니다.
  const toggleCorrectionForm = () => {
    setShowCorrectionForm(!showCorrectionForm);
  };

  // 정정 신청 사유를 변경합니다.
  const handleCorrectionReasonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    schedules.forEach((schedule) => {
      const [startHour, endHour] = schedule.time
        .split("-")
        .map((time) => parseInt(time));
      totalHours += endHour - startHour; // 시작 시간과 종료 시간의 차이를 더합니다.
    });
    return totalHours;
  };

  // 월별로 필터링된 스케줄 데이터를 반환합니다.
  const filterSchedulesByMonth = (
    schedules: SchedulesByDateType[],
    month: number
  ): ScheduleType[] => {
    const filteredSchedules: ScheduleType[] = [];
    schedules.forEach((scheduleByDate) => {
      const [year, monthStr] = scheduleByDate.date.split("-");
      const scheduleMonth = parseInt(monthStr);
      if (
        parseInt(year) === new Date().getFullYear() &&
        scheduleMonth === month
      ) {
        // 선택한 년도와 월에 해당하는 스케줄 데이터를 필터링합니다.
        filteredSchedules.push(...scheduleByDate.schedules);
      }
    });
    return filteredSchedules;
  };

  // 현재 월의 급여 계산 함수
  const calculateMonthSalary = (user: UserType, schedules: ScheduleType[]): number => {
    const workedHours = calculateWorkedHours(schedules);
    const monthSalary = user.salary * workedHours;
    return monthSalary;
  };

  // 오늘 날짜에 해당하는 스케줄만 필터링합니다.
  const filterSchedulesForToday = (schedules: SchedulesByDateType[]): ScheduleType[] => {
    const today = new Date().toISOString().split('T')[0]; // 오늘의 날짜를 YYYY-MM-DD 형식으로 가져옵니다.
    const todaySchedules = schedules.find(schedule => schedule.date === today);
    return todaySchedules ? todaySchedules.schedules : []; // 만약 오늘의 스케줄이 있다면 해당 스케줄을 반환하고, 없다면 빈 배열을 반환합니다.
  };

  // 로그인한 사용자의 스케줄 정보
  const userSchedules = loginUser ? loginUser.schedulesByDate : [];

  // 오늘의 스케줄 정보
  const todaySchedules = filterSchedulesForToday(userSchedules);

  // 현재 월의 스케줄 정보
  const currentMonth = new Date().getMonth() + 1; // 현재 월을 가져옵니다.
  const currentMonthSchedules = filterSchedulesByMonth(userSchedules, currentMonth);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">MyPage</h1>

      {/* 로그인 사용자 정보 표시 */}
      {loginUser && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="text-xl font-semibold mb-2">
            Welcome, {loginUser.name}
          </h2>
          <p className="text-gray-600">Email: {loginUser.email}</p>
        </div>
      )}
      
      {/* 급여 내역 확인 레이아웃 추가 */}
      <div className="bg-white shadow-md rounded mb-4 p-4">
        <h2 className="text-xl font-semibold mb-2">Payroll Details</h2>
        {/* 로그인한 사용자의 급여 및 일한 시간 정보 표시 */}
        {loginUser && (
        <div key={loginUser.id} className="mb-4">
          <h3 className="text-lg font-semibold mb-2"></h3>
          <p className="text-gray-700">
            {loginUser.name}'s working for hours: {calculateWorkedHours(currentMonthSchedules)}H
          </p>
          {/* react-countup 라이브러리를 사용하여 급여 부분에 숫자 애니메이션 적용 */}
          <p className="text-gray-700">
            Salarys: {' '}
            <CountUp start={0} end={calculateMonthSalary(loginUser, currentMonthSchedules)} duration={4} separator="," suffix=" ₩" />
          </p>
        </div>
      )}

        {/* 급여 정정 신청 토글 */}
        <button
          onClick={toggleCorrectionForm}
          className="bg-myorange text-white font-semibold px-4 py-2 rounded"
        >
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
            <button
              type="submit"
              className="bg-myorange text-white font-semibold px-4 py-2 mt-2 rounded"
            >
              Submit
            </button>
          </form>
        )}
      </div>

      {/* 스케줄 보드 표시 */}
      <div className="bg-white shadow-md rounded mb-4 p-4 ">
        <h2 className="text-xl font-semibold mb-2">Today's Schedule</h2>
        {/* 오늘의 스케줄 정보 표시 */}
        <div className='flex items-center justify-center'>
        <div className="border border-gray-300 rounded p-4 h-[500px] w-[500px] flex items-center justify-center">
          {todaySchedules.length === 0 ? (
            <p className="text-gray-700">No schedules for today.</p>
          ) : (
            <ul>
              {todaySchedules.map((schedule, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold">{schedule.time}</span> - {schedule.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </div>

      
    </div>
  ); 
}

export default MyPage;
