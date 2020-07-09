import { Controller, Get, Post, Delete, HttpCode, Header, BadRequestException, Param, Query, Body } from "@nestjs/common";
import { ok } from "assert";

// /juegos-http
@Controller('juegos-http')
export class HttpJuegoController {
    @Get('hola')
    @HttpCode(201)
    holaGet() {
        //throw new BadRequestException()
        return 'Hola GET! :)'
    }

    @Post('hola')
    @HttpCode(202)
    holaPost() {
        return 'Hola POST! :)'
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelete() {
        return 'Hola DELETE! :)'
    }

    //http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    @Get('parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros', parametrosRuta);

        if (isNaN(parametrosRuta.edad) || isNaN(parametrosRuta.altura)){
            throw new BadRequestException('No son numeros')
        }
        else{
            const edad = Number(parametrosRuta.edad);
            const altura = Number(parametrosRuta.altura);
            return edad + altura;
        } 
    }

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){
        console.log('parametrosDeConsulta',parametrosDeConsulta);
        console.log(Object.keys(parametrosDeConsulta).length);
        //if (Object.keys(parametrosDeConsulta).length === 2){
        if ('nombre' in parametrosDeConsulta && 'apellido' in parametrosDeConsulta){
            console.log(parametrosDeConsulta.nombre);
            console.log(parametrosDeConsulta['nombre']);
            return parametrosDeConsulta['nombre'] +" "+ parametrosDeConsulta['apellido'];
        }   
        else{
            return '=)';
        }
    }

    @Post('parametros-cuerpo')
    parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        console.log('Parametros de cuerpo', parametrosDeCuerpo);
        console.log(parametrosDeCuerpo['mascota']);
        console.log(parametrosDeCuerpo.mascota);
        return 'Registro creado';
    }
}