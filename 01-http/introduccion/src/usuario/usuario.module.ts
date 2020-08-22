import {Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { MascotaModule } from "src/mascota/mascota.module";


// @Nombre() -> Decorador es como una funcion
@Module({
    controllers: [
        UsuarioController
    ],
    imports: [
        MascotaModule,
        TypeOrmModule
            .forFeature(
                [
                    UsuarioEntity
                ],
                'default'
            )
        
    ],
    providers: [
        UsuarioService
    ]
})
export class UsuarioModule {
    
}