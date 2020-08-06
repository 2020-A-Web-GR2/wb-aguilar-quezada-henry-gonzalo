import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";

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
    
    @Get()
    mostrarTodos(){
        return this.arregloUsuarios
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        };
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];
    }

    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        );
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre
        return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        );
        this.arregloUsuarios.splice(indice, 1);
        return this.arregloUsuarios[indice];
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