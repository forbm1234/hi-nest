import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/util/swagger';

// nest js 는 Express Fastify 2개의 프레임 워크에서 돌아감.
// req res Express 객체를 사용하는건 좋은 방법이 아님.

async function bootstrap() {

  // AppModule 라는 app 실행
  // 디버깅 : npm run start:prod
  const app = await NestFactory.create(AppModule);

  // 유효성을 검사해주는 코드 파이프라인
  // npm i class-validator class-transformer 설치
  // class-validator는 CreateChatDto 에서 type 유효성 검사 ex) @IsNumber
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // validation을 위한 decorator가 붙어있지 않는 속성들을 제거

    forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400에러)
    // 이 옵션을 true 시키면 dto에 정의되지 않은 프로퍼티를 body에 넘길시 property 'xxx' should not exist라는 에러가 뜨게 됩니다
    // 즉, dto에 정의되지 않은 프로퍼티를 차단하기 위한 용도로 사용됩니다

    transform: true, // 요청에서 넘어온 자료들의 형변환
  })); 

  setupSwagger(app); // http://localhost:3000/api-docs 주소

  await app.listen(3000);
}




bootstrap();
