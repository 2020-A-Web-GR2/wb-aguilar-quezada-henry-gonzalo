import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpJuegoModule } from './http/http-juego.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';

@Module({
  imports: [
    // Aqui otros modulos
    HttpJuegoModule,
    UsuarioModule,
    TypeOrmModule
      .forRoot({
        name: 'default',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'prueba',
        entities: [
          UsuarioEntity
        ],
        synchronize: true,
        dropSchema: false,
      }),
  ],
  controllers: [
    // Controladores APP MODULE
    AppController

  ],
  providers: [
    // Servicios APP MODULE
    AppService

  ],
})
export class  AppModule {}
