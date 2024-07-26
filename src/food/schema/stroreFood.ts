import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FoodStoreDocument = HydratedDocument<FoodStore>;

@Schema()
export class FoodStore {
  @Prop({ required: true })
  all_food: [
    {
      foodId: string;
      count: number;
    },
  ];

  @Prop({ required: true })
  all_money: number;

  @Prop({ required: true })
  chatId: number;

  @Prop({ default: 0 })
  status: number;
}

export const FoodStoreSchema = SchemaFactory.createForClass(FoodStore);
