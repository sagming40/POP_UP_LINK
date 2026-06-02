import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 TypeOrm Import
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { Link } from './entities/link.entity'; // 👈 Link Entity Import

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]), // 이 모듈 안에서 Link 엔티티 DB를 사용할 수 있도록 TypeOrmModule에 등록(허가)
  ],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
