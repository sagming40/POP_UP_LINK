import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 추가
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entities/reservation.entity'; // 👈 추가

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]), // 👈 Reservation 엔티티를 TypeOrmModule에 등록하여 데이터베이스와의 통신이 가능하도록 설정합니다.
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
