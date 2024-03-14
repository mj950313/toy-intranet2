import React, { useState } from "react";
import {
  UserType,
  SchedulesByDateType,
  ScheduleType,
  StateType,
} from "../types/user";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { GridLoader } from "react-spinners";
import DownIcon from "../icons/DownIcon.tsx";
import UpIcon from "../icons/UpIcon.tsx";

const MyPage: React.FC = () => {
  const [showDescriptions, setShowDescriptions] = useState<boolean[]>([]);
  const loginUser: UserType | null = useSelector(
    (state: StateType) => state.user.loginUser
  );

  // 로딩 애니메이션 from HomePage
  const fetchStatus = useSelector((state: StateType) => state.user.fetchStatus);

  if (fetchStatus === "pending") {
    return (
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <GridLoader color="#f46804" />
      </div>
    );
  }

  // 각 스케줄의 시간을 기반으로 총 일한 시간을 계산
  const calculateWorkedHours = (schedules: ScheduleType[]): number => {
    let totalHours = 0;
    schedules.forEach((schedule) => {
      const [startHour, endHour] = schedule.time
        .split("-")
        .map((time) => parseInt(time));
      totalHours += endHour - startHour;
    });
    return totalHours;
  };

  // 월별로 필터링된 스케줄 데이터를 반환
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
  const calculateMonthSalary = (
    user: UserType,
    schedules: ScheduleType[]
  ): number => {
    const workedHours = calculateWorkedHours(schedules);
    const monthSalary = user.salary * workedHours;
    return monthSalary;
  };

  // 오늘 날짜에 해당하는 스케줄만 필터링
  const filterSchedulesForToday = (
    schedules: SchedulesByDateType[]
  ): ScheduleType[] => {
    const today = new Date().toISOString().split("T")[0]; // 오늘의 날짜를 YYYY-MM-DD 형식으로 가져옵니다.
    const todaySchedules = schedules.find(
      (schedule) => schedule.date === today
    );
    return todaySchedules ? todaySchedules.schedules : []; // 만약 오늘의 스케줄이 있다면 해당 스케줄을 반환하고, 없다면 빈 배열을 반환합니다.
  };

  // 로그인한 사용자의 스케줄 정보
  const userSchedules = loginUser ? loginUser.schedulesByDate : [];

  // 오늘의 스케줄 정보
  const todaySchedules = filterSchedulesForToday(userSchedules);

  // 현재 월의 스케줄 정보
  const currentMonth = new Date().getMonth() + 1; // 현재 월을 가져옵니다.
  const currentMonthSchedules = filterSchedulesByMonth(
    userSchedules,
    currentMonth
  );

  // 스케줄 description 토글 함수
  const toggleDescription = (index: number) => {
    setShowDescriptions((prev) => {
      const newShowDescriptions = [...prev];
      newShowDescriptions[index] = !newShowDescriptions[index];
      return newShowDescriptions;
    });
  };

  return (
    <div className="backdrop-blur-sm bg-white/10 rounded-md container mx-auto pt-[25px] pb-[25px] px-5 py-8">
      <h1 className="text-3xl font-bold pl-[15px] mb-8">MyPage</h1>

      {/* 로그인 사용자 정보 표시 */}
      {loginUser && (
        <div className="bg-white/10 p-4 rounded-md mb-4">
          <h2 className="flex justify-center text-xl font-semibold mb-2">
            Welcome, {loginUser.name}
          </h2>
          <p className="flex justify-center font-semibold text-white mb-[10px]">
            Email : {loginUser.email}
          </p>
        </div>
      )}

      {/* 급여 내역 확인 레이아웃 추가 */}
      <div className="bg-white/10 shadow-md rounded-md mb-4 p-4">
        <h2 className="flex justify-center text-xl font-semibold mb-2">
          Payroll Details
        </h2>
        {/* 로그인한 사용자의 급여 및 일한 시간 정보 표시 */}
        {loginUser && (
          <div key={loginUser.id} className="mb-[12px]">
            <h3 className="text-lg font-semibold mb-2"></h3>
            <p className="flex justify-center font-semibold text-white">
              Working for hours : {calculateWorkedHours(currentMonthSchedules)}H
            </p>
            {/* react-countup 라이브러리를 사용하여 급여 부분에 숫자 애니메이션 적용 */}
            <p className="flex justify-center text-[60px] font-bold text-white mt-[60px] mb-[110px]">
              Salarys :&nbsp;
              <CountUp
                start={0}
                end={calculateMonthSalary(loginUser, currentMonthSchedules)}
                duration={4}
                separator=","
                suffix=" ₩"
              />
            </p>
          </div>
        )}
      </div>

      {/* 스케줄 보드 표시 */}
      <div className="bg-white/10 shadow-md rounded-md mb-4 p-4 ">
        <h2 className="flex justify-center text-xl font-semibold mb-2">
          Today's Schedule
        </h2>
        {/* 오늘의 스케줄 정보 표시 */}
        <div className="bg-white/10 shadow-md rounded-md relative">
          {todaySchedules.length === 0 ? (
            <p className="text-white">No schedules for today.</p>
          ) : (
            <div>
              {todaySchedules.map((schedule, index) => (
                <div key={index} className="text-white p-2 relative ">
                  <div className="bg-white/10 shadow-md rounded-md p-4">
                    <div>
                      <p className="font-semibold text-center">
                        Title : {schedule.title}{" "}
                      </p>
                      <p className="font-semibold text-center">
                        Time : {schedule.time}
                      </p>
                      {/* 설명을 표시할지 여부에 따라 표시 */}
                      {showDescriptions[index] && (
                        <p className="font-semibold text-center mt-1">
                          Description : {schedule.description}
                        </p>
                      )}
                    </div>
                    <button
                      className="font-semibold text-myorange hover:underline 
                      absolute top-[34px] right-4"
                      onClick={() => toggleDescription(index)}
                    >
                      {showDescriptions[index] ? <UpIcon /> : <DownIcon />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
