import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ClimatDocument = HydratedDocument<Climat>;
    @Schema()
      export class Climat {

        @Prop()
        numero:string;
        
        @Prop()
        p1disponible: boolean;

        @Prop()
        p2disponible: boolean;

        @Prop()
        p3disponible: boolean;

        @Prop()
        luminosite: string;
        @Prop()
        gaz: string;

        @Prop()
        date: string;
      }

export const ClimatSchema = SchemaFactory.createForClass(Climat);//ClimatSchema est une constante qui est créée en utilisant la méthode createForClass de SchemaFactory et en fournissant la classe Climat en tant qu'argument. 
