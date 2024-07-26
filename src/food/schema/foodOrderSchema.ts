import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodOrderDocument = HydratedDocument<FoodOrder>;

@Schema()
export class FoodOrder {
  @Prop({ required: true })
  money: number;
  @Prop()
  description: string;
  @Prop({ required: true })
  chatId: number;
  @Prop({ required: true })
  orderType: string;
}

export const FoodOrderSchema = SchemaFactory.createForClass(FoodOrder);
