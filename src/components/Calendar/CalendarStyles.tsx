import React from "react";

const CalendarStyles: React.FC = () => (
  <style>
    {`
      .rbc-toolbar button { /*기본 버튼*/
        background-color: #FBFBFB;
      }
      .rbc-time-header-gutter {
        background-color: #1C1C1C;
      }
      .rbc-time-gutter { /*주 왼쪽 시간 탭*/
        background-color: #1C1C1C;
      }
      .rbc-day-slot { /*주 메인 전체 셀*/
        background-color: #464649;
        border: none;
      }
      .rbc-month-view { /*월 전체 셀*/
        border-radius: 10px;
        overflow: hidden;
      }
      .rbc-time-view { /*주 전체 셀*/
        border-radius: 10px;
        overflow: hidden;
      }
      .rbc-btn-group .rbc-active {
        background-color: #B3B3B3;
      }
      .rbc-toolbar-label {
        font-size: 25px;
      }
      .rbc-event {
        justify-content: center;
      }
      .rbc-time-view {
        background-color: #fff;
        border-radius: 5px;
      }
      .rbc-day-bg {
        background-color: rgba(255, 255, 255, 0.2);
      }
      .rbc-day-bg:hover {
        background-color: #734500;
      }
      .rbc-off-range-bg {
        background-color: #0A0A0A;
      }
      .rbc-header { /*헤더요일 탭 스타일*/
        background-color: #8C4100;
      }
      .rbc-allday-cell {
        display: none;
      }
      .rbc-row.rbc-time-header-cell {
        height: 52px;
        line-height: 52px;
        font-size: 20px;
        color: white ;
      }
      .rbc-row.rbc-month-header {
        height: 52px;
        line-height: 52px;
        font-size: 20px;
        color: white ;
      }
      .rbc-day-slot .rbc-time-slot {
        border: none;
      }
    `}
  </style>
);

export default CalendarStyles;
