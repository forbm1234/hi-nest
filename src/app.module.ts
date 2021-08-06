import { Module } from '@nestjs/common';
import { ChattingModule } from './chatting/chatting.module';
import { MembershipModule } from './membership/membership.module';
import { AuthenticationModule } from './authentication/authentication.module';


// 컨트롤러는 AppController 사용 
// 서비스틑 AppService 사용 

// 컨트롤러와 서비스에 아키텍처 구분
// 컨트롤러는 express.js에 라우터 역할 : url을 함수로 매핑해서 호출하는 로직
// 서비스는 express.js에 컨트롤러 역할 : url을 호출하면 처리하는 비지니스 로직

@Module({
  //imports: [AuthenticationModule],
  imports: [ChattingModule, MembershipModule, AuthenticationModule],
  controllers: [],
  providers: [],
})

// app.module 은 AppService, AppController 로만 구성
// controllers: [ChattingController] providers: [ChattingService] 삭제하고 
// imports: [ChattingModule] 로 구성하기
// nest g mo 설치

export class AppModule {}
