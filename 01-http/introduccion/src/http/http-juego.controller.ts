import { Controller, Get, Post, Delete, HttpCode, Header, BadRequestException, Param, Query, Body, Req, Res, Headers, Put } from "@nestjs/common";
import { ok } from "assert";
import { MascotaCreateDto } from "./dto/mascota.create-dto";
import {validate, ValidationError} from 'class-validator';
import { get } from "http";

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

    //<------------------------------------DEBER-EXAMEN-------------------------------------------------------->

    @Get('suma')
    @HttpCode(200)
    sumarDosNumeros(
        @Query() parametrosConsulta, //n1
        @Req() req,
        @Res() res

    ){
        if(!req.cookies.nombreUsuario){
            res.send("El usuario no existe no se puede hacer la operacion");
        }
        else{
            if (isNaN(parametrosConsulta.n1) || isNaN(parametrosConsulta.n2)){
                throw new BadRequestException('No son numeros')
            }
            else{
                var resultado = Number(parametrosConsulta.n1)+Number(parametrosConsulta.n2)
                var oldpuntaje = req.signedCookies.puntaje
                req.signedCookies.puntaje -= resultado

                var respuesta = ""
                var puntaje = 0;
                if(req.signedCookies.puntaje<=0){
                    puntaje = 100;
                    respuesta = req.cookies.nombreUsuario+', haz terminado tus puntos, se te han restablecido de nuevo';
                }else{
                    puntaje = req.signedCookies.puntaje;
                    respuesta = "La suma es "+resultado+"\n"
                        +req.cookies.nombreUsuario+" tenias "+Number(oldpuntaje)
                        +" te queda "+Number(req.signedCookies.puntaje)+" de puntaje"
                }
                res.cookie('puntaje',puntaje, {signed:true})
                res.send(respuesta);
            }
        }
    }

    @Put('resta')
    @HttpCode(201)
    restarDosNumeros(
        @Body() parametrosCuerpo, //n1
        @Req() req,
        @Res() res
    ){
        if(!req.cookies.nombreUsuario){
            res.send("El usuario no existe no se puede hacer la operacion");
        }
        else{
            if (isNaN(Number(parametrosCuerpo.n1)) || isNaN(Number(parametrosCuerpo.n2))){
                throw new BadRequestException('No son numeros')
            }
            else{
                var resultado = Math.abs(Number(parametrosCuerpo.n1) - Number(parametrosCuerpo.n2))
                var oldpuntaje = req.signedCookies.puntaje
                req.signedCookies.puntaje -= resultado

                var respuesta = ""
                var puntaje = 0;
                if(req.signedCookies.puntaje<=0){
                    puntaje = 100;
                    respuesta = req.cookies.nombreUsuario+', haz terminado tus puntos, se te han restablecido de nuevo';
                }else{
                    puntaje = req.signedCookies.puntaje;
                    respuesta = "La resta es "+resultado+"\n"
                        +req.cookies.nombreUsuario+" tenias "+Number(oldpuntaje)
                        +" te queda "+Number(req.signedCookies.puntaje)+" de puntaje"
                }
                res.cookie('puntaje',puntaje, {signed:true})
                res.send(respuesta);
            }
        }
    }

    @Delete('multiplicacion')
    @HttpCode(200)
    multiplicarDosNumeros(
        @Headers() headers, //n1
        @Req() req,
        @Res() res
    ){
        if(!req.cookies.nombreUsuario){
            res.send("El usuario no existe no se puede hacer la operacion");
        }
        else{
            if (isNaN(headers.n1) || isNaN(headers.n2)){
                throw new BadRequestException('No son numeros')
            }
            else{
                var resultado = Number(headers.n1)*Number(headers.n2)
                var oldpuntaje = req.signedCookies.puntaje
                req.signedCookies.puntaje -= resultado

                var respuesta = ""
                var puntaje = 0;
                if(req.signedCookies.puntaje<=0){
                    puntaje = 100;
                    respuesta = req.cookies.nombreUsuario+', haz terminado tus puntos, se te han restablecido de nuevo';
                }else{
                    puntaje = req.signedCookies.puntaje;
                    respuesta = "La multiplicacion es "+resultado+"\n"
                        +req.cookies.nombreUsuario+" tenias "+Number(oldpuntaje)
                        +" te queda "+Number(req.signedCookies.puntaje)+" de puntaje"
                }
                res.cookie('puntaje',puntaje, {signed:true})
                res.send(respuesta);
            }
        }
    }

    @Post('division/:n1/:n2')
    @HttpCode(201)
    dividirDosNumeros(
        @Param() parametrosRuta, //n1
        @Req() req,
        @Res() res
    ){
        if(!req.cookies.nombreUsuario){
            res.send("El usuario no existe no se puede hacer la operacion");
        }
        else{
            if ((isNaN(parametrosRuta.n1) || isNaN(parametrosRuta.n2)) && parametrosRuta.n2!=0 ){
                throw new BadRequestException('No son numeros')
            }
            else{
                var resultado = Number(parametrosRuta.n1)/Number(parametrosRuta.n2)
                var oldpuntaje = req.signedCookies.puntaje
                req.signedCookies.puntaje -= resultado

                var respuesta = ""
                var puntaje = 0;
                if(req.signedCookies.puntaje<=0){
                    puntaje = 100;
                    respuesta = req.cookies.nombreUsuario+', haz terminado tus puntos, se te han restablecido de nuevo';
                }else{
                    puntaje = req.signedCookies.puntaje;
                    respuesta = "La division es "+resultado+"\n"
                        +req.cookies.nombreUsuario+" tenias "+Number(oldpuntaje)
                        +" te queda "+Number(req.signedCookies.puntaje)+" de puntaje"
                }
                res.cookie('puntaje',puntaje, {signed:true})
                res.send(respuesta);
            }
        }
    }

    @Get('guardarUsuario')
    guardarNombre(
        @Query() parametrosDeConsulta,
        @Res() res
    ){
        if ('nombre' in parametrosDeConsulta){
            res.cookie(
                'nombreUsuario', // nombre
                parametrosDeConsulta.nombre, // valor
            );
            res.cookie('puntaje', 100, {signed: true});
            const mensaje = {
                mensaje: 'ok jugador creado',
                cookie: res.cookie
            };
            // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
            res.send(mensaje); // METODO EXPRESSJS
        }   
        else{
            return 'No has enviado el nombre';
        }
    }
    //<----------------------------------------------------------------------------------------------------------->

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
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ) {
        // Promesas
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casada = parametrosDeCuerpo.casada;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;
        try {
            const errores: ValidationError[] = await validate(mascotaValida);
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw new BadRequestException('Error validando');
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                };
                return mensajeCorrecto;
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error validando');
        }
    }

    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, //  request - PETICION
        @Res() res // response - RESPUESTA
    ) {
        res.cookie(
            'galletaInsegura', // nombre
            'Tengo hambre', // valor
        );
        const mensaje = {
            mensaje: 'ok'
        };
        // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
        res.send(mensaje); // METODO EXPRESSJS
    }

    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req, //  request - PETICION
        @Res() res // response - RESPUESTA
    ) {
        res.cookie(
            'galletaSegura', // nombre
            'Web :3', // valor
            {
                secure: true
            }
        );
        const mensaje = {
            mensaje: 'ok'
        };
        // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
        res.send(mensaje); // METODO EXPRESSJS
    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        };
        return mensaje;
    }

    @Get('guardarCookieFirmada')
    public guardarCookieFirmada(
        @Res() res,
        @Headers() headers // peticion - request
    ) {
        // ENCRIPCION DE LA POLIBURGUER CON EL ALGORITMO Q YO QUIERO
        console.log('Headers', headers);

        res.header('Cabecera','Dinamica'); // respuesta - response

        res.cookie('firmada', 'poliburguer', {signed: true});
        res.cookie('firmada1', 'poliburguer1', {signed: true});
        res.cookie('firmada2', 'poliburguer2', {signed: true});
        res.cookie('firmada3', 'poliburguer3', {signed: true});
        res.cookie('firmada4', 'poliburguer4', {signed: true});

        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }

    // 1 Guardar Cookie Insegura
    // 2 Guardar Cookie Segura
    // 3 Mostrar Cookies
}