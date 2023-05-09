import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';  //Cette annotation permet de définir les champs de la collection MongoDB, avec un type de données spécifique.
import { HydratedDocument } from 'mongoose'; /* appel a la classe hydratedocument de mongoose */

export type ClimatDocument = HydratedDocument<Climat>; //La classe Climat définit les propriétés de ce modèle de données

@Schema({ collection: 'climat' })           //création du schéma mongoose climat
export class Climat {                         // Chacune de ces propriétés est définie avec l'aide de l'annotation de propriété de @Prop, qui est importée du package @nestjs/mongoose
  @Prop(raw({ temperature: String, humidity: String }))
  '8h': {
    temperature: string;
    humidity: string;
  };

  @Prop(raw({ temperature: String, humidity: String }))   //Les propriétés 8h, 12h and 19h sont des objets contenant des propriétés temperature et humidity
  '12h': {
    temperature: string;
    humidity: string;
  };

  @Prop(raw({ temperature: String, humidity: String }))
  '19h': {
    temperature: string;
    humidity: string;
  };

  @Prop()
  date: string;

  @Prop()
  heure: string;

  @Prop(raw({ temperature: String, humidity: String }))
  moyenne: {
    temperature: string;
    humidity: string;
  };
}

export const ClimatSchema = SchemaFactory.createForClass(Climat);//ClimatSchema est une constante qui est créée en utilisant la méthode createForClass de SchemaFactory et en fournissant la classe Climat en tant qu'argument. 
