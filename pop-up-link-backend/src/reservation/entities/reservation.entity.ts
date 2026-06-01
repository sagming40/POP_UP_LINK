import { Entity, PrimaryGeneratedColumn, Column, CreatedDateColumn, ManyToOne } from 'typeorm';
import { Event } from '../../event/entities/event.entity';

@Entity('reservation')
export class Reservation {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50 })
    userName!: string; // 예약자 이름

    @Column({ length: 20 })
    phoneNumber!: string; // 예약자 전화번호

    @CreatedDateColumn()
    reservedAt!: Date; // 예약 성공 시간 (Auto TIME_STAMP)

    // N:1 관계 설정 - 여러 예약 내역은 하나의 이벤트에 속합니다. (외래키 eventId 역할)
    @ManyToOne(() => Event, (event) => event.reservations, { onDelete: 'CASCADE' })
    event!: Event;
}
