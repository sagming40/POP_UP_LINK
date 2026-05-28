-- 1. 데이터베이스 생성 및 선택
CREATE DATABASE IF NOT EXISTS pop_up_link;
USE pop_up_link;

-- 2. User (크리에이터 회원) 테이블 생성
CREATE TABLE IF NOT EXISTS user (
    id int AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Link (프로필 링크 트리) 테이블 생성
CREATE TABLE IF NOT EXISTS link (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    sequence INT NOT NULL DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

-- 4. Event (선착순 팝업/이벤트) 테이블 생성
CREATE TABLE IF NOT EXISTS event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(1000) NULL,
    maxCount INT NOT NULL,
    currentCount INT NOT NULL,
    startAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

-- 5. Reservation (이벤트 예약 성공 내역) 테이블 생성
CREATE TABLE IF NOT EXISTS reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    eventId INT NOT NULL,
    userName VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    reservedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (eventId) REFERENCES event(id) ON DELETE CASCADE
);