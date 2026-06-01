import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Link } from '../../link/entities/link.entity';
import { Event } from '../../event/entities/event.entity';
// import { link } from 'fs';

@Entity('user') // (1) MariaDB에 만든 'user' 테이블과 이 클래스를 연결합니다.
export class User {
    @PrimaryGeneratedColumn() // (2) AUTO_INCREMENT 되는 PK(기본키)로 지정합니다.
    id!: number;

    @Column({ unique: true, length: 100 }) // (3) 중복 불가능(Unique) 하고 최대 100글자인 칸입니다.
    email!: string;

    @Column({ length: 255 }) // (4) 압호화된 비밀번호가 들어갈 최대 255글자 칸입니다.
    password!: string;
    
    @Column({ length: 50 }) // (5) 크리에이터 활동명이 들어갈 최대 50글자 칸입니다.
    nickname!: string;

    @CreateDateColumn() // (6) 데이터가 처음 저장될 때 현재 시간이 자동으로 찍히는 칸입니다.
    createdAt!: Date;

    // 1:N 관계 설정 - 유저 한 명은 여러개의 링크를 가집니다.
    @OneToMany(() => Link, (Link) => Link.user)
    links!: Link[];

    // 1:N 관계 설정 - 유저 한 명은 여러 개의 이벤트를 개설합니다.
    @OneToMany(() => Event, (event) => event.user)
    events!: Event[];
}
