# [PHASE 2] POP_UP_LINK 데이터베이스 설계도

## 1. 테이블 구조 요약
본 프로젝트는 MariaDB를 사용하여 관계형 데이터베이스(RDBMS)를 구축하며, 총 4개의 테이블로 핵심 비즈니스 로직을 처리합니다.

### ① User (크리에이터 회원 정보)
- 크리에이터의 계정 및 프로필 정보를 관리합니다.

### ② Link (프로필 Link Tree)
- 크리에이터 프로필에 노출될 일반 외부 링크 목록입니다.
- User 테이블과 1:N(일대다) 관게를 가집니다.

### ③ Event (선착순 팝업/이벤트 세션)
- 타임어택성 선착순 예약 이벤트의 마스터 데이터 입니다.
- 제한 수량 및 예약 시작 시간을 관리하며, 동시성 제어의 핵심 대상입니다.
- User 테이블과 1:N(일대다) 관게를 가집니다.

### ④ Reservation (이벤트 예약 성공 내역)
- 선착순 이벤트에 최종 성공한 사용자들의 명단입니다.
- Event 테이블과 1:N(일대다) 관게를 가집니다.


# [PHASE 2] 테이블 구조 및 데이터 타입 상세

### ① User (크리에이터 회원 정보)
| 컬럼명 | 데이터 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| id | INT | PK, Auto Increment | 크리에이터 고유 식별자 |
| email | VARCHAR(100) | Unique, Not Null | 로그인용 이메일 계정 |
| password | VARCHAR(255) | Not Null | 암호화된 비밀번호 |
| nickname | VARCHAR(50) | Not Null | 크리에이터 활동명 |
| createdAt | DATETIME | Default CURRENT_TIMESTAMP | 계정 생성 일시 |

### ② Link (프로필 링크 트리)
| 컬럼명 | 데이터 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| id | INT | PK, Auto Increment | 링크 고유 식별자 |
| userId | INT | FK (User.id), Not Null | 해당 링크를 소유한 유저 ID |
| title | VARCHAR(100) | Not Null | 링크 버튼 노출 텍스트 |
| url | VARCHAR(255) | Not Null | 이동할 실제 URL 주소 |
| sequence | INT | Not Null, Default 0 | 링크 정렬 순서 |

### ③ Event (선착순 팝업/이벤트 세션)
| 컬럼명 | 데이터 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| id | INT | PK, Auto Increment | 이벤트 고유 식별자 |
| userId | INT | FK (User.id), Not Null | 이벤트를 개설한 크리에이터 ID |
| title | VARCHAR(150) | Not Null | 이벤트 제목 |
| description| VARCHAR(1000)| Nullable | 이벤트 상세 설명 |
| maxCount | INT | Not Null | 선착순 제한 총 수량 |
| currentCount| INT | Not Null | 현재 남아있는 잔여 수량 |
| startAt | DATETIME | Not Null | 선착순 타임어택 오픈 시간 |

### ④ Reservation (이벤트 예약 성공 내역)
| 컬럼명 | 데이터 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| id | INT | PK, Auto Increment | 예약 내역 고유 식별자 |
| eventId | INT | FK (Event.id), Not Null | 신청한 이벤트 ID |
| userName | VARCHAR(50) | Not Null | 예약자 이름 |
| phoneNumber| VARCHAR(20) | Not Null | 예약자 연락처 |
| reservedAt | DATETIME | Default CURRENT_TIMESTAMP | 예약 성공 확정 일시 |