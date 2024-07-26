import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodDocument = HydratedDocument<Food>;

@Schema()
export class Food {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  money: string;
  @Prop({ required: true })
  photo: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
