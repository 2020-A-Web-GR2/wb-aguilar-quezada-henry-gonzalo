import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //importar cosas TS
const cookieParser = require('cookie-parser'); //importar cosas JS
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;

  //npm run start:dev
  /*
  * AQUI CONFIGURACION
  * ANTES DEL APP.LISTEN()
  */
  app.use(cookieParser('Me gustan las poliburguers'))
  app.set('view engine', 'ejs')
  app.use(express.static('publico'));

  await app.listen(3001);
}
bootstrap();
