import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodLikeDocument = HydratedDocument<FoodLike>;

@Schema()
export class FoodLike {
  @Prop({ required: true })
  chatId: number;
  @Prop({ default: [] })
  foods: [string];
}

export const FoodLikeSchema = SchemaFactory.createForClass(FoodLike);
