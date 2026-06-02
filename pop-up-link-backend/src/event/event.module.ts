import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 추가
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Event } from './entities/event.entity'; // 👈 추가

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]), // 👈 Event 엔티티를 TypeOrmModule에 등록하여 데이터베이스와의 통신이 가능하도록 설정합니다.
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
