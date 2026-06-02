import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LinkModule } from './link/link.module';
import { EventModule } from './event/event.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. [.env] 환경 변수 파일을 백엔드 전체에서 읽을 수 있도록 세팅하는 통제 장치입니다.
    ConfigModule.forRoot({
      isGlobal: true, // 다른 모듈에서도 부품을 따로 불러오지 않고 .env를 쓸 수 있게 전역(Global)으로 설정합니다.
    }),

    // 2. Nest.js가 .env에서 비동기적으로 보안 데이터를 주입받아 MariaDB와 진짜 통신관을 연결하는 설정입니다.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // .env 데이터를 읽어오는 ConfigModule 부품을 가져옵니다.
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb', // 우리가 연동할 데이터베이스 종류인 MariaDB를 선언합니다.
        host: configService.get<string>('DB_HOST'), // localhost
        port: configService.get<number>('DB_PORT'), // 3306
        username: configService.get<string>('DB_USERNAME'), // root
        password: configService.get<string>('DB_PASSWORD'), // 비밀번호
        database: configService.get<string>('DB_DATABASE'), // pop_up_link
        autoLoadEntities: true,
        entities: [], // MariaDB에 생성된 테이블들이 이 부분에 TypeScript 코드로 등록됩니다.
        synchronize: false, // ⭐ true일 경우 코드가 변경될 때 DB 구조가 저동으로 바뀌어서 위험. false로 안전하게 통제
      }),
      inject: [ConfigService], // 비동기 연결을 위해 ConfigService라는 부품을 주입(Inject)합니다.
    }),

    UserModule,

    LinkModule,

    EventModule,

    ReservationModule,

    AuthModule,
  ],
})
export class AppModule {}