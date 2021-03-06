import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm";
import { MascotaEntity } from "src/mascota/mascota.entity";
import { MascotaModule } from "src/mascota/mascota.module";

@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento' //Nombres de las propiedades en la clase
])

// @Index(
//     ['nombre', 'apellido', 'cedula'],
//     {unique: true}
// )

@Entity('epn_usuario')
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?: string

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '18'
    })
    cedula: string

    @Column({
        name: 'sueldo',
        nullable: true,
        type: 'decimal',
        precision: 10, //10000000000
        scale: 4, //0.0001
    })
    sueldo?: number;

    @Column({
        nullable: true,
        type: 'date',
        name: 'fecha_nacimiento'
    })
    fechaNacimiento?: string;

    @Column({
        nullable: true,
        type: 'datetime',
        name: 'fecha_hora_nacimiento'
    })
    fechaHoraNacimiento?: string;

    @OneToMany(
        type => MascotaEntity, //Que entidad nos relacionamos
        mascota => mascota.usuario
    )
    mascotas: MascotaEntity[];

    
}