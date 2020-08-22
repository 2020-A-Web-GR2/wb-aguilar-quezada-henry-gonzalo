import { Controller, Get, Param, Post, Body, Put, Delete, BadRequestException, InternalServerErrorException, NotFoundException, Res } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { MascotaService } from "src/mascota/mascota.service";

@Controller('usuario')
export class UsuarioController {
    
    public arregloUsuarios = [
        {
            id: 1,
            nombre: 'Adrian'
        },
        {
            id: 2,
            nombre: 'Henry'
        },
        {
            id: 3,
            nombre: 'Cristian'
        }
    ]
    public idActual = 3;
    
    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService
    ){

    }

    @Get()
    async mostrarTodos(){
        try{
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        }catch(e){
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }
        //return this.arregloUsuarios
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        try{
            //Validacion del CREATE DTO
            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            return respuesta;
        }catch(e){
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
        
        // const nuevoUsuario = {
        //     id: this.idActual + 1,
        //     nombre: parametrosCuerpo.nombre
        // };
        // this.arregloUsuarios.push(nuevoUsuario);
        // this.idActual = this.idActual + 1;
        // return nuevoUsuario;
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        let respuesta;
        try{
            respuesta = await this._usuarioService
                .buscarUno(Number(parametrosRuta.id));  
        }catch(e){
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor'
            })
        }
        // const indice = this.arregloUsuarios.findIndex(
            //     (usuario) => usuario.id === Number(parametrosRuta.id)
            // )
            // return this.arregloUsuarios[indice];
        if (respuesta){
            return respuesta;
        }else{
            throw new NotFoundException({
                mensaje: 'No existen registros'
            })
        }
        }
            
        @Put(':id')
        async editarUno(
            @Param() parametrosRuta,
            @Body() parametrosCuerpo
        ) {
            const id = Number(parametrosRuta.id);
            const usuarioEditado = parametrosCuerpo;
            usuarioEditado.id = id;
            try {
                console.log('usuarioEditado', usuarioEditado);
                const respuesta = await this._usuarioService
                    .editarUno(usuarioEditado);
                return respuesta;
            } catch (e) {
                console.error(e)
                throw new InternalServerErrorException({
                    mensaje: 'Error del servidor',
                })
            }
            // const indice = this.arregloUsuarios.findIndex(
            //     // (usuario) => usuario.id === Number(parametrosRuta.id)
            //     (usuario) => usuario.id === Number(parametrosRuta.id)
            // );
            // this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
            // return this.arregloUsuarios[indice];
        }
    
        @Delete(':id')
        async eliminarUno(
            @Param() parametrosRuta
        ) {
            const id = Number(parametrosRuta.id);
            try {
                const respuesta = await this._usuarioService
                    .eliminarUno(id);
                return {
                    mensaje: 'Registro con id ' + id + ' eliminado'
                };
            } catch (e) {
                console.error(e)
                throw new InternalServerErrorException({
                    mensaje: 'Error del servidor',
                })
            }
        }

        @Post('crearUsuarioYCrearMascota')
        async crearUsuarioYCrearMascota(
            @Body() parametrosCuerpo
        ){
            const usuario = parametrosCuerpo.usuario;
            const mascota = parametrosCuerpo.mascota;
            
            let usuarioCreado;
            try{
                usuarioCreado = await this._usuarioService.crearUno(usuario);
            }catch(e){
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creado usuario'
                })
            }
            
            if(usuarioCreado){
                mascota.usuario = usuarioCreado.id;
                let mascotaCreada;
                try{
                    mascotaCreada = await this
                        ._mascotaService
                        .crearNuevaMascota(mascota);
                }catch(e){
                    console.error(e);
                    throw new InternalServerErrorException({
                        mensaje: 'Error creado mascota'
                    })
                }

                if(mascotaCreada){
                    return {
                        mascota: mascotaCreada,
                        usuario: usuarioCreado
                    } 
                }else {
                    throw new InternalServerErrorException({
                        mensaje: 'Error creado mascota'
                    })
                }
            }else {
                throw new InternalServerErrorException({
                    mensaje: 'Error creado mascota'
                })
            }

            
        }

        @Get('vista/usuario')
        vistaUsuario(
            @Res() res
        ){
            const nombreControlador = 'Henry';
            res.render(
                'ejemplo', //NOmbre de l avista (archivo)
                { //Parametros de la vista
                    nombre: nombreControlador
                }
            )
        }
    
    //XML
    //JSON
    //RESTful - JSON
    //http://localhost:3001/
    //RESTFUL MASCOTA
    //VER TODOS
    //GET http://localhost:3001/mascota
    // Ver Uno
    //GET http://localhost:3001/mascota/1
    //Crear Uno
    //POST http://localhost:3001/mascota (BODY)
    //Editar Uno
    //PUT http://localhost:3001/mascota/1 (BODY)
    //Eliminar Uno
    //DELETE http://localhost:3001/mascota/1

    
}