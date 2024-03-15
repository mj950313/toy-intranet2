# **💰 직원들을 위한 급여 및 업무 관리 플랫폼**

## 배포사이트

[TOYFIVE](https://toy-intranet2.vercel.app/)

테스트용 ID/PW : james@gmail.com / 123123

## 프로젝트 기간

3/4 ~ 3/14

## 사용 기술

React, Redux-toolkit, tailwind css, firebase, typescript

## 기능

### 1. 로그인

- 라우트 보호 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/e963210c-9916-4b13-b766-62f4781b95b9)

- 로그인 기능 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/c89904c3-1385-4ab1-b389-01b6513d67f1)

- localStorage에 토큰 저장 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/69675c60-d9b1-4654-9009-46137e1e3c0c)

- 유효성 검증 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/51958d45-a51a-412f-99c2-b0c11313812c)

### 2. 로그아웃

- 로그아웃 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/c58ee94d-693f-4c6b-82fc-64e965c2638c)

- localStorage에 토큰 삭제 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/fc2727d8-e6c3-4d18-85d5-9a5d352e3c99)

### 3. HomePage

- 날짜별 전체 직원 일정 조회 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/07cda4c4-4037-451a-b5ad-9f5028530568)

### 4. MyPage

- 로그인한 직원의 이번 달의 총 근무 시간 조회
- 로그인한 직원의 이번 달의 총 급여 조회
- 로그인한 직원의 금일 일정 조회 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/55dee57e-c1ee-44ea-8e6a-5ed9d8b04ec8)

### 5. CalendarPage

- 로그인한 직원의 월별 일정 조회 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/f54268f8-89b4-4093-85c0-af883e245699)

- 로그인한 직원의 주차별 일정 조회 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/2232a6e6-37b4-4f43-959a-0dbcad0e8f56)

- 일정 추가 기능 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/f16c7d5a-b457-414b-a9dc-9840e995fc1e)

- 일정 수정 기능 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/4abe618c-68d8-42c1-82a1-4838f3f06393)

- 일정 삭제 기능 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/76a9b185-8494-4238-8f7c-abd8a192ad5a)

- 유효성 검증 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/4f082c1d-196e-43fb-b990-6a2bbf9fbb42)

### 6. 비동기 에러핸들링

- 데이터 불러오기 실패 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/c5fe65ac-888b-497a-9169-5ee324e0fdce)

- 데이터 보내기 실패 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/f6ede54a-f781-4232-8d75-e2c2bba941db)

### 7. NotFoundPage

- 잘못된 경로로 접근 시 404 Not Found 페이지 출력 <br />
  ![](https://github.com/mj950313/toy-intranet2/assets/102540636/e07c72ba-fb4e-4349-a100-60d32d8dd115)

---

## 팀원 및 역할

- **김민재**

  - LoginPage
    - firebase를 통한 로그인, 로그아웃 기능 구현
      - 이메일, 비밀번호
      - 유효성 검사 적용
  - firebase 세팅
    - firebase를 사용한 데이터베이스 구축
  - vercel 이용한 배포
    - env 환경변수 설정
  - github repository 관리

- **임현성**

  - 개발환경 세팅
    - 라우트 세팅
      - 미로그인시 라우트 보호
      - 로그인시 LoginPage 접근 제한
    - 리덕스 세팅
      - 로그인한 유저, 전체 유저 데이터 전역 관리
      - thunk를 사용한 비동기 로직 작성
    - 전체적인 레이아웃 구성
    - 스키마 구성
    - tailwind css 세팅
  - HomePage
    - 날짜별 전체 사용자 일정 조회
  - CalendarPage
    - 데이터 추가, 수정, 삭제 기능
    - 데이터 추가, 수정 시 유효성 검증
  - Header
    - 로그인 토큰정보를 localStorage에 담아 네비게이션 동적 렌더링 구현
  - 비동기로직 에러핸들링

- **이재혁**

  - MyPage
    - 근무 시간 데이터를 한달 단위로 필터링해서 표시
      - 필터링된 데이터를 기반으로 급여 계산 및 표시
      - 급여 부분 카운트업 라이브러리 사용 (애니메이션)
    - 현재 날짜의 스케줄 데이터를 표시
      - 스케줄의 내용을 토글로 표시
    - 디자인 스타일링
  - Footer
    - 디자인 스타일링

- **이동근**
  - CalendarPage
    - react-big-calendar 라이브러리 사용
      - 해당 달의 스케줄 조회 구현
      - 해당 주의 스케줄 조회 구현
      - 이벤트의 고유한 id별로 색상 지정 구현
      - 디자인 스타일링
