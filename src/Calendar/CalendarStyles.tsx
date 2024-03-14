import React from 'react';

const CalendarStyles: React.FC = () => (
  <style>
    {`
      .rbc-toolbar button { /*기본 버튼*/
        background-color: #FBFBFB;
      }
      // .rbc-toolbar button.rbc-active { /*월주 버튼 활성화*/
      //   background-color: #F46804;
      // }
      // .rbc-toolbar button.rbc-active:focus { /*월주 버튼 활성화*/
      //   background-color: #F46804;
      // }
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
      .rbc-time-gutter rbc-time-column {
      }
      .rbc-day-bg {
        background-color: #1C1C1C;
      }
      .rbc-day-bg:hover {
        background-color: #734500;
      }
      // .rbc-row:hover .rbc-day-bg {
      //   background-color: #734500; /* 호버 시 배경색 변경 */
      // }
      .rbc-off-range-bg {
        background-color: #0A0A0A;
      }
      .rbc-header { /*헤더요일 탭 스타일*/
        background-color: #8C4100;
      }
    `}
  </style>
);

export default CalendarStyles;