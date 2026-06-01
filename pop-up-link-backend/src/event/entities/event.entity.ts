import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Reservation } from '../../reservation/entities/reservation.entity'; // 👈 Reservation 임포트 

@Entity('event')
export class Event {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 150 })
    title!: string;

    @Column({ length: 1000, nullable: true })
    description!: string;

    @Column()
    maxCount!: number;

    @Column()
    currentCount!: number;

    @Column()
    startAt!: Date;

    // N:1 관계 설정 - 여러 이벤트는 하나의 유저에 속합니다. (외래키 userId 역할)
    @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
    user!: User;

    // 1:N 관계 설정 - 하나의 이벤트는 여러 개의 예약 성공 내역을 가집니다.
    @OneToMany(() => Reservation, (reservation) => reservation.event)
    reservations!: Reservation[]; // 👈 새로 추가
}
