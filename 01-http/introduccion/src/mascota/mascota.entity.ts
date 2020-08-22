import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { VacunaEntity } from 'src/vacuna/vacuna.entity';

@Entity()
export class MascotaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.mascotas
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => VacunaEntity,
        vacuna => vacuna.mascota
    )
    vacunas: VacunaEntity[];
}