import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MascotaEntity } from "./mascota.entity";
import { MascotaService } from "./mascota.service";

// @Nombre() -> Decorador es como una funcion
@Module({
    controllers: [ ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    MascotaEntity
                ],
                'default'
            )
        
    ],
    providers: [
        MascotaService
    ],
    exports:[
        MascotaService
    ]
})
export class MascotaModule {
    
}