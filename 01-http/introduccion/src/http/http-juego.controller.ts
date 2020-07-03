import { Controller, Get, Post, Delete, HttpCode, Header, BadRequestException, Param } from "@nestjs/common";
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
}