import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'; 
import { HydratedDocument } from 'mongoose';
import {  IsNotEmpty } from 'class-validator';
import { type } from 'os';

export type ParckingDocument = HydratedDocument <Parcking>;
@Schema()

export class Parcking{

    @Prop()
    @IsNotEmpty()
    nom: string;

    @Prop()
    @IsNotEmpty()
    date_debut: Date;
    @Prop()
    @IsNotEmpty()
    date_fin: Date;
    @Prop()
    temps_mis: {
      date_debut:Date;
      date_fin:Date;
    };
    
}
export const ParckingSchema = SchemaFactory.createForClass(Parcking);



