import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsuarioService {
 
    constructor( //Inyeccion de Dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ){
    }

    crearUno(nuevoUsuario: UsuarioEntity){
        this.repositorio.save(nuevoUsuario)
    }
}