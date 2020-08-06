import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //importar cosas TS
const cookieParser = require('cookie-parser'); //importar cosas JS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //npm run start:dev
  /*
  * AQUI CONFIGURACION
  * ANTES DEL APP.LISTEN()
  */
  app.use(cookieParser('Me gustan las poliburguers'))
  await app.listen(3001);
}
bootstrap();
