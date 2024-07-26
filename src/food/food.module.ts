import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { FoodOrder, FoodOrderSchema } from './schema/foodOrderSchema';
import { Food, FoodSchema } from './schema/foodSchema';
import { FoodLike, FoodLikeSchema } from './schema/likeFoodSchema';
import { FoodStore, FoodStoreSchema } from './schema/stroreFood';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './upload/food',
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const extension = extname(file.originalname);
            callback(null, `${uniqueSuffix}${extension}`);
          },
        }),
      }),
    }),
    MongooseModule.forFeature([
      { name: Food.name, schema: FoodSchema },
      { name: FoodLike.name, schema: FoodLikeSchema },
      { name: FoodStore.name, schema: FoodStoreSchema },
      { name: FoodOrder.name, schema: FoodOrderSchema },
    ]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
