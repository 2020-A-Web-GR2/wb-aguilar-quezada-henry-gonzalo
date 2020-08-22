import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { MascotaEntity } from 'src/mascota/mascota.entity';

@Entity()
export class VacunaEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(
        type => MascotaEntity,
        mascota => mascota.vacunas
    )
    mascota: MascotaEntity;
}